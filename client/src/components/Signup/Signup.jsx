import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/users.actions'
import FormInput from '../form-input/forum-input';
import CustomButton from '../custom-button/custom-button';
import swal from 'sweetalert';
import { SignUpContainer, TitleContainer, SignInButtonsContainer } from './sign-up.styles'
import { captchaValidator } from "../../pages/LoginAndRegister/captchaValidator";


// import './sign-up.styles.scss'

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { displayName, email, password, confirmPassword } = userCredentials
    
    const handleSubmit = event => {
        event.preventDefault()
        if (!displayName || !email || !password || password !== confirmPassword) {
            swal("Oops" ,  'Invalid Fields' ,  "error" )
            return;
        }
        captchaValidator((err, data) => {
            if (err) {
              swal("Something Went Wrong..", err, "error");
              return;
            }
            const { success, score } = data;
            if (score < 0.5 && !success) {
              swal("Are u a Robot?", "Your Behaivor is simillar to a robot.", "info");
              return;
            }
            signUpStart({ email, password, displayName })
        })
    }

    const handleChange = ({ target: { name, value } }) => {
        setCredentials({ ...userCredentials, [name]: value })
    }

    return (
        <SignUpContainer>
            <TitleContainer className="title">I do not have an account</TitleContainer>
            <span>Sign Up with your email and password</span>
            
            <form className='sign-up-form' onSubmit={handleSubmit}>
            <FormInput
                name="displayName" 
                type="text" 
                value={displayName} 
                handleChange={handleChange}
                label="Name"
                required 
                />
                <FormInput
                name="email" 
                type="email" 
                value={email} 
                handleChange={handleChange}
                label="Email"
                required 
                />
                <FormInput 
                name="password" 
                type="password" 
                value={password} 
                handleChange={handleChange}
                label="Password"
                autocomplete="on"
                required 
                />
                <FormInput 
                name="confirmPassword" 
                type="password" 
                value={confirmPassword} 
                handleChange={handleChange}
                label="Confirm Password"
                required 
                />
                <SignInButtonsContainer>
                <CustomButton type="submit">Sign Up</CustomButton>
                </SignInButtonsContainer>
            </form>

        </SignUpContainer>

    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: user => dispatch(signUpStart(user))
});



export default connect(null, mapDispatchToProps)(SignUp)