/* eslint-disable no-unused-vars */
import React from 'react'
import './CheckOutProduct.css'
import {useStateValue} from "./StateProvider";
export default function CheckOutProduct({id , image , title , price , rating , hideButton }) {
    const [{basket} , dispatch] = useStateValue();
    const removeFromBasket = (e) =>{
        //remove from basket
        //dispatch is used to trigger an action
        dispatch({
            type : 'REMOVE_FROM_BASKET',
            id : id,
        })
        
    }
    return (
        <div className='checkoutProduct'>
           <img className='checkoutProduct__image' src = {image} alt = "Product"/>
           <div className="checkoutProduct__info">
               <p className="checkoutProduct__title">{title}</p>
               <p className="checkoutProduct__price">
                   <small>₹</small>
                   <strong>{price}</strong>
               </p>
               <div className="checkoutProduct__rating">
                   {Array(rating)
                   .fill()
                   .map(() =>(
                       <p>⭐</p>
                   ))}
               </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove From Basket</button>
                )}
           </div>
            
        </div>
    )
}
