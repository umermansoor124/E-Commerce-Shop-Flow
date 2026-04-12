import { createSlice } from '@reduxjs/toolkit'

const cartData = JSON.parse(localStorage.getItem('cartItems'))
const initialState = {
  items: cartData ? cartData.items : [],
  totalPrice: cartData ? cartData.totalPrice : 0,
  totalQty: cartData ? cartData.totalQty : 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {

    addToCart: (state, action) => {
      const existing = state.items.find(item => item._id === action.payload._id)

      if (existing) {
        existing.qty += action.payload.qty
        existing.itemTotal = existing.qty * existing.price
      } else {
        state.items.push({
          ...action.payload,
          itemTotal: action.payload.price * action.payload.qty
        })
      }

      state.totalPrice = state.items.reduce((acc, item) => acc + item.itemTotal, 0)
      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0)

      localStorage.setItem('cartItems', JSON.stringify(state))
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload)
      state.totalPrice = state.items.reduce((acc, item) => acc + item.itemTotal, 0)
      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0)
      
      localStorage.setItem('cartItems', JSON.stringify(state))
    },

    increaseQty: (state, action) => {
      const item = state.items.find(item => item._id === action.payload)
      if (item) {
        item.qty += 1
        item.itemTotal = item.qty * item.price
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.itemTotal, 0)
      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0)
      
      localStorage.setItem('cartItems', JSON.stringify(state))
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(item => item._id === action.payload)
      if (item && item.qty > 1) {
        item.qty -= 1
        item.itemTotal = item.qty * item.price
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.itemTotal, 0)
      state.totalQty = state.items.reduce((acc, item) => acc + item.qty, 0)
      
      localStorage.setItem('cartItems', JSON.stringify(state))
    },

    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
      state.totalQty = 0
      
      localStorage.setItem('cartItems', JSON.stringify(state))
    }

  }
})

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions
export default cartSlice.reducer