import React, {Fragment} from 'react';

// const mockData = [{
//   name: "Canada Place",
//   rating: 4.1
// },
// {
//   name: "Canada Place2",
//   rating: 4.1
// },
// {
//   name: "Canada Place3",
//   rating: 4.1
// }]

export default function WishlistItem(props) {
  return (
    <Fragment>
      <h1>{props.name}</h1>
      <h1>{props.rating}</h1>
    </Fragment>
  )
}

