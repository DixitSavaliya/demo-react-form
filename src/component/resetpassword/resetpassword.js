import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import API from '../../service/signup.service';
import history from '../../history';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ResetPassword extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordError: ''
        }
        this.ResetPassword = this.ResetPassword.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    /** first this method call */
    componentDidMount() {
        console.log("query=", this.props.location.pathname.split('/')[2]);
    }

    /** validation of reset form */
    validate = () => {
        let passwordError = "";

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


    /** onChange event  */
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    /** Reset password  */
    ResetPassword() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                password: '',
                passwordError: ''
            })
        };
        const obj = {
            password: this.state.password
        }
        const hash = this.props.location.pathname.split('/')[2];
        API.ResetPassword(obj, hash).
            then((findresponse) => {
                console.log("response==", findresponse);
                history.push('../login');
            }).catch({ status: 500, message: 'Internal Server Error' });
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBModalBody>
                        <form>
                            <label
                                className="grey-text"
                            >
                                Your password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="defaultFormRegisterPasswordEx"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.handleChangeEvent}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.passwordError}
                            </div>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.ResetPassword} disabled={!this.state.password}>Send</MDBBtn>
                    </MDBModalFooter>
                </MDBContainer>
            </div>
        );
    }
}

export default ResetPassword;
