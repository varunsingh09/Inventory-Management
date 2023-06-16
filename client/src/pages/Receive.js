import { useEffect } from "react"
import ReceiveForm from "../components/ReceiveForm"
import { useProductsContext } from '../hooks/useProductsContext'
import { API_URL } from '../config'


const Receive = () => {
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
            <ReceiveForm products={products} />
        </div>
    )
}

export default Receive