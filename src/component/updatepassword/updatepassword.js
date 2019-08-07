import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import API from '../../service/signup.service';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import history from '../../history';
import Swal from 'sweetalert2';
import '../login/login.css';

class UpdatePassword extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            oldPassword: '',
            oldPasswordError: '',
            newPassword: '',
            newPasswordError: '',
            confirmPassword: '',
            confirmPasswordError: ''
        }
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.UpdatePassword = this.UpdatePassword.bind(this);
    }


    /** onChange event  */
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    /** validation of updatepassword form */
    validate = () => {
        let emailError = "";
        let oldPasswordError = "";
        let newPasswordError = "";
        let confirmPasswordError = "";

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.email)) {
            emailError = "invalid email";
        }

        if (!this.state.oldPassword) {
            oldPasswordError = "please enter old password";
        }

        if (!this.state.newPassword) {
            newPasswordError = "please enter new password";
        }

        if (!this.state.confirmPasswordError) {
            confirmPasswordError = "please enter confirm password";
        }

        if (emailError || oldPasswordError || newPasswordError || confirmPasswordError) {
            this.setState({ emailError, oldPasswordError, newPasswordError, confirmPasswordError });
            return false;
        }
        return true;
    };


    /** Update Password */
    UpdatePassword() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                email: '',
                emailError: '',
                oldPassword: '',
                oldPasswordError: '',
                newPassword: '',
                newPasswordError: '',
                confirmPassword: '',
                confirmPasswordError: ''
            })
        };

        if (this.state.email && this.state.oldPassword && this.state.newPassword && this.state.confirmPassword) {
            const obj = {
                email: this.state.email,
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                confirmPassword: this.state.confirmPassword
            }
            API.UpdatePasswordUser(obj).
                then((findresponse) => {
                    console.log("response==", findresponse);
                    Swal.fire("Password Update Succesfully!", "", "success");
                    history.push('../home');
                }).catch({ status: 500, message: 'Internal Server Error' });
        }
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <form>
                            <p className="h4 text-center mb-4">UpdatePassword</p>
                            <label className="grey-text">
                                email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="defaultFormRegisterEmailEx1"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.handleChangeEvent}

                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.emailError}
                            </div>
                            <br />
                            <label

                                className="grey-text"
                            >
                                Your old password
                            </label>
                            <input
                                type="password"
                                name="oldPassword"
                                id="defaultFormRegisterPasswordEx2"
                                className="form-control"
                                value={this.state.oldPassword}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.oldPasswordError}
                            </div>
                            <label

                                className="grey-text"
                            >
                                Your new password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                id="defaultFormRegisterPasswordEx3"
                                className="form-control"
                                value={this.state.newPassword}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.newPasswordError}
                            </div>
                            <label
                                className="grey-text"
                            >
                                Your confirm password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                value={this.state.confirmPassword}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.confirmPasswordError}
                            </div>
                            <div className="text-center mt-4">
                                <MDBBtn color="unique" onClick={this.UpdatePassword} disabled={!this.state.email}>
                                    Update Password
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default UpdatePassword;
