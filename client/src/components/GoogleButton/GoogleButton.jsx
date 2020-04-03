import React from 'react';
import {ReactComponent as GoogleIcon} from '../../assets/Google.svg';
import { GoogleButtonContainer, GoogleIconWrapper } from './GoogleButton.styles'

const GoogleButton = ({children, ...otherProps}) => (
<GoogleButtonContainer  {...otherProps}>
    <GoogleIconWrapper>
        <GoogleIcon />
    </GoogleIconWrapper>
    <span>{children}</span>
</GoogleButtonContainer>
)

export default GoogleButton