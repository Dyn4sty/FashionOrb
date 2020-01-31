import React from 'react';
import SignIn from '../../components/Signin/Signin'
import Signup from '../../components/Signup/Signup'
import './LoginAndRegister.styles.scss';


const SignInAndRegister = () => (
    <div className="sign-in-and-sign-up">
    <SignIn />
    <Signup />
    </div>

)

export default SignInAndRegister