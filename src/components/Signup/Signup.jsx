import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/users.actions'
import FormInput from '../form-input/forum-input';
import CustomButton from '../custom-button/custom-button';
import swal from 'sweetalert';
import { SignUpContainer, TitleContainer, SignInButtonsContainer } from './sign-up.styles'

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
        signUpStart({ email, password, displayName })
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
                label="name"
                required 
                />
                <FormInput
                name="email" 
                type="email" 
                value={email} 
                handleChange={handleChange}
                label="email"
                required 
                />
                <FormInput 
                name="password" 
                type="password" 
                value={password} 
                handleChange={handleChange}
                label="password"
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