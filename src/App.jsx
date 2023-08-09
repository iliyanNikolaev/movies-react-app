import { Routes, Route } from "react-router-dom"

import Home from "./components/Home/Home"
import Navigation from "./components/Navigation/Navigation"
import Catalog from "./components/Catalog/Catalog"
import Footer from "./components/Footer/Footer"
import Create from "./components/Create/Create"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Logout from "./components/Logout/Logout"
import Details from './components/Details/Details';
import Edit from "./components/Edit/Edit"
import NotFound from "./components/404/404"
import DbData from "./components/DbData/DbData"

import { AuthCtxProvider } from './contexts/authContext';
import { MovieCtxProvider } from './contexts/movieContext';


function App() {

  return (
    <AuthCtxProvider>
      <MovieCtxProvider>

        <Navigation />

        <div className="jsx-root">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/catalog" element={<Catalog />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/details/:movieId" element={<Details />}></Route>
            <Route path="/edit/:movieId" element={<Edit />}></Route>
            <Route path="/DB" element={<DbData />}></Route>
            <Route path="*" element={<Home />}></Route>
          </Routes>
        </div>

        <Footer />
      </MovieCtxProvider>
    </AuthCtxProvider>
  )
}

export default App
