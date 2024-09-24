import { createSlice } from "@reduxjs/toolkit";

const addToCardSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [
      {
        id: 1000,
        items: [
          {
            id: 1001,
            name: "Product 1",
            price: 10,
            quantity: 1,
          },
          {
            id: 1002,
            name: "Product 2",
            price: 20,
            quantity: 1,
          },
        ],
      },
      {
        id: 2000,
        items: [
          {
            id: 2003,
            name: "Product 3",
            price: 30,
            quantity: 1,
          },
          {
            id: 2004,
            name: "Product 4",
            price: 40,
            quantity: 1,
          },
        ],
      },
      {
        id: 3000,
        name: "Product 5",
        price: 50,
        quantity: 1,
        items: [],
      },
    ],
  },
  reducers: {
    addToCard: (state, action) => {
      state.carts.push(action.payload);
    },
  },
});

// Selector to calculate the total quantity of items in all carts
export const selectCount = (state) => {
  let totalQuantity = 0;
  if (state.carts.carts.length > 0) {
    state.carts.carts.forEach((cart) => {
      if (cart.items.length > 0) {
        cart.items.forEach((item) => {
          totalQuantity += item.quantity;
        });
      } else if (cart.quantity) {
        totalQuantity += cart.quantity;
      }
    });
  }
  return totalQuantity;
};

export const { addToCard } = addToCardSlice.actions;

export default addToCardSlice.reducer;
