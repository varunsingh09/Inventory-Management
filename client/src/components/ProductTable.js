import * as React from 'react'
import EditableRow from "./EditableRow"
import ReadOnlyRow from "./ReadOnlyRow"
import { useState } from 'react'

const ProductTable = ({ products }) => {

    const [editProductId, setProductId] = useState(null)

    const handleEditClick = (event, product) => {
        event.preventDefault();
        setProductId(product._id);
    };

    const handleCancelClick = (event) => {
        event.preventDefault();
        setProductId(null);
    };

    return (
        <div className="product-table">        
            <div>           
                <table>
                
                    <tbody >
                        <tr key="header">
                            <th width="15%">SKU</th>
                            <th width="40%">Name</th>
                            <th width="10%">Category</th>
                            <th width="10%">Condition</th>
                            <th width="5%">Previous</th>
                            <th width="5%">Received</th>
                            <th width="5%">Expected</th>
                            <th width="5%">Counted</th>
                            <th width="5%">+/-</th>
                        </tr>
                        {products && products.map((product, index) => (
                            <React.Fragment key={index.toString()}>
                                {editProductId === product._id ?
                                    <EditableRow product={product} handleCancelClick={handleCancelClick} /> :
                                    <ReadOnlyRow product={product} handleEditClick={handleEditClick} />}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductTable