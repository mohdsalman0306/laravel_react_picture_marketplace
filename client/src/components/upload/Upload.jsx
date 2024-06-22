import React, { useState } from "react";
import useCategories from "../custom-hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import Spinner from "../layouts/Spinner";
import axios from "axios";
import { BASE_URL } from "../../helper/config";
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import useValidation from "../custom-hooks/useValidation";

const Upload = () => {
    const [picture, setPicture] = useState({
        title: "",
        price: "",
        category_id: "",
        user_id: 1,
        file: null,
    });
    const categories = useCategories(0);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fileTypes = ["JPG", "PNG", "JPEG", "GIF"];
    const [fileSizeError, setFileSizeError] = useState('');

    const handleChange = (file) => {
        setFileSizeError('')
        setPicture({
            ...picture, file: file
        });
    };

    const handleSizeError = () => {
        setFileSizeError('The file size must not be greater than 2 mb');
    }

    const storeImage = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('file', picture.file)
        formData.append('title', picture.title)
        formData.append('price', picture.price)
        formData.append('category_id', picture.category_id)
        formData.append('user_id', picture.user_id)

        try {
            const response = await axios.post(
                `${BASE_URL}/store/picture`, formData
            )
            setLoading(false)
            toast.success(response.data.message, {
                position: "top-right",
            })
            navigate('/')
        } catch (error) {
            setLoading(false)
            if (error?.response?.status === 422) {
                console.log(error.response.data.errors)
                setErrors(error.response.data.errors)
                console.log(errors);
            }
            console.log(error)
        }
    }

    return(
        <div className="container">
            <div className="row my-5">
                <div className="col-md-6 max-auto">
                    <div className="card">
                        <div className="card-header bg-white">
                            <h5 className="text-center mt-4">
                                Upload File
                            </h5>
                        </div>
                        <div className="card-body">
                            <form className="mt-5" onSubmit={(e) => storeImage(e)}>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category*</label>
                                    <select
                                    name="category_id"
                                    id="category"
                                    className="form-control"
                                    value={picture.category_id}
                                    onChange={(e) => setPicture({
                                        ...picture, category_id:e.target.value
                                    })}
                                    >
                                        <option value="" disabled>Choose Category</option>
                                        {
                                            categories?.map(category => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                    {useValidation(errors, 'category_id')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title*</label>
                                    <input type="text" name="title" id="title"
                                    className="form-control"
                                    onChange={(e) => setPicture({
                                        ...picture, title:e.target.value
                                    })}
                                    />
                                    {useValidation(errors, 'title')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price*</label>
                                    <input type="number" name="price" id="price"
                                    className="form-control"
                                    onChange={(e) => setPicture({
                                        ...picture, price:e.target.value
                                    })}
                                    />
                                    {useValidation(errors, 'price')}
                                </div>
                                <div className="mb-3">
                                    <FileUploader
                                        handleChange={handleChange}
                                        name="file"
                                        type={fileTypes}
                                        required={!picture.file}
                                        maxSize={2}
                                        onSizeError={handleSizeError}
                                    />
                                    {
                                        fileSizeError && <div className="text-white my-2 rounded p-2 bg-danger">
                                            {fileSizeError}
                                        </div>
                                    }
                                    {
                                        picture?.file && <img
                                        src={URL.createObjectURL(picture.file)}
                                        alt="Picture"
                                        width={150}
                                        height={150}
                                        className="rounded my-2" />
                                    }
                                </div>
                                <div className="mb-3">
                                    {
                                        loading ?
                                            <Spinner />
                                        :
                                            <button type="submit" className="btn btn-sm btn-dark">Submit</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
