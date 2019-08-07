import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
    "mdbreact";
import { MDBBtn } from "mdbreact";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import history from '../../history';
import './home.css'


class Home extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.logout = this.logout.bind(this);
        this.updatepassword = this.updatepassword.bind(this);
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    /** logout user */
    logout() {
        localStorage.removeItem('token');
        history.push('../login');
    }

    /** update password component call */
    updatepassword() {
        history.push('../updatepassword');
    }

    render() {
        return (
            <div>
                <Router>
                    <MDBNavbar color="default-color" dark expand="md">
                        <MDBNavbarBrand>
                            <strong className="white-text">Navbar</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse} />
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem active>
                                    <MDBNavLink to="#!">Home</MDBNavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                            <MDBNavbarNav right>
                                <MDBBtn color="indigo" onClick={this.logout}>Log Out</MDBBtn>
                                <MDBBtn color="indigo" onClick={this.updatepassword}>Update password</MDBBtn>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </Router>
                <MDBContainer>
                    <MDBCarousel
                        activeItem={1}
                        length={3}
                        showControls={true}
                        showIndicators={true}
                        className="z-depth-1"
                    >
                        <MDBCarouselInner>
                            <MDBCarouselItem itemId="1">
                                <MDBView>
                                    <img
                                        className="d-block w-100"
                                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
                                        alt="First slide"
                                    />
                                </MDBView>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="2">
                                <MDBView>
                                    <img
                                        className="d-block w-100"
                                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
                                        alt="Second slide"
                                    />
                                </MDBView>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="3">
                                <MDBView>
                                    <img
                                        className="d-block w-100"
                                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                                        alt="Third slide"
                                    />
                                </MDBView>
                            </MDBCarouselItem>
                        </MDBCarouselInner>
                    </MDBCarousel>
                </MDBContainer>
            </div>
        );
    }
}

export default Home;
