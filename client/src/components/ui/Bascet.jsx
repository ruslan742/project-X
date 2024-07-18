import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import state from "../../store";
import { useSnapshot } from "valtio";
import axios from "axios";
import { NavLink } from "react-router-dom";
//  import { useStateContext } from "../context/";
// import { urlFor } from "../lib/client";
// import getStripe from "../lib/getStripe";

const Cart = () => {
  const snap = useSnapshot(state);
  const cartRef = useRef();

  const handleCheckout = async () => {

  };

  const onRemove = async (product) => {
    //console.log("onremove", product);
    const foundProduct = snap.cartItems.find((item) => item.id === product.id);
    //console.log("found", foundProduct);
    const newCartItems = snap.cartItems.filter((item) => item.id !== product.id);
    //console.log("newitems", newCartItems);
    state.cartItems = newCartItems;
    //console.log("snap.cartItems", snap.cartItems);
    try {
      const newBasket = await axios.delete(`api/bascet/${snap.email}/${product.id}`);
      //console.log("newBasket", newBasket);
    } catch (error) {
      alert(error.response.data.message || "Oops!");
    }
    state.totalQuantities = Number(snap.totalQuantities) - Number(foundProduct.quantity);
    state.totalPrice = Number(snap.totalPrice) - Number(foundProduct.price);

    // setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    // setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    // setCartItems(newCartItems);
  };
  const toggleCartItemQuanitity = async (id, value) => {
    //console.log("id", id, "value", value);
    let items = snap.cartItems;
    const foundProduct = snap.cartItems.find((elem) => elem.id === id);
    // index = cartItems.findIndex((product) => product.id === id);
    //);
    ////console.log("hi");

    if (value === "inc") {
      // const newCartItems = snap.cartItems.map((elem) => {
      //   if (elem.id === id) {
      //     return { ...elem, quantity: Number(elem.quantity) + 1 };
      //   }
      //   return elem;
      // });
      //console.log("foundProduct", foundProduct);
      // //console.log("newCartItems", newCartItems);
      const { data } = await axios.patch(`api/bascet/${snap.email}/${id}`, {
        ...foundProduct,
        quantity: Number(foundProduct.quantity) + 1,
        price: foundProduct.price + foundProduct.price / foundProduct.quantity,
      });
      //console.log("data", data);
      //console.log("snap.cartItems1", snap.cartItems);
      //state.cartItems = newCartItems;
      state.cartItems = items.map((elem) => {
        if (elem.id === id) {
          return { ...elem, quantity: Number(elem.quantity) + 1, price: elem.price + elem.price / elem.quantity };
        }
        return elem;
      });

      //console.log("snap.cartItems2", snap.cartItems);
      state.totalPrice = Number(snap.totalPrice) + data.price / data.quantity;
      state.totalQuantities = Number(snap.totalQuantities) + 1;
      ////console.log("snap.cartItems", snap.cartItems);
    } else if (value === "dec") {
      //console.log("foundProduct", foundProduct);

      if (foundProduct.quantity > 1) {
        const { data } = await axios.patch(`api/bascet/${snap.email}/${id}`, {
          ...foundProduct,
          quantity: Number(foundProduct.quantity) - 1,
          price: foundProduct.price - foundProduct.price / foundProduct.quantity,
        });
        //console.log("items", items);
        //state.cartItems = newCartItems;
        state.cartItems = items.map((elem) => {
          if (elem.id === id) {
            return { ...elem, quantity: Number(elem.quantity) - 1, price: +elem.price - elem.price / elem.quantity };
          }
          return elem;
        });

        state.totalPrice = Number(snap.totalPrice) - data.price / data.quantity;
        state.totalQuantities = Number(snap.totalQuantities) - 1;
        //console.log("snap.cartItems", snap.cartItems);
      }
    }
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => (state.showCart = false)}>
          <AiOutlineLeft />
          <span className="heading text-black">Your Cart</span>
          <span className="cart-num-items">({snap.totalQuantities} items)</span>
        </button>

        {snap.cartItems.length < 1 && (
          <div className="empty-cart text-black flex flex-col items-center">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>

            <button type="button" onClick={() => (state.showCart = false)} className="btn">
              Continue Shopping
            </button>
          </div>
        )}

        <div className="product-container">
          {snap.cartItems.length >= 1 &&
            snap.cartItems.map((item) => (
              <div className="product" key={item.id}>
                <img src={item.image} className="cart-product-image" style={{ width: "100%", objectFit: "contain" }} />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.cloth}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    {/* <div>
                      <p className="quantity-desc">
                        <span className="minus" onClick={() => snap.toggleCartItemQuanitity(item._id, "dec")}>
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus" onClick={() => snap.toggleCartItemQuanitity(item._id, "inc")}>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div> */}
                    <div className="relative flex items-center max-w-[8rem]">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="quantity-input"
                        onClick={() => toggleCartItemQuanitity(item.id, "dec")}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="quantity-input"
                        data-input-counter
                        value={item.quantity}
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1"
                        required
                      />
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="quantity-input"
                        onClick={() => {
                          //console.log("item", item);
                          toggleCartItemQuanitity(item.id, "inc");
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                    <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {snap.cartItems.length >= 1 && (
          <div className="cart-bottom text-black">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${snap.totalPrice}</h3>
            </div>
            <div className="btn-container">
            
         
        
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay
              </button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
