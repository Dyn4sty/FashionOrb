import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./checkout";
const promise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

export default function CheckoutContainer(props) {
  return (
    <div className="App">
      <Elements stripe={promise}>
        <Checkout {...props} />
      </Elements>
    </div>
  );
}
