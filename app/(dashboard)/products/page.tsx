//Contains fetch to GET alla products from api/products

import axios from 'axios'

function getProducts(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    console.log('button clicked')
    axios.get('/api/products', {})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}