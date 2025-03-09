import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Home from "./component/Home";
import Catalog from "./component/Catalog";
import Products from "./component/Products";
import Product from "./component/Product";
import About from "./component/About";
import Login from "./component/Login";
import Register from "./component/Register";
import Cart from "./component/Cart";
import Orders from "./component/Orders";
import Users from "./component/Users";
import Footer from "./component/Footer";
import { ACCESS_LEVEL_GUEST, SERVER_HOST, SANDBOX_CLIENT_ID } from "./config/global_constants";
import axios from "axios";
import { showNotifications } from "./ShowNotifications";

axios.defaults.baseURL = SERVER_HOST;

if (!localStorage.accessLevel || localStorage.accessLevel === "null" || localStorage.accessLevel === "0") {
    localStorage.accessLevel = ACCESS_LEVEL_GUEST;
    localStorage.token = null;
    localStorage.email = null;
}

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    const protectedApi = config.url.includes("user/");
    if (token && token !== "null" && protectedApi) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const message = error.response?.data?.message || error.response?.data?.error || 'An unexpected error occurred';
            showNotifications(message, 'error');

            switch (error.response.status) {
                case 400:
                    console.error('Bad Request:', message);
                    break;
                case 401:
                    if (error.response.config.url.includes("user/")) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("accessLevel");
                        localStorage.removeItem("email");
                        localStorage.setItem("isAddressSet", "false");
                        localStorage.setItem("orderAddress", JSON.stringify({
                            fline: "", sline: "", city: "", county: "", eircode: ""
                        }));
                        window.location.reload();
                    } else {
                        console.error('Unauthorized:', message);
                    }
                    break;
                case 403:
                    console.error('Forbidden:', message);
                    break;
                case 404:
                    console.error('Not Found:', message);
                    break;
                case 500:
                    console.error('Server Error:', message);
                    break;
                default:
                    console.error(`Error ${error.response.status}:`, message);
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Axios error:', error.message);
        }
        return Promise.reject(error);
    }
);

class App extends React.Component {
    render() {
        return (
            <PayPalScriptProvider options={{ currency: "EUR", "client-id": SANDBOX_CLIENT_ID }}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/catalog" component={Catalog} />
                        <Route exact path="/products" component={Products} />
                        <Route path="/products/:id" component={Product} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/cart" component={Cart} />
                        <Route path="/orders/:id" component={Orders} />
                        <Route exact path="/orders" component={Orders} />
                        <Route exact path="/users" component={Users} />
                    </Switch>
                    <Footer />
                </Router>
            </PayPalScriptProvider>
        );
    }
}

export default App;
