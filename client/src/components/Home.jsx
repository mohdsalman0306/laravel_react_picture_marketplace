import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../helper/config";
import Spinner from "./layouts/Spinner";
import Categories from "./partials/Categories";
import useCategories from "./custom-hooks/useCategories";
import Extensions from "./partials/Extensions";
import { Link } from "react-router-dom";

export default function Home() {
    const [pictures, setPictures] = useState([]);
    const [extensions, setExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const categories = useCategories(1);
    const [categoryId, setCategoryId] = useState("");
    const [pictureExt, setPictureExt] = useState("");
    const [picturesToShow, setPicturesToShow] = useState(6);

    useEffect(() => {
        setLoading(true);
        const fetchPictures = async () => {
            setPicturesToShow(6);
            try {
                if (categoryId) {
                    const response = await axios.get(
                        `${BASE_URL}/pictures/category/${categoryId}`
                    );
                    setPictures(response.data.data);
                    setLoading(false);
                } else if (pictureExt) {
                    const response = await axios.get(
                        `${BASE_URL}/pictures/extensions/${pictureExt}`
                    );
                    setPictures(response.data.data);
                    setLoading(false);
                } else {
                    const response = await axios.get(`${BASE_URL}/pictures`);
                    setPictures(response.data.data);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        const fetchExtensions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/extensions`);
                setExtensions(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPictures();
        fetchExtensions();
    }, [categoryId, pictureExt]);

    const loadMorePictures = () => {
        if (picturesToShow > pictures.length) {
            return;
        } else {
            setPicturesToShow(
                (prevPicturesToShow) => (prevPicturesToShow += 6)
            );
        }
    };

    return (
        <div className="container">
            {loading ? (
                <Spinner />
            ) : (
                <div className="row my-5">
                    <div className="col-md-8">
                        <div className="row">
                            {pictures
                                ?.slice(0, picturesToShow)
                                .map((picture, index) => (
                                    <div className="col-md-6 md-2" key={index}>
                                        <Link to={`picture/${picture.id}`}>
                                            <div className="card">
                                                <img
                                                    src={picture.image_path}
                                                    alt={picture.title}
                                                    className="card-image-top"
                                                    height={300}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                        {picturesToShow < pictures.length && (
                            <div className="d-flex justify-content-center my-3">
                                <button
                                    onClick={() => loadMorePictures()}
                                    className="btn btn-sm btn-dark"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header bg-white">
                                <h5 className="text-center mt-2">
                                    <i className="bi bi-filter-circle"></i>{" "}
                                    Filters
                                </h5>
                            </div>
                            <div className="card-body">
                                <Categories
                                    categories={categories}
                                    setCategoryId={setCategoryId}
                                    categoryId={categoryId}
                                    setPictureExt={setPictureExt}
                                ></Categories>
                                <hr />
                                <Extensions
                                    setCategoryId={setCategoryId}
                                    extensions={extensions}
                                    setPictureExt={setPictureExt}
                                    pictureExt={pictureExt}
                                ></Extensions>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
