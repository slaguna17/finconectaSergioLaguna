import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import ModalContentCreate from '../components/ModalContentCreate';
import ModalContentUpdate from '../components/ModalContentUpdate';
import ModalContentDelete from '../components/ModalContentDelete';


export default function Products(){

    //DEFAULT PRODUCT
    const productExample = {
        id:0,
        name: 'Plushie',
        price: 70, 
        image: 'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }

    //HOOKS
    const [products, setProducts] = useState([productExample])
    var [action, setAction] = useState("example")
    let navigate = useNavigate()
    
    function productsAsLists() {
        let lists = products.map(product => (
            <li key={product.id}>
                Product Name: {product.name}
                {product.id === 0  
                ? <div></div> 
                : <button onClick={() => {
                    console.log('The product ID is',product._id);
                    setDialogContent(<ModalContentUpdate ID={product._id}/>)
                    toggleDialog()
                }}>Update Product</button>
                }
                {product.id === 0 
                ? <div></div> 
                : <button onClick={() => {
                    console.log('The product ID is',product._id);
                    setDialogContent(<ModalContentDelete ID={product._id}/>)
                    toggleDialog()
                }}>Delete Product</button>
                }
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

    const dialogRef = useRef(null)
    const [dialogContent, setDialogContent] = useState(null)

    function toggleDialog(){
        if(!dialogRef.current){
            return
        }
        dialogRef.current.hasAttribute("open")
        ? dialogRef.current.close()
        : dialogRef.current.showModal();
    }

    const dialogClick = (event) => {
        if (event.currentTarget === event.target) {
            toggleDialog()
        }
    }


    return (
        <div>
            <h1>PRODUCTS</h1>
            {action === "example" ? <h2>This is a sample product</h2> : <h2>These are the Database products</h2>}
            <button onClick={getAllProducts}> GET ALL PRODUCTS </button>

            <button onClick={() => {
                setDialogContent(<ModalContentCreate />)
                toggleDialog()
            }}>CREATE A PRODUCT </button>
            <dialog ref={dialogRef} onClick={dialogClick}>
                {dialogContent}
                <button onClick={toggleDialog}> 
                    Close 
                </button>
            </dialog>
            <ul>
                {productsAsLists()}
            </ul>
        </div>
    )
}