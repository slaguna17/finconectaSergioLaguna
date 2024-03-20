import { useState } from 'react'
import './signup.css'
export default function Signup() {
    const [action, setAction] = useState("Signup")
    return (
        <div className='all'>
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
                    <div className="submit">
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    )
}