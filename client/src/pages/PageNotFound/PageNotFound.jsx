import React from 'react';
import DogError from '../../components/DogError/DogError';

const PageNotFound = () => (
    <>
        <DogError title="A Dog Lost this Page" text="Error Code: 404 " showBtn={true} size='20px'/>
    </>
)

export default PageNotFound