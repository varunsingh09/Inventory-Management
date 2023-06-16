import EditIcon from '@mui/icons-material/Edit';

const ReadOnlyRow = ({ product, handleEditClick, handleContextMenu }) => {
  return (
    <tr key={product._id} onContextMenu={handleContextMenu} onClick={(event) => handleEditClick(event, product)} >
      <td>{product.SKU}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.condition}</td>
      <td>{product.previousQuantity}</td>
      <td>{product.received}</td>
      <td>{product.previousQuantity + product.received}</td>     
      <td>{product.quantity}</td>
      <td>{product.quantity - (product.previousQuantity + product.received)}</td>
    </tr>
  )
}

export default ReadOnlyRow