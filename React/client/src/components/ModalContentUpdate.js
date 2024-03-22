import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ModalContentUpdate = ({ID}) => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")

    const updateProduct = async (event) => {
        console.log('Inicie el submit');
        event.preventDefault()
        if (
            name == null || name == '' ||
            price == null || price == ''
        ) {
            console.log("Please fill all the fields");
            toast.error("Fill all required fields!")
        } else {
            const product = { name: name, price: price, image: image }
            console.log('Este es el nuevo producto', product);
            try {
                await fetch('/updateProduct/'+ ID,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    }
                ).then(response => {
                    console.log('Termine el fetch y este es el response',response);
                    response.json()
                    toast.success("Product updated successfully")
                })

            } catch (error) {
                console.error('Error al editar el producto', error)
                toast.error("Error editing product")
            }

        }
    }

    return (
            <div className="body">
                <ToastContainer />
                <form onSubmit={updateProduct}>
                    <div className="header">
                        <div className="title">
                            Edit Product
                        </div>
                        <div className="underline">

                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input type="text" placeholder='Name' id='name' value={name} onChange={(e) => { setName(e.target.value) }}>

                            </input>
                        </div>
                        <div className="input">
                            <input type="number" placeholder='Price' id='price' value={price} onChange={(e) => { setPrice(e.target.value) }}>

                            </input>
                        </div>
                        <div className="input">
                            <input type="text" placeholder='Image' id='password' value={image} onChange={(e) => { setImage(e.target.value) }}>

                            </input>
                        </div>
                    </div>
                    <div className="submitContainer">
                        <button className="submit" type='submit'>
                            Edit Product
                        </button>
                    </div>
                </form>
            </div>
    )
}
export default ModalContentUpdate