import './login.css'
export default function Login() {
    return (
        <div className='all'>
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
                </div>
                <div className="forgotPassword">
                    Forgot Password?
                    <span>
                        Click here!
                    </span>
                </div>

                <div className="submitContainer">
                    <div className="submit">
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )
}