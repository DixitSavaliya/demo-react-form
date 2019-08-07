import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import history from './history';
import SignUp from './component/signup/signup';
import Login from './component/login/login';
import ForgotPassword from './component/forgotpassword/forgotpassword';
import UpdatePassword from './component/updatepassword/updatepassword';
import ResetPassword from './component/resetpassword/resetpassword';
import Home from './component/home/home';

ReactDOM.render(
    <Router history={history}>
        <Route exact path='/' component={App} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword/:hash" component={ResetPassword} />
        <Route exact path="/home" render={() => (
            localStorage.getItem('token') ? (<Route component={Home} />)
                : (<Route component={Login} />)
        )} />
        <Route exact path="/updatepassword" render={() => (
            localStorage.getItem('token') ? (<Route component={UpdatePassword} />)
                : (<Route component={Login} />)
        )} />
        
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
