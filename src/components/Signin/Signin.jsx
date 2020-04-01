import React, { useState } from 'react';
import FormInput from '../form-input/forum-input';
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button';
import  { googleSignInStart, emailSignInStart } from '../../redux/user/users.actions'
import GoogleButton from '../GoogleButton/GoogleButton'
// import './Signin.styles.scss'
import { SignInButtonsContainer, SignInContainer, TitleContainer } from './Signin.styles'

const SignIn = ({ googleSignInStart, emailSignInStart}) => {

    const [userCredentials, setCredentials] = useState({ email: '', password: '' })
    const { email, password } = userCredentials

    const handleSubmit = event => {
        event.preventDefault()
        emailSignInStart(email, password)
    }

    const handleChange = ({ target: { name, value } } ) => {
        setCredentials({ ...userCredentials, [name]: value })
    }

    return (
        <SignInContainer>
            <TitleContainer>I already have an account</TitleContainer>
            <span>Sign In with your email and password</span>
            
            <form onSubmit={handleSubmit}>
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
                required 
                />
                <SignInButtonsContainer>
                <CustomButton type="submit">Sign in</CustomButton>
                <GoogleButton type="button"
                onClick={googleSignInStart}>
                    Sign in With Google
                </GoogleButton>
                </SignInButtonsContainer>
            </form>

        </SignInContainer>

    )
}


const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)

