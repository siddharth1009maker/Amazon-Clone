import React from 'react'
import './Checkout.css'
import CheckOutProduct from './CheckOutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'
import {AnimatedList} from 'react-animated-list';
export default function Checkout() {
    const [{basket , user} , dispatch] = useStateValue();
    
  const renderBasketItems = () => {
    return basket.map((item) => {
      return (
        <CheckOutProduct
          key={item.title}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      );
    });
  };
    return (
        <div className = "checkout">
            <div className="checkout__left">
                <img
                  className="checkout__ad"
                  src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                  alt="ad"
                />
                <div>
                    <h3>Hello , {!user?'Guest' : user.email}</h3>
                    <h2 className = "checkout__title">Your shopping basket</h2>
                    {/* <CheckOutProduct 
                    id = '1'
                    title = 'This is a startup'
                    price = {190}
                    rating = {5}
                    image = "https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                    /> */}
                    <AnimatedList animation={'zoom'}>{renderBasketItems()}</AnimatedList>
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}
