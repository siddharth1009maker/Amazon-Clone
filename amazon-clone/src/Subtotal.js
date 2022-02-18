import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './Reducer';
import { useHistory } from 'react-router-dom';
function Subtotal() {
  const [{basket} , dispatch] = useStateValue();
  const history = useHistory();
  console.log(basket);
  var sum = 0 ;
  for(const x in basket)
  {
    sum+=basket[x].price;
  }
  console.log(basket.length , sum);
    return (
        <div className = "subtotal">
            <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button onClick={e=>history.push('/payment')}>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal
