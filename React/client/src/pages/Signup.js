import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './signup.css'
export default function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const addUser = async (event) => {
        console.log('Inicie el submit');
        event.preventDefault()
        if (
            name == null || name == '' ||
            email == null || email == '' ||
            password == null || password == ''
        ) {
            console.log("Please fill all the fields");
            toast.error("Fill all fields!")
        } else {
            const newUser = { name: name, email: email, password: password }
            console.log(newUser);
            try {
                await fetch('/signup',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    }
                ).then(response => {
                    console.log(response);
                    response.json()
                    toast.success("User created successfully")
                })

            } catch (error) {
                console.error('Error al iniciar sesion', error)
                toast.error("Something went wrong")
            }

        }
    }

    return (
        <div className='all'>
            <ToastContainer />
            <form onSubmit={addUser}>
                <div className="body">
                    <div className="header">
                        <div className="title">
                            Sign Up
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
                            <input type="text" placeholder='Email' id='email' value={email} onChange={(e) => { setEmail(e.target.value) }}>

                            </input>
                        </div>
                        <div className="input">
                            <input type="password" placeholder='Password' id='password' value={password} onChange={(e) => { setPassword(e.target.value) }}>

                            </input>
                        </div>
                        <div className="input">
                            <input type="password" placeholder='Repeat Password'>

                            </input>
                        </div>
                    </div>
                    <div className="submitContainer">
                        <button className="submit" type='submit'>
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}