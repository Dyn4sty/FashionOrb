import React from 'react';
import SignIn from '../../components/Signin/Signin'
import Signup from '../../components/Signup/Signup'
import { SignPageContainer } from './LoginAndRegister.styles'
// import './LoginAndRegister.styles.scss';

const SignInAndRegister = () => (
<SignPageContainer>
        <SignIn />
        <Signup />
</SignPageContainer>

)

export default SignInAndRegister