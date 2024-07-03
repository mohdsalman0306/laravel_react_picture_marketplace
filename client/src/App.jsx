import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/user/Register"
import Login from "./components/user/Login"
import Header from "./components/layouts/Header"
import Upload from "./components/upload/Upload"
import Profile from "./components/user/Profile"

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
        </Routes>
    </BrowserRouter>
  )
}

export default App
