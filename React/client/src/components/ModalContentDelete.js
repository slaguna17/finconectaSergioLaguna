import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ModalContentDelete = ({ID}) => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")

    const deleteProduct = async (event) => {
    console.log('Inicie el submit');
    event.preventDefault()
    console.log('Este es el ID a borrar', ID);
    try {
        await fetch('/deleteProduct/'+ ID,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log('Termine el fetch y este es el response',response);

                toast.success("Product deleted")
            })

            } catch (error) {
                console.error('Error al eliminar el producto', error)
                toast.error("Error deleting product")
            }

        }

    return (
            <div className="body">
                <ToastContainer />
                <form onSubmit={deleteProduct}>
                    <div className="header">
                        <div className="title">
                            Delete Product
                        </div>
                        <div className="underline">

                        </div>
                    </div>
                    <h2>Are you sure?</h2>
                    <div className="submitContainer">
                        <button className="submit" type='submit'>
                            Delete Product
                        </button>
                    </div>
                </form>
            </div>
    )
}
export default ModalContentDelete