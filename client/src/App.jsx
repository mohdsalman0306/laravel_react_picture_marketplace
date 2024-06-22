import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/user/Register"
import Login from "./components/user/Login"
import Header from "./components/layouts/Header"
import Upload from "./components/upload/Upload"

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/upload" element={<Upload/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
