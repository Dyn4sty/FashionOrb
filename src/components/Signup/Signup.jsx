import React from 'react';
import FormInput from '../form-input/forum-input';
import CustomButton from '../custom-button/custom-button';
import swal from 'sweetalert';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import './sign-up.styles.scss'

class SignUp extends React.Component {
    Initial_STATE = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    constructor(props) {
        super(props)
        this.state = this.Initial_STATE
    }
 
    handleSubmit = async event => {
        event.preventDefault()
        if (!this.state.displayName || !this.state.email || !this.state.password || this.state.password !== this.state.confirmPassword) {
            swal("Oops" ,  'Invalid Fields' ,  "error" )
            return;
        }
        try {
            const { email, password, displayName} = this.state
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
              );
              await createUserProfileDocument(user, { displayName });
        }
        catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
                swal("Oops" ,  'Password is too weak.' ,  "error" )
            } else {
                swal("Oops" ,  errorMessage ,  "error" )

            }
            console.log(error);
        }
        
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }
    render() {
        const {displayName, email, password, confirmPassword} = this.state
        return(
            <div className='sign-up'>
                <h2 className="title">I do not have an account</h2>
                <span>Sign Up with your email and password</span>
                
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                <FormInput
                    name="displayName" 
                    type="text" 
                    value={displayName} 
                    handleChange={this.handleChange}
                    label="Name"
                    required 
                    />
                    <FormInput
                    name="email" 
                    type="email" 
                    value={email} 
                    handleChange={this.handleChange}
                    label="Email"
                    required 
                    />
                    <FormInput 
                    name="password" 
                    type="password" 
                    value={password} 
                    handleChange={this.handleChange}
                    label="Password"
                    required 
                    />
                    <FormInput 
                    name="confirmPassword" 
                    type="password" 
                    value={confirmPassword} 
                    handleChange={this.handleChange}
                    label="Confirm Password"
                    required 
                    />
                    <div className="sign-in-buttons">
                    <CustomButton type="submit">Sign Up</CustomButton>
                    </div>
                </form>

            </div>

        )
    }
}

export default SignUp