import { useState } from "react"
import { useProductsContext } from '../hooks/useProductsContext'
import { API_URL } from '../config'

const ResetReceive = ({ products, handleResetToggle }) => {
    const [productsData, setProductsData] = useState([...products])
    const [error, setError] = useState(null)
    const { dispatch } = useProductsContext()
    const [confirmedMessage, setConfirmedMessage] = useState(false)

    const submitData = async (id) => {
        const received = 0

        const product = { id, received }

        const response = await fetch(API_URL + id, {
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
        }
    }

    const handleReset = (event) => {
        event.preventDefault()
        productsData.forEach((product) => submitData(product._id))
        setConfirmedMessage(true)
    }

    return (
        <div id="reset-receive-confirmation">
            {!confirmedMessage && 
            <div id="reset-receive-dialogue-box">
                <h3>Are you sure? This process cannot be undone.</h3>
                <div id="reset-receive-dialogue-box-buttons">
                <button id="reset-receive-button" onClick={(event) => handleReset(event)}>Yes, Reset</button>
                <button id="reset-receive-cancel-button" onClick={handleResetToggle}>Cancel</button>
                </div>
            </div>}
            {confirmedMessage && <div id="reset-receive-confirmation-box"><p>Received quantities have been reset!</p></div>}
            <div>
            
            </div>
                      
        </div>
    )
}

export default ResetReceive