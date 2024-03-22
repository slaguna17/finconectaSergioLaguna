import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ModalContentCreate = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")

    const addProduct = async (event) => {
        console.log('Inicie el submit');
        event.preventDefault()
        if (
            name == null || name == '' ||
            price == null || price == ''
        ) {
            console.log("Please fill all the fields");
            toast.error("Fill all required fields!")
        } else {
            const newProduct = { name: name, price: price, image: image }
            console.log(newProduct);
            try {
                await fetch('/addProduct',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newProduct)
                    }
                ).then(response => {
                    console.log(response);
                    response.json()
                    toast.success("Product created successfully")
                })

            } catch (error) {
                console.error('Error al crear al usuario', error)
                toast.error("Something went wrong")
            }

        }
    }

    return (
            <div className="body">
                <ToastContainer />
                <form onSubmit={addProduct}>
                    <div className="header">
                        <div className="title">
                            Add Product
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
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
    )
}
export default ModalContentCreate