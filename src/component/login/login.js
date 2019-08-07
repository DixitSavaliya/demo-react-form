import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import API from '../../service/signup.service';
import { Link } from 'react-router-dom';
import './login.css';
import Swal from 'sweetalert2';

class Login extends React.Component {

  /** First Constructor Call */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userNameError: '',
      password: '',
      passwordError: '',
      user: null
    }
    this.login = this.login.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  /** onChange event  */
  handleChangeEvent(event) {
    event.preventDefault();
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** validation of login form */
  validate = () => {
    let userNameError = "";
    let passwordError = "";

    if (!this.state.userName) {
      userNameError = "please enter username";
    }

    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!regex.test(this.state.password)) {
      passwordError = "please enter old password";
    }

    if (userNameError || passwordError) {
      this.setState({ userNameError, passwordError });
      return false;
    }
    return true;
  };

  /** User Login successfully */
  login() {
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      this.setState({
        userName: '',
        userNameError: '',
        password: '',
        passwordError: ''
      })
    };
    if (this.state.userName && this.state.password) {
      const obj = {
        userName: this.state.userName,
        password: this.state.password
      }
      API.Login(obj).
        then((findresponse) => {
          this.setState({
            user: findresponse
          })
          console.log("login response===", this.state.user);
          localStorage.setItem('token', this.state.user.data.token);
          window.location.href = '../home'
        }).catch(
          { status: 500, message: 'Internal Server Error' }
        );
    }
  }

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <form>
              <p>Sign in</p>
              <div>
                <label className="grey-text">
                  Username
            					</label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleChangeEvent}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.userNameError}
                </div>
                <br />
              </div>
              <div>
                <label
                  className="grey-text"
                >
                  Your password
          			</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChangeEvent}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.passwordError}
                </div>
              </div>
              <div className="text-center mt-4">
                <MDBBtn color="indigo" onClick={this.login} disabled={!this.state.userName && !this.state.password}>Login</MDBBtn>
              </div>
              <div>
                <span>
                  <p><Link to="/forgotpassword">Forgot password?</Link></p>
                </span>
                <span>
                  <p><Link to="/signup">Create new account</Link></p>
                </span>
              </div>
            </form>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Login;
