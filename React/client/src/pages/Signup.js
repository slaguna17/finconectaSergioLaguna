import { useState } from 'react'
import axios from 'axios';

import './signup.css'
export default function Signup() {
    const [action, setAction] = useState("Signup")

    const addUser = async (event) => {
        console.log(event);
        const newUser = { name: "claudio", email: "aaa", password: "a" }
        event.preventDefault()
        await axios.post('/signup', newUser)
    }

    return (
        <div className='all'>
            <form onSubmit={(event) => {addUser(event)}}>
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
                            <input type="text" placeholder='Name'>

                            </input>
                        </div>
                        <div className="input">
                            <input type="text" placeholder='Email'>

                            </input>
                        </div>
                        <div className="input">
                            <input type="password" placeholder='Password'>

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