import { useState } from "react"
import { useRef } from "react"
import { useProductsContext } from '../hooks/useProductsContext'
import ResetReceive from "./ResetReceive"
import { API_URL } from '../config'

const NewCountForm = ({ products }) => {
  const expectedQuantity = products.slice()
  const [productsData, setProductsData] = useState([...products])
  const [error, setError] = useState(null)
  const { dispatch } = useProductsContext()
  const [toggleResetReceived, setToggleResetReceived] = useState(false);


  const submitData = async (id, newQuantity) => {

    const productToUpdateResponse = await fetch(API_URL + id)
    const productToUpdate = await productToUpdateResponse.json()
    const previousQuantity = await productToUpdate.quantity
    const quantity = newQuantity

    const product = { id, previousQuantity, quantity }

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

  const handleSubmit = (event) => {
    event.preventDefault()
    productsData.forEach((product) => submitData(product._id, product.quantity))
  }

  const handleChange = (event, index) => {
    const { name, value } = event.target
    const productInput = [...productsData]
    productInput[index][name] = value
    setProductsData(productInput)
  }

  const handleReset = () => {
    setToggleResetReceived(!toggleResetReceived)
  }


  return (
    <>
    <table className="product-table">
      <th>
        Name
      </th>
      <th>
        Counted       
      </th>
      <th>
        Expected
      </th>
    {productsData.map((product, index) =>
        <tr key={index}>
          <td>{product.name}</td>
          <td><input name="quantity" type="number" value={product.newQuantity} onChange={(event) => handleChange(event, index)} /></td>
          <td>{expectedQuantity[index]["quantity"]}</td>
        </tr>
      )}
    </table>
      <div id="new-count-form-buttons">
        <button id="new-count-submit-button"className="submit-button" onClick={(event) => handleSubmit(event)}>Submit</button>
        {!toggleResetReceived && <button id="new-count-reset-button" onClick={handleReset} >Reset Received</button>}
        {toggleResetReceived && <ResetReceive handleResetToggle={handleReset} products={products} />}
      </div>
      
    </>
  )
}

export default NewCountForm