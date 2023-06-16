import { createContext, useReducer } from 'react'

export const ProductsContext = createContext()

export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                products: action.payload
            }
        case 'CREATE_PRODUCT':
            const createSorted = [action.payload, ...state.products].sort((a, b) => a.SKU > b.SKU)
            return {
                products: [...createSorted]
            }
        case 'DELETE_PRODUCT':
            const removedProduct = state.products.filter((p) => p._id !== action.payload._id)
            return {
                products: [...removedProduct]
            }
        case 'EDIT_PRODUCT':
            const removedPrevious = state.products.filter((p) => p._id !== action.payload._id)
            const editSorted = [action.payload, ...removedPrevious].sort((a, b) => a.SKU > b.SKU)
            return {
                products: [...editSorted]
            }
        default:
            return state
    }
}

export const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, {
        products: null
    })

    return (
        <ProductsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductsContext.Provider>
    )
}