/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React  , {useEffect}from 'react';
import { Link , useHistory } from 'react-router-dom';
import CheckOutProduct from './CheckOutProduct';
import './Payment.css';
import {useStateValue} from './StateProvider';
import {CardElement , useStripe , useElements} from '@stripe/react-stripe-js';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './Reducer';
import { db } from './firebase';
import axios from './axios';
function Payment() {
    
    const history = useHistory();
    const [{basket , user} ,dispatch ] = useStateValue();
    const [error , setError] = useState(null);
    const [disabled , setDisabled] = useState(true);
    const [succeeded , setSucceeded] = useState(false);
    const [processing , setProcessing] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret , setClientSecret] = useState(true);
    useEffect(()=>{
        const getClientSecret = async () =>{
            const response = await axios ({
                method:  'post',
                url: `/payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    } , [basket])
    console.log("Client Secret is" , clientSecret);
    
    const handleSubmit = async (event)=> {
        // do fancy stripe stuff
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret , {
            payment_method : {
                card : elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //paymentIntent = payment confirmation
            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id)
            .set({
                basket : basket,
                amount : paymentIntent.amount,
                created : paymentIntent.created
            })
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type : 'EMPTY_BASKET'
            })
            history.replace('/orders')
        })
    }
    const handleChange = event=>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
  return (
      <div className='payment'>
          <div className="payment__container">
           <h1>
              CheckOut (<Link to='/checkout'>{basket?.length} items</Link>) 
          </h1>
              <div className="payment__section">
                   <div className="payment__title">
                       <h3>Delivery Address</h3>
                   </div>
                   <div className="payment__address">
                           <p>{user?.email}</p>
                           <p>33-D LIG Flats </p>
                           <p>Mayapuri , New Delhi - 110064</p>
                       </div>
              </div>
              <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items And Delivery</h3>  
                    </div>
                    <div className="payment__items">
                        {basket.map(item =>(
                            <CheckOutProduct
                              key={item.title}
                              id={item.id}
                              title={item.title}
                              image={item.image}
                              price={item.price}
                              rating={item.rating}
                            />
                        ))}
                    </div>
              </div>
              <div className="payment__section">
                  <div className="payment__title">
                      <h3>Payment Method</h3>
                  </div>
                  <div className="payment__details">
                      {/* stripe magic will be here */}
                      <form onSubmit={handleSubmit}>
                          <CardElement onChange={handleChange}/>
                          <div className="payment__priceContainer">
                                <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total : {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)} // Part of the homework
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₹"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error&&<div>{error}</div>}
                      </form>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Payment;
