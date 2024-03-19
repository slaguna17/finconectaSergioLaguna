import React, {useEffect, useState} from 'react';
import "./styles.css"
import {Route, Routes} from "react-router-dom"

//pages
import Navbar from './Navbar';
import Footer from './Footer';
import Products from "./pages/Products"
import Login from "./pages/Login"
import Home from './pages/Home';

function App () {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/get").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <div className='bodyContainer'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
      <Footer></Footer>
    </>
  )

  // {/* Test de conexion */}
  // return (
  //   <div>
  //     {(typeof backendData.users === 'undefined') ? (
  //       <p>Loading...</p>
  //     ): (
  //       backendData.users.map((user, i) => (
  //         <p key={i}>{user}</p>
  //       ))
  //     )}
  //   </div>
  // );
}

export default App;
