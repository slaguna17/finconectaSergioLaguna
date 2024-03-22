import { useState } from 'react'
import './home.css'

export default function Home() {
    const [products, setProducts] = useState([])
    
    function productsAsLists() {
        fetch('/getProducts')
        .then(res => {
            return res.json()
        }).then(val => {
            setProducts(val)
        })
        let lists = products.map(product => (
            <li key={product.id}>
                Product Name: {product.name}
                <br></br>
                Price: {product.price}{"$"}
                <br></br>
                <img src={product.image}></img>
            </li>
        ))
        return lists
    }

    return (
        <div>
            <h1>All our products!</h1>
            <ul>
                {productsAsLists()}
            </ul>
        </div>
    )
}




