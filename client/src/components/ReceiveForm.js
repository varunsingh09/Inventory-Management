import { useState, useContext } from "react"
import ReceiveRow from "./ReceiveRow"
import { useProductsContext } from '../hooks/useProductsContext'
import { ToggleContext } from "../context/ToggleContext"
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { API_URL } from '../config'

const ReceiveForm = ({ products }) => {
  const [rowsData, setRowsData] = useState([])
  const [productsData, setProductsData] = useState([...products])
  const [error, setError] = useState(null)
  const { dispatch } = useProductsContext()
  const {toggleReceive, setToggleReceive} = useContext(ToggleContext)
  const {toggleAdd, setToggleAdd} = useContext(ToggleContext)

  const handleAddRow = () => {

    const rowsInput = {
      _id: '',
      quantity: 0
    }

    setRowsData([...rowsData, rowsInput])
  }

  const deleteRow = (index) => {
    const rows = [...rowsData]
    rows.splice(index, 1)
    setRowsData(rows)
  }


  const handleChange = (index, event) => {
    const { name, value } = event.target
    const rowsInput = [...rowsData]
    rowsInput[index][name] = value
    setRowsData(rowsInput)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    rowsData.forEach((product) => submitData(product._id, product.quantity))
  }

  const submitData = async (id, addedQuantity) => {

    const productToUpdate = productsData.find(({ _id }) => _id === id)
    const quantity = Number(productToUpdate.quantity) + Number(addedQuantity)
    const received = Number(addedQuantity)

    const product = { id, quantity, received }

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

  return (
    <div className="pop-up-menu ">
      <div className="inner-pop-up-menu">
          <div className="close-button" onClick={() => setToggleReceive(false)}><CloseIcon sx={{ fontSize: 18 }}/></div>
          <div>
            <h2>Receive a Product: </h2>
          </div>
        <div id="products">
          <ReceiveRow products={productsData} rowsData={rowsData} deleteRow={deleteRow} handleChange={handleChange} />
          {error && <div>{error}</div>}
          <div className="add-button" onClick={() => handleAddRow()}><AddIcon sx={{ fontSize: 20 }}/></div>     
        </div>
        
                  
        <div id="receive-submit-button">
          <button class="submit-button" onClick={(event) => handleSubmit(event)}>Submit</button>
        </div>      
      </div>
    </div>
  )
}

export default ReceiveForm