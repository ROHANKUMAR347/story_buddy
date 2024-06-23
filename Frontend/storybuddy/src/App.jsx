// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

//import Login from "./Pages/Login/Login"
import { BrowserRouter } from "react-router-dom"
import AllRoutes from "./Routes/AllRoutes"
import Navbar from "./Components/Navbar"
import Footer from "./Components/footer/Footer"







function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AllRoutes />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
