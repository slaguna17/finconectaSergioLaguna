import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Products(){
    let navigate = useNavigate()
    const productExample = {id:0, name: 'Plushie', price: 70, image: 'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
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

    // useEffect(() => {
    //     // DELETE request using fetch with async/await
    //     async function deletePost() {
    //         await fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE' });
    //         setStatus('Delete successful');
    //     }
    
    //     deletePost();
    // }, []);

    function getAllProducts() {
        setAction("vanish")
        fetch('/getProducts')
            .then(res => {
                return res.json()
            }).then(val => {
                setProducts(val)
            })
    }

    const addProduct = async (event) => {
        const newProduct = {name: "Jabon", price : 15, image: "https://images.pexels.com/photos/773252/pexels-photo-773252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
        event.preventDefault()
        await axios.post('/addProduct', newProduct)
    }

    // const addProduct = (n, p, i) => {
    //     n = "Jabon"
    //     p = 15
    //     i = "https://images.pexels.com/photos/773252/pexels-photo-773252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     const newProduct = {name: n, price: p, image:i }
    //     console.log("Nombre: " + n + " Precio: " + p + " Imagen: " + i)
    //     setAction("vanish")
    //     fetch('/addProduct', {method : 'POST'})
    //     .then(res => {
    //         if(!res.ok){
    //             console.log("Problem")
    //             return res.status(500)
    //         }
    //         return newProduct
    //     }).then(data => {
    //         console.log(data)
    //         console.log('Success')
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }

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
            <button onClick={addProduct}>CREATE A PRODUCT </button>

            <ul>
                {productsAsLists()}
            </ul>
        </div>
    )
}