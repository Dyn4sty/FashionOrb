import React from 'react';
import FormInput from '../form-input/forum-input';
import CustomButton from '../custom-button/custom-button';
import {signInWithGoogle} from '../../firebase/firebase.utils';
import GoogleButton from 'react-google-button';
import { auth } from '../../firebase/firebase.utils';
import swal from 'sweetalert';
import './Signin.styles.scss'
class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
    handleSubmit = async event => {
        event.preventDefault()
        const {email, password} = this.state
        try {
            const x = await auth.signInWithEmailAndPassword(email, password)
            console.log(x)
            this.setState({email: '', password: ''})
        }
  
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                swal("Oops" ,  'Wrong password.' ,  "error" )
              } else {
                swal("Oops" ,  errorMessage ,  "error" )
              }
        }
    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }
    render() {
        return(
            <div className='sign-in'>
                <h2 className="title">I already have an account</h2>
                <span>Sign In with your email and password</span>
                
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                    name="email" 
                    type="email" 
                    value={this.state.email} 
                    handleChange={this.handleChange}
                    label="Email"
                    required 
                    />
                    <FormInput 
                    name="password" 
                    type="password" 
                    value={this.state.password} 
                    handleChange={this.handleChange}
                    label="Password"
                    required 
                    />
                    <div className="sign-in-buttons">
                    <CustomButton type="submit">Sign in</CustomButton>
                    <GoogleButton 
                    className='google-btn'
                    onClick={signInWithGoogle}
                    type="light">
                     Sign in With Google
                    </GoogleButton>
                    </div>
                </form>

            </div>

        )
    }
}

export default SignIn