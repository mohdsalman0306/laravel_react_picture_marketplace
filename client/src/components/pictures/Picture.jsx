import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL, getConfig } from "../../helper/config";
import Spinner from "../layouts/Spinner";

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
            {
            loading ? <Spinner />
            :
            error ? <div className="row my-5">
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
                :
                <div className="row my-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <img src={picture?.image_path} alt={picture?.title} className="img-fluid rounded" />
                            </div>
                        </div>
                    </div>
                </div>
                }
        </div>
    );
};

export default Picture;
