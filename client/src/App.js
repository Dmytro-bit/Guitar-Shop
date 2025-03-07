import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Home from "./component/Home";
import Catalog from "./component/Catalog";
import Products from "./component/Products";
import Product from "./component/Product";
import About from "./component/About";
import Login from "./component/Login"
import Register from "./component/Register";
import Cart from "./component/Cart"
import Footer from "./component/Footer";
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "./config/global_constants";
import axios from "axios";
import {showNotifications} from  "./ShowNotifications"

axios.defaults.baseURL = SERVER_HOST;

if (typeof localStorage.accessLevel === "undefined" || localStorage.accessLevel === "null" || localStorage.accessLevel === 0)
{
  localStorage.accessLevel = ACCESS_LEVEL_GUEST
  localStorage.token = null
  localStorage.email = null
}

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  console.log("token in App.js interceptor", token);
  const protectedApi = config.url.includes("user/");
  console.log("protectedApi", protectedApi);
  const configUrl = config.url
  console.log("configUrl ", configUrl);
  if (token && protectedApi) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {

            // const message = error.response?.data?.message || 'An unexpected error occurred';
            // showNotifications(message, 'error');
          switch (error.response.status) {
            case 400:
                const message0 = error.response?.data?.message || 'An unexpected error occurred';
                console.log("message :::",message0)
                showNotifications(message0, 'error');
              // 400 Bad Request
              console.error('Bad Request:', error.response.data.message || 'Invalid request.');
              break;
            case 401:
              //  401 Unauthorized
                const url = error.response.config.url
                console.log("response url ", url)
                if(error.response.config.url.includes("user/")){
                  localStorage.removeItem("token")
                  localStorage.removeItem("accessLevel")
                  localStorage.removeItem("email")
                    const orderAddress =
                         {
                            fline: "",
                            sline: "",
                            city: "",
                            county: "",
                            eircode: "",
                        }
                    localStorage.setItem("isAddressSet", "false");

                    localStorage.setItem("orderAddress", JSON.stringify(orderAddress))
                    const message1 = error.response?.data?.message || 'An unexpected error occurred';
                    console.log("message :::",message1)
                    showNotifications(message1, 'error');
                    window.location.reload();
                }else{
                  console.error('Unauthorized:', 'User is not authenticated.');
                }
              break;
            case 403:
              //  403 Forbidden
                const message2 = error.response?.data?.message || 'An unexpected error occurred';
                console.log("message :::",message2)
                showNotifications(message2, 'error');
              console.error('Forbidden:', 'User does not have the necessary permissions.');
              break;
            case 404:
              // 404 Not Found
                const message3 = error.response?.data?.message || 'An unexpected error occurred';
                console.log("message :::",message3)
                showNotifications(message3, 'error');
              console.error('Not Found:', 'Requested resource not found.');
              break;
            case 500:
                const message4 = error.response?.data?.message || 'An unexpected error occurred';
                console.log("message :::",message4)
                showNotifications(message4, 'error');
              // 500 Internal Server Error
              console.error('Server Error:', 'Internal server error occurred.');
              break;
            default:
              // Handle other status codes
              console.error(`Error ${error.response.status}:`, error.response.data);
          }
        } else if (error.request) {
          console.log('No response received: ', error.request);
          const url = error.response.config.url
          console.log("response url ", url)
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
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
 