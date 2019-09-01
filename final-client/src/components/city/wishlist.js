import React, { useState} from 'react';


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

const [state, setState] = useState(mockData);

export default function Wishlist() {
  return (
    {state.mockData.map(element => {
      return (
      <wishlistItem
        name={mockData.name}
        rating={mockData.rating}
      >
      </wishlistItem>
      )

    })}
  )
};
