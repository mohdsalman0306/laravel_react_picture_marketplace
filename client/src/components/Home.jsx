import axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../helper/config'
import Spinner from './layouts/Spinner'
import Categories from './partials/Categories'
import useCategories from './custom-hooks/useCategories'
import Extensions from './partials/Extensions'

export default function Home() {

    const [pictures, setPictures] = useState([])
    const [extensions, setExtensions] = useState([])
    const [loading, setLoading] = useState(false)
    const categories = useCategories(1);

    useEffect(() => {
        setLoading(true)
        const fetchPictures = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/pictures`)
                setPictures(response.data.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        const fetchExtensions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/extensions`)
                setExtensions(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchPictures()
        fetchExtensions()
    }, [])

    return (
        <div className='container'>
            {
                loading ?
                    <Spinner/>
                :
                <div className="row my-5">
                    <div className="col-md-8">
                        <div className="row">
                            {
                                pictures?.map((picture, index) => (
                                    <div className="col-md-6 md-2" key={index}>
                                        <div className="card">
                                            <img
                                                src={picture.image_path}
                                                alt={picture.title}
                                                className='card-image-top'
                                                height={300}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header bg-white">
                                <h5 className="text-center mt-2">
                                    <i className="bi bi-filter-circle"></i> Filters
                                </h5>
                            </div>
                            <div className="card-body">
                                <Categories categories={categories }></Categories>
                                <hr />
                                <Extensions extensions={extensions}></Extensions>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
