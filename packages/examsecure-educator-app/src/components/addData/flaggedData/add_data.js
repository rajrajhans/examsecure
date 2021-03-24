import React, { Component } from 'react'
//import axios from 'axios';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {uploadFlaggedImages} from '../../../actions/proctor_actions'
import ESNavbar from '../../nav_bar'

class AddData extends Component {
    state = {
        selectedFile: null,
        name: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onFileChange = (e) => {
        this.setState({selectedFile:e.target.files[0]});
        //const tempFile = URL.createObjectURL(e.target.files[0])
        //console.log(tempFile);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(this.state.selectedFile);
        //console.log('Helloo');
        this.props.uploadFlaggedImages(this.state)
    }
    render() {
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        return(
            <div>
                <ESNavbar />
                <form onSubmit={this.onSubmit}>
                    <h1>Uploading Data Parts</h1>
                    <div>
                        <label >Name</label>
                        <input type="text" id="name" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="file" onChange={this.onFileChange} />
                    </div>
                    <div>
                        <button> Upload!</button>
                    </div>
                </form>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFlaggedImages: (uploadData) => dispatch(uploadFlaggedImages(uploadData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddData);