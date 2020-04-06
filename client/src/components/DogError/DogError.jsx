import React from 'react';
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText, ErrorImageHead } from './DogError.styles'
import CustomButton from '../custom-button/custom-button';
import { Link } from 'react-router-dom';

const DogError = ({title, text, showBtn, size}) => (
    <ErrorImageOverlay>
        <ErrorImageContainer imageUrl="https://i.imgur.com/lKJiT77.png"/>
        <ErrorImageHead>{title || 'A Dog Ate this Page'}</ErrorImageHead>
        {showBtn ? 
            <CustomButton as={Link} to="/">Get Back to homepage</CustomButton> : ''
        }
        <ErrorImageText size={size || '28px'}>
            {text || 'Your dog is cute but honestly a menace...'}
        </ErrorImageText>
    </ErrorImageOverlay>
)
export default DogError