import React from 'react';
import "./City.css";

export default function WishlistItem(props) {
  return (
    <div className="wishlistItem">
      <h3>{props.name}</h3>
      <h3>{props.rating}</h3>
    </div>
  )
}

