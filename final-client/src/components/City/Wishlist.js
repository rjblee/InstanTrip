import React, { useState, Fragment} from 'react';
import WishlistItem from './WishlistItem'

const mockData = [{
  name: "Canada Place",
  rating: 4.1
},
{
  name: "Canada Place2",
  rating: 4.1
},
{
  name: "Canada Place3",
  rating: 4.1
}];


export default function Wishlist() {

  const [state, setState] = useState(mockData);
  
  return (
  <Fragment>
    {state.map(

      element => {
      return (
      <WishlistItem
        name={element.name}
        rating={element.rating}
      >
      </WishlistItem>
      )

    }
    
    )}
  </Fragment>
  )
};
