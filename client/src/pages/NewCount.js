import { useEffect } from "react"
import { useProductsContext } from '../hooks/useProductsContext'
import NewCountForm from "../components/NewCountForm"
import { API_URL } from '../config'

const NewCount = () => {
    const { products, dispatch } = useProductsContext()

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(API_URL)
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json });
            }
        }

        fetchProducts();

    }, [dispatch])

    return (
        <div>
            <NewCountForm products={products} />
        </div>
    )
}

export default NewCount