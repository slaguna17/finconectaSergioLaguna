import { useState, useEffect } from 'react'
export default function Products(){
    const productExample = {id:0, name: 'Plushie', price: 70, image: 'https://images.pexels.com/photos/2520829/pexels-photo-2520829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
    const [products, setProducts] = useState([productExample])
    var [action, setAction] = useState("ejemplo")
    
    function productsAsLists() {
        let lists = products.map(product => (
            <li key={product.id}>
                Product Name: {product.name}
                {product.id === 0  ? <div></div> : <button onClick={updateProduct(product.id)}>Update Product</button>}
                {product.id === 0 ? <div></div> : <button onClick={deleteProduct(product.id)}>Delete Product</button>}
                <br></br>
                Price: {product.price}{"$"}
                <br></br>
                <img src={product.image}></img>
            </li>
        ))
        return lists
    }

    function getAllProducts() {
        setAction("vanish")
        fetch('/getProducts')
            .then(res => {
                return res.json()
            }).then(val => {
                setProducts(val)
            })
    }

    function updateProduct(id) {
        // fetch('/updateProduct/' + id, {method: 'UPDATE'})
        //     .then(res => {
        //         return res.json()
        //     }).then(val => {
        //         setProducts(val)
        //     })
    }

    function deleteProduct(id) {
        // fetch('/deleteProduct/' + id, {method: 'DELETE'})
        //     .then(res => {
        //         return res.json()
        //     }).then(val => {
        //         setProducts(val)
        //     })
    }

    return (
        <div>
            <h1>PRODUCTS</h1>
            {action === "ejemplo" ? <h2>Este es un producto de ejemplo</h2> : <h2>Estos son los productos de la base de datos</h2>}
            <button onClick={getAllProducts}> GET ALL PRODUCTS </button>
            <ul>
                {productsAsLists()}
            </ul>
        </div>
    )
}