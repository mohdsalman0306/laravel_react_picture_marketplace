import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL, getConfig } from "../../helper/config";
import Spinner from "../layouts/Spinner";
import { addToCart } from "../../redux/slices/cartSlice";

const Picture = () => {
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, token, isLoggedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        const fetchPictureById = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/pictures/${id}`);
                setPicture(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                if (error?.response?.status === 404) {
                    setError("The picture you are looking for does not exist");
                }
                setLoading(false);
            }
        };
        fetchPictureById();
    }, [id]);

    return (
        <div className="container">
            {loading ? (
                <Spinner />
            ) : error ? (
                <div className="row my-5">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <div className="alert alert-info my-3">
                                    {error}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row my-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <img
                                    src={picture?.image_path}
                                    alt={picture?.title}
                                    className="img-fluid rounded"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header bg-white">
                                <h4 className="text-center mt-2 mb-4">
                                    {picture?.title}
                                </h4>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <img
                                            src={picture?.user.image_path}
                                            alt={picture?.user.name}
                                            className="img-fluid rounded-circle"
                                            height={60}
                                            width={60}
                                        />
                                        <div className="d-flex flex-column mx-2">
                                            <span className="fw-bold">
                                                {picture?.user?.name}
                                            </span>
                                            <span className="text-muted">
                                                <i>
                                                    {
                                                        picture?.user?.pictures
                                                            ?.length
                                                    }{" "}
                                                    {picture?.user?.pictures
                                                        ?.length > 1
                                                        ? "pictures"
                                                        : "picture"}
                                                </i>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="border border-dark p-2 fw-bold rounded shadow-sm">
                                            ${picture?.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-center my-2">
                                    <button className="btn btn-primary" onClick={() => dispatch(addToCart({
                                        id: picture?.id,
                                        title: picture?.title,
                                        price: picture?.price,
                                        image: picture?.image_path
                                    }))}>
                                        <i className="bi bi-bag-plus"></i> { "Add to Cart" }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Picture;
