import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Home from "./component/Home";
import Catalog from "./component/Catalog";
import Products from "./component/Products";
import Product from "./component/Product";
import About from "./component/About";
import Login from "./component/Login"
import Register from "./component/Register";
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "./config/global_constants";
import axios from "axios";

axios.defaults.baseURL = SERVER_HOST;

if (typeof localStorage.accessLevel === "undefined")
{
  localStorage.name = "GUEST"
  localStorage.accessLevel = ACCESS_LEVEL_GUEST
  localStorage.token = null
  localStorage.profilePhoto = null
}

axios.interceptors.request.use(
    response => response,
    error => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              // 400 Bad Request
              console.error('Bad Request:', error.response.data.message || 'Invalid request.');
              break;
            case 401:
              //  401 Unauthorized
              console.error('Unauthorized:', 'User is not authenticated.');
              break;
            case 403:
              //  403 Forbidden
              console.error('Forbidden:', 'User does not have the necessary permissions.');
              break;
            case 404:
              // 404 Not Found
              console.error('Not Found:', 'Requested resource not found.');
              break;
            case 500:
              // 500 Internal Server Error
              console.error('Server Error:', 'Internal server error occurred.');
              break;
            default:
              // Handle other status codes
              console.error(`Error ${error.response.status}:`, error.response.data);
          }
        } else if (error.request) {
          console.log('No response received: '.error.request);
        } else {
          console.log('Axios error', error.message);
        }
      return Promise.reject(error);
    }
)
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
 