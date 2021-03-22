import React from 'react';
import '../styles/admin_home.css';
import {Link, Redirect} from 'react-router-dom';
import ESNavbar from './nav_bar';
import { compose } from 'redux';
import { connect } from 'react-redux';

function AdminHome(props) {
    const {auth} = props;
    if(!auth.uid) return <Redirect to='/signin'/>
    return (
        <>
        <Redirect to='/proctorpage'/>
        <div>
            <ESNavbar />
        </div>
        </>
    );
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
)(AdminHome);