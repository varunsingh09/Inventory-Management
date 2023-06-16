const dev = 'http://localhost:4000/api/products/';
const prod ='https://inventory-management-spra.onrender.com/api/products/';

export const API_URL = process.env.NODE_ENV === 'development' ? dev : prod;