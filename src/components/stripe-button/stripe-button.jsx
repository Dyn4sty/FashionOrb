import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert';
const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_ghjMMq6QNw2yKFSPwbdgL8CV00i3EAIXXG'

    const onToken = token => {
        swal("Good Job" ,  'Your Transaction is Now Completed' ,  "success" )
    }
    return (
        <StripeCheckout
        label='Pay Now'
        name='Fashion Orb Ltd.'
        billingAddress
        shippingAddress
        image='Orb.svg'
        description={`Your toal is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        // email="info@vidhub.co"
        bitcoin
         />
    )
}

export default StripeCheckoutButton