import axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../helper/config'
import Spinner from './layouts/Spinner'

export default function Home() {

    const [pictures, setPictures] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchPictures = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/pictures`)
                //console.log(response.data.data)
                setPictures(response.data.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchPictures()
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
                                pictures?.map(picture => (
                                    <div className="col-md-6 md-2">
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
                            <div className="card-body"></div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
