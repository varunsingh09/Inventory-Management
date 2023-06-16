import { useEffect, useContext } from 'react'
import { useProductsContext } from '../hooks/useProductsContext'
import { ToggleContext } from '../context/ToggleContext'
import Add from './Add'
import Receive from './Receive'
import { API_URL } from '../config'


import ProductTable from '../components/ProductTable'

const Home = () => {

    const { products, dispatch } = useProductsContext()
    const {toggleReceive} = useContext(ToggleContext)
    const {toggleAdd} = useContext(ToggleContext)

    useEffect(() => {
        const fetchProducts = async () => {

            console.log(API_URL)
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
            <div className='Products'>
                {products && <ProductTable products={products} />}
                {toggleReceive && <Receive/>}
                {toggleAdd && <Add/>}
            </div>

        </div>
    )
}

export default Home