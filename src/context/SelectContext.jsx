import React, { useState, createContext, useReducer } from 'react';

const SelectContext = createContext();

const initialSelected = {
  type: 'Restaurants',
  rating: 'All',
  price: 'Any Price',
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TYPE":
      return { ...state, type: action.payload };
    case "RATING":
      return { ...state, rating: action.payload };
    case "PRICE":
      return { ...state, price: action.payload };
    default:
      return state;
  }
}

export const SelectProvider = ({ children }) => {
  const [selected, dispatch] = useReducer(reducer, initialSelected)

  const handleType = payload => dispatch({ type: 'TYPE', payload });
  const handleRating = payload => dispatch({ type: 'RATING', payload });
  const handlePrice = payload => dispatch({ type: 'PRICE', payload });


  return (
    <SelectContext.Provider value={{
      selected,
      handlePrice,
      handleType,
      handleRating
    }} >
      {children}
    </SelectContext.Provider>
  )
}

export default SelectContext;