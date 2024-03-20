import {Link, useMatch, useResolvedPath} from "react-router-dom"

export default function Navbar(){
    return (
    <nav className="nav">
        <Link to="/" className="title">
            Finconecta Assessment
        </Link>
    <ul>
        <CustomLink to="/products">Products</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/signup">Sign Up</CustomLink>
    </ul>
   </nav> 
    )
}
function CustomLink({to,children, ...props}){
    //Absolute path
    const resolvedPath = useResolvedPath(to)
    //Tests absolute path
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
    <li className={isActive ? "active" : ""}>
        <Link to ={to} {...props}>
            {children}
        </Link>
    </li>
    )
}