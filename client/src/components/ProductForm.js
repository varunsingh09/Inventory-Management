import { useState, useContext } from 'react'
import { useProductsContext } from '../hooks/useProductsContext'
import { ToggleContext } from "../context/ToggleContext"
import { API_URL } from '../config'

import CloseIcon from '@mui/icons-material/Close';


const ProductForm = () => {
    const { dispatch } = useProductsContext()
    const [name, setName] = useState('')
    const [SKU, setSKU] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [quantity, setQuantity] = useState('')
    const [error, setError] = useState(null)
    const {toggleAdd, setToggleAdd} = useContext(ToggleContext)

    const handleSubmit = async (e) => {
        //prevents refreshing page on submit
        e.preventDefault()

        const product = { name, SKU, category, condition, quantity }

        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setName('')
            setSKU('')
            setCategory('')
            setCondition('')
            setQuantity('')
            setError(null)
            console.log('added new product', json)
            dispatch({ type: 'CREATE_PRODUCT', payload: json })
        }


    }

    return (
        <form className='pop-up-menu' onSubmit={handleSubmit}>            
            <div className='inner-pop-up-menu'>
                <button className="close-button" onClick={() => setToggleAdd(false)}><CloseIcon sx={{ fontSize: 18 }}/></button>
                <h3>Add a New Product</h3>
                <div id="new-product-form">
                    <label>Product Name: </label>            
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <label>SKU: </label>
                    <input
                        type="text"
                        onChange={(e) => setSKU(e.target.value)}
                        value={SKU}
                    />
                    <label>Category: </label>
                    <input
                        type="text"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                    <label>Condition: </label>
                    <select id="new-product-condition-select" onChange={(e) => setCondition(e.target.value)}>
                        <option disabled={true} value="">
                            --Choose and option--
                        </option>
                        <option value="RESELL">RESELL</option>
                        <option value="GOOD">GOOD</option>
                        <option value="BAD">BAD</option>
                    </select>
                    <label>Quantity: </label>
                    <input
                        type="number"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                    />
                    {error && <div>{error}</div>}
                </div>
                <div id="new-product-submit-button">
                <button className="submit-button">Submit</button>
                </div>
            </div>
            
        </form>
    )
}

export default ProductForm