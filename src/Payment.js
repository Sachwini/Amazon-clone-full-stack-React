import React,{useState,useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import './Payment.css'
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import {db} from "./Firebase";


function Payment() {

    const [{basket,user},dispatch] = useStateValue();

    const [disabled,setDisabled] = useState(true);
    const [error,setError] = useState(null);

    const[succeeded,setSucceeded] = useState(false);
    const[processing,setProcessing] = useState("");

    const [clientSecret,setClientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    useEffect(()=>{
        // generate the special stripe secret which allows us to charge the customer
        const getClientSecret = async ()=>{
            const response = await axios({
                method:'post',
                // stripe expects the total in a currencies subunits like dollar to cents
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();

    },[basket]);

    console.log("the cilent secret is >>>>>",clientSecret);

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created,
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false)

            dispatch({
                type:'EMPTY_BASKET'
            })  

            history.replace('/orders')
        })


    }

    const handleChange = event =>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message:"");

    }

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>

                {/* delivery address */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h2>Delivery Address</h2>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>Kathmandu</p>
                        <p>Manamaiju</p>
                    </div>

                </div>

                {/* list of seleted products */}
                <div className="payment_section">
                <div className="payment_title">
                        <h3>Review items and Delivery</h3>
                </div>
                <div className="payment_item">
                    {basket.map(item=>(
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}

                </div>    
                </div>

                {/* payement method */}

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value)=>(<h3>Order Total: {value}</h3>)}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"} 
                                />
                                <button disable={processing||disabled||succeeded}><span>{processing?<p>Processing</p>:"Buy Now"}</span></button>
                            </div>
                            {/* if there is an error then only show the div with that error in */}
                            {error && <div>{error}</div>}
                        </form>

                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Payment
