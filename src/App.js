import React, { useReducer } from "react";
import "./App.css"; 

// Import images
import HarryPotter1 from "./img1.jpeg";
import HarryPotter2 from "./img2.jpeg";
import HarryPotter3  from "./img4.jpeg";
import HarryPotter4  from "./img5.jpeg";
import HarryPotter5 from "./img3.jpeg";
import HarryPotter6 from "./img6.jpeg";


const initialState = {
  cart: []
};

// Define the reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id)
      };

    default:
      return state;
  }
};

// Main component
const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Example products
  const products = [
    { id: 1, name: "HARRY POTTER 1", price: 100, image: HarryPotter1 },
    { id: 2, name: "HARRY POTTER 2", price: 180, image: HarryPotter2  },
    { id: 3, name: "HARRY POTTER 3", price: 150, image: HarryPotter3  },
    { id: 4, name: "HARRY POTTER 4", price: 150, image: HarryPotter4 },
    { id: 5, name: "HARRY POTTER 5", price: 120, image: HarryPotter5  },
    { id: 6, name: "HARRY POTTER 6", price: 200, image: HarryPotter6  },
  ];

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  // Calculate total price
  const totalPrice = state.cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="bg">
    <div className="shopping-cart-container">
      <h2 className="head">BOOK STORE</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => addItem(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h4>CART</h4>
      <ul className="cart-list">
        {state.cart.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            {item.name} - Quantity: {item.quantity} - Price: ₹{item.price}
            <div>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)
                }
              >
                -
              </button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total Price: ₹{totalPrice}</h3>
    </div>
    </div>
   
  );
};

export default App;