import { useProductsContext } from '../hooks/useProductsContext'
import { useState } from 'react'
import ContextMenu from './ContextMenu';
import { API_URL } from '../config'


const EditableRow = ({ product, handleCancelClick }) => {
    const initialContextMenu = {
        show: false,
        x: 0,
        y: 0
    }

    const { dispatch } = useProductsContext()
    const [name, setName] = useState(product.name)
    const [SKU, setSKU] = useState(product.SKU)
    const [category, setCategory] = useState(product.category)
    const [condition, setCondition] = useState(product.condition)
    const [previousQuantity, setPreviousQuantity] = useState(product.previousQuantity)
    const [received, setReceived] = useState(product.received)
    const [quantity, setQuantity] = useState(product.quantity)
    const [error, setError] = useState(null)

    const [contextMenu, setContextMenu] = useState(initialContextMenu)
    

    const handleSubmit = async (e, p) => {
        //prevents refreshing page on submit
        e.preventDefault()

        const product = { name, SKU, category, condition, previousQuantity, received, quantity }

        const response = await fetch(API_URL + p._id, {
            method: 'PATCH',
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
            setError(null)
            console.log('edited new product', json)
            dispatch({ type: 'EDIT_PRODUCT', payload: json })
            handleCancelClick(e)
        }
    }

    const handleDelete = async (e, p) => {
        //prevents refreshing page on submit
        e.preventDefault()

        const product = { name, SKU, category, condition, previousQuantity, received, quantity }

        const response = await fetch(API_URL + p._id, {
            method: 'DELETE',
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
            setError(null)
            console.log('deleted product', json)
            dispatch({ type: 'DELETE_PRODUCT', payload: json })
            handleCancelClick(e)
        }
    }

    const handleContextMenu = (event) => {
        event.preventDefault()
        const {pageX, pageY} = event
        setContextMenu({show: true, x: pageX, y: pageY})
    }

    const closeContextMenu = () => {
        setContextMenu(initialContextMenu)
    }


    return (
        <tr key={product._id} onContextMenu={handleContextMenu}>
            <td>
                <input
                    type="text"
                    required="required"
                    className="edit-input"
                    id="sku-field"
                    name="SKU"
                    value={SKU}
                    onChange={(e) => setSKU(e.target.value)}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    className="edit-input"
                    id="name-field"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    className="edit-input"
                    id="category-field"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                ></input>
            </td>
            <td>
                <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option value="BAD" >BAD</option>
                    <option value="GOOD">GOOD</option>
                    <option value="RESELL">RESELL</option>
                </select>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    className="edit-input"
                    name="previousQuantity"
                    value={previousQuantity}
                    onChange={(e) => setPreviousQuantity(e.target.value)}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    className="edit-input"
                    name="received"
                    value={received}
                    onChange={(e) => setReceived(e.target.value)}
                ></input>
            </td>
            <td>
               {product.previousQuantity + product.received} 
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    className="edit-input"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                ></input>
            </td>
            <td>
            {product.quantity - (product.previousQuantity + product.received)}
            {contextMenu.show && <ContextMenu product={product} handleCancelClick={handleCancelClick} handleSubmit={handleSubmit} handleDelete={handleDelete} x={contextMenu.x} y={contextMenu.y} closeContextMenu={closeContextMenu}/>}
            </td>
        </tr>
    )
}

export default EditableRow