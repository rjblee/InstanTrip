import React, { useState } from 'react';
import WishlistItem from './WishlistItem';
import "./City.css";


const mockData = [{
  name: "Canada Place",
  rating: 4.1
},
{
  name: "Stanely Park",
  rating: 4.3
},
{
  name: "Gastown",
  rating: 3.8
}];


export default function Wishlist() {

  const [state, setState] = useState(mockData);

  return (
    <div className="wishlist">
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
    </div>
  )
};
