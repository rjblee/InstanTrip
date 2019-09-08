import React from 'react';
import "../../styles/City.css";

export default function WishlistItem(props) {
  return (
    <div className="wishlistItem">
      <h4>{props.name}</h4>
      {/* <h4>{props.rating}</h4> */}
      <h5>{props.address}</h5>
    </div>
  )
}

