import React, { useState } from 'react';
import WishlistItem from './WishlistItem';
import "../../styles/City.css";

export default function Wishlist(props) {
  const [state, setState] = useState('');

  return (
    <div className="wishlist">
    {props.places.map((place)=>{
      return(
      <WishlistItem
              name={place.name}
              picture={place.picture}
              address={place.address}
            >
            </WishlistItem>
      )
    })}
            
        
       
    </div>
  )
};
