import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/homePage"
import Register from "./pages/register"
import Login from "./pages/login";
import { useContext } from "react";
import { userDataContext } from "./context/userContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function App() {
  let{userData} =  useContext(userDataContext)
  let location= useLocation()
  return (
       <>
       
      <Routes>
         <Route path="/" element={userData?<Home/>:<Navigate to="/login" state={{from:location.pathname}}/> } />
         <Route
          path="/login"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Login />
          }
        />

         <Route
          path="/signup"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Register />
          }
        />
        
      </Routes>

       </>

      );
}

export default App;
