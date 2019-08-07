import React from 'react';
import Login from './component/login/login';
import './App.css';
import Home from './component/home/home';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = localStorage.getItem('token');
  }
  
  /** Render this app first app component run */
	render() {
		if (!this.state) {
			return (
				<div>
					<Login />
				</div>
			);
		} else {
			return (
				<div>
					<Home />
				</div>
			);
		}
	}
}
export default App;
