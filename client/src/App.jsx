import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/user/Register"
import Login from "./components/user/Login"
import Header from "./components/layouts/Header"
import Upload from "./components/upload/Upload"
import Profile from "./components/user/Profile"
import Picture from "./components/pictures/Picture"
import Cart from "./components/cart/Cart"

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/upload" element={<Upload/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/picture/:id" element={<Picture/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
