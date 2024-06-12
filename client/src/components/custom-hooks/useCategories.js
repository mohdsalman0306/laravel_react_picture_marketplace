import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../helper/config";

export default function Categories(hasPictures) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/categories/${hasPictures}`)
                setCategories(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories()
    }, [])

    return categories
}
