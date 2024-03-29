import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Routes, Route } from "react-router-dom";
import Under_maintain from "./Under_maintain";
import SecondPgNavFiltr from './SecondPgNavFiltr';
import ThirdPage from './ThirdPage';
import LoginPage from './LoginPage';
import AdminPortal from './AdminPortal';
import './Under_maintain.css';
import './App.css';
import './SecondPgNavFiltr.css';
import './ThirdPage.css';
import './LoginPage.css';
import './AdminPortal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./redux/store"; 

/*ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  
  , document.getElementById('root'));*/

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(

    <Provider store={store}>
       <BrowserRouter>
    <Routes>
               <Route path="/under_maintainance" element={<Under_maintain />} />
               <Route exact path="/" element={<App />} />
               <Route path="/profile-page" element={<SecondPgNavFiltr />} />
               <Route path="/third-page" element={<ThirdPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/admin" element={<AdminPortal />} />
               {/* <Route exact path="/about" element={<ConsltAbout />} />
               
               <Route exact path="/service" element={<Service />} /> */}
               {/* <Redirect to="/" element={<Home />}  /> */}
           </Routes>

   </BrowserRouter>
    </Provider>
  );

  reportWebVitals();