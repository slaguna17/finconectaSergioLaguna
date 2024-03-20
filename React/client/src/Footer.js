import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faXTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import './footer.css'
import logo from './images/finconecta.jpeg'


export default function Footer() {
    return (
        <div className="footerContainer">

            <div className="footerNav">
                <ul>
                    <li>
                        <Link to="/" className="hyperlink">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="hyperlink">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="hyperlink">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" className="hyperlink">
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </div>
            <h2 className="follow">Follow Us!</h2>
            <div className="socials">
                <Link to="https://www.facebook.com/finconecta">
                    <FontAwesomeIcon icon={faFacebook} size="2xl" style={{ color: "#24a9b4", }} />
                </Link>
                <Link to="https://twitter.com/FinConecta">
                    <FontAwesomeIcon icon={faXTwitter} size="2xl" style={{ color: "#24a9b4", }} />
                </Link>
                <Link to="https://www.instagram.com/finconecta/">
                    <FontAwesomeIcon icon={faInstagram} size="2xl" style={{ color: "#24a9b4", }} />
                </Link>
                <Link to="https://www.linkedin.com/company/finconecta/">
                    <FontAwesomeIcon icon={faLinkedinIn} size="2xl" style={{ color: "#24a9b4", }} />
                </Link>

            </div>
            <div className="bottom">
                <img src={logo} className="logo"></img>
                <h3>Copyright &copy;2024;</h3>
            </div>
        </div>
    )
}
//     return (
//     <nav className="nav">
//         <Link to="/" className="title">
//             Finconecta Assessment
//         </Link>
//     <ul>
//         <CustomLink to="/products">Products</CustomLink>
//         <CustomLink to="/login">Login</CustomLink>

//     </ul>
//    </nav> 
//     )
//}
function CustomLink({ to, children, ...props }) {
    //Absolute path
    const resolvedPath = useResolvedPath(to)
    //Tests absolute path
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}