import { useState } from 'react'
import {ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './login.css'
export default function Login() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        console.log('Inicie el submit');
        e.preventDefault();
        try {
            const response = await fetch('/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                }
            )
            const data = await response.json();
            console.log('data:', data);
            if (data == null){
                console.log("User not found");
                toast.error("Wrong credentials")
            }
            toast.success("Log in successful")
        } catch (error) {
            console.error('Error al iniciar sesion', error)
            toast.error("Wrong credentials")
        }
    }

    return (
        <div className='all'>
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <div className="body">
                    <div className="header">
                        <div className="title">
                            Login
                        </div>
                        <div className="underline">

                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input type="text" placeholder='Name' id='name' value={name} onChange={(e) => {setName(e.target.value)}}>

                            </input>
                        </div>
                        <div className="input">
                            <input type="text" placeholder='Email'  id='email' value={email} onChange={(e) => {setEmail(e.target.value)}}>

                            </input>
                        </div>
                        <div className="input">
                            <input type="password" placeholder='Password'  id='password' value={password} onChange={(e) => {setPassword(e.target.value)}}>

                            </input>
                        </div>
                    </div>
                    <div className="forgotPassword">
                        Forgot Password?
                        <span>
                            Click here!
                        </span>
                    </div>

                    <div className="submitContainer">
                        <button className="submit" type='submit'>
                            Log In
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}