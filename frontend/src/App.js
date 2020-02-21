import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component';
import CreateUser from './components/create-user.component';
import Login from './components/login.component';
import CreatePackage from './components/createPackage.component';
import PlaceOrder from './components/placeorder.component';
import EditOrder from './components/editorder.component';
import DispatchOrder from './components/dispatchorder.component.js';
import CancelOrder from './components/cancelorder.component.js';
import PackageSearch from './components/packagesearch.component.js';
import DispatchedOrders from './components/dispatchedorders.component.js';
import PlacedOrders from './components/placedorders.component.js';
import CancelledOrders from './components/cancelledorders.component.js';
import WaitingOrders from './components/waiting.component.js';
import AllOrders from './components/allorders.component.js';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
                </li>
                <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="navbar-item">
                <Link to="/createPackage" className="nav-link">Create Package</Link>
                </li>
                <li className="navbar-item">
                <Link to="/placeorder" className="nav-link">Place Order</Link>
              </li>
              <li className="navbar-item">
                <Link to="/editorder" className="nav-link">Edit Order</Link>
              </li>
              <li className="navbar-item">
                <Link to="/dispatchorder" className="nav-link">Dispatch Order</Link>
              </li>
              <li className="navbar-item">
                <Link to="/cancelorder" className="nav-link">Cancel Order</Link>
              </li>
              <li className="navbar-item">
                <Link to="/packagesearch" className="nav-link">Package Search</Link>
              </li>
              <li className="navbar-item">
                <Link to="/dispatchedorders" className="nav-link">Dispatched Orders</Link>
              </li>
              <li className="navbar-item">
                <Link to="/placedorders" className="nav-link">Placed Orders</Link>
              </li>
              <li className="navbar-item">
                <Link to="/waitingorders" className="nav-link">Waiting Orders</Link>
              </li>
              <li className="navbar-item">
                <Link to="/cancelledorders" className="nav-link">Cancelled Orders</Link>
              </li>
              <li className="navbar-item">
                <Link to="/allorders" className="nav-link">All Orders</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Route path="/" exact component={UsersList}/>
        <Route path="/create" component={CreateUser}/>
        <Route path="/login" component={Login}/>
        <Route path="/createPackage" component={CreatePackage}/>
        <Route path="/placeorder" component={PlaceOrder}/>
        <Route path="/editorder" component={EditOrder}/>
        <Route path="/dispatchorder" component={DispatchOrder}/>
        <Route path="/cancelorder" component={CancelOrder}/>
        <Route path="/packagesearch" component={PackageSearch}/>
        <Route path="/dispatchedorders" component={DispatchedOrders}/>
        <Route path="/placedorders" component={PlacedOrders}/>
        <Route path="/waitingorders" component={WaitingOrders}/>
        <Route path="/cancelledorders" component={CancelledOrders}/>
        <Route path="/allorders" component={AllOrders}/>
        
      </div>
    </Router>
  );
}

export default App;
