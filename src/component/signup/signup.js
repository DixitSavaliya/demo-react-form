import React from 'react';
import { MDBContainer, MDBRow, MDBBtn } from 'mdbreact';
import API from '../../service/signup.service';
import '../login/login.css'

class SignUp extends React.Component {
	/** constructor call */
	constructor(props) {
		console.log("props======", props);
		super(props);
		this.state = {
			firstName: '',
			firstNameError: '',
			lastName: '',
			lastNameError: '',
			userName: '',
			userNameError: '',
			password: '',
			passwordError: '',
			email: '',
			emailError: ''
		};
		this.Signup = this.Signup.bind(this);
		this.handleChangeEvent = this.handleChangeEvent.bind(this);
	}

	/** validation of signup form */
	validate = () => {
		let firstNameError = "";
		let lastNameError = "";
		let userNameError = "";
		let passwordError = "";
		let emailError = "";

		if (!this.state.firstName) {
			firstNameError = "please enter first name";
		}

		if (!this.state.lastName) {
			lastNameError = "please enter last name";
		}

		if (!this.state.userName) {
			userNameError = "please enter user name";
		}

		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!reg.test(this.state.email)) {
			emailError = "invalid email";
		}
		const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!regex.test(this.state.password)) {
            passwordError = "please enter old password";
        }

		if (firstNameError || lastNameError || userNameError || emailError || passwordError) {
			this.setState({ firstNameError, lastNameError, userNameError, emailError, passwordError });
			return false;
		}
		return true;
	};

	/** User SignUp */
	Signup() {
		const isValid = this.validate();
		if (isValid) {
			console.log(this.state);
			this.setState({
				firstName: '',
				firstNameError: '',
				lastName: '',
				lastNameError: '',
				userName: '',
				userNameError: '',
				password: '',
				passwordError: '',
				email: '',
				emailError: ''
			})
		};

		if (this.state.firstName && this.state.lastName && this.state.userName && this.state.password && this.state.email) {
			const obj = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				userName: this.state.userName,
				password: this.state.password,
				email: this.state.email
			}
			API.Signup(obj).
				then((findresponse) => {
					console.log("response==", findresponse);
					window.location.href = '../login'
				}).catch({ status: 500, message: 'Internal Server Error' });
		}
	}

	/** onChange  event */
	handleChangeEvent(event) {
		event.preventDefault();
		const state = this.state
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	render() {
		return (
			<div>
				<MDBContainer>
					<MDBRow>
						<form>
							<p className="h4 text-center mb-4">Sign up</p>
							<label className="grey-text">
								Firstname
            					</label>
							<input
								type="text"
								className="form-control"
								name="firstName"
								value={this.state.firstName}
								onChange={this.handleChangeEvent}
							/>
							<div style={{ fontSize: 12, color: "red" }}>
								{this.state.firstNameError}
							</div>
							<br />
							<label className="grey-text">
								Lastname
            					</label>
							<input
								type="text"
								className="form-control"
								name="lastName"
								value={this.state.lastName}
								onChange={this.handleChangeEvent}
							/>
							<div style={{ fontSize: 12, color: "red" }}>
								{this.state.lastNameError}
							</div>
							<br />
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
							<label className="grey-text">
								Your email
           						 </label>
							<input
								type="email"
								name="email"
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
							<div className="text-center mt-4">
								<MDBBtn color="unique" onClick={this.Signup} disabled={!this.state.firstName}>
									SignUp
								</MDBBtn>
							</div>
						</form>
					</MDBRow>
				</MDBContainer>
			</div>
		);
	}
}

export default SignUp;
