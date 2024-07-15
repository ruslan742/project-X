import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import state from "../../store";
import { useSnapshot } from "valtio";
import axios from "axios";

//  import { useStateContext } from "../context/";
// import { urlFor } from "../lib/client";
// import getStripe from "../lib/getStripe";

const Cart = () => {
  const snap = useSnapshot(state);
  const cartRef = useRef();

  const handleCheckout = async () => {};

  const onRemove = async (product) => {
    console.log("onremove", product);
   const foundProduct = snap.cartItems.find((item) => item.id === product.id);
    console.log('found',foundProduct)
    const newCartItems = snap.cartItems.filter((item) => item.id !== product.id);
    console.log('newitems',newCartItems)
    state.cartItems=newCartItems

    try {
      await axios.delete(`api/bascet/${product.id}`);
    } catch (error) {
      alert(error.response.data.message || "Oops!");
    }

    // setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    // setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    // setCartItems(newCartItems);
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
              <div className="product" key={item.cloth}>
                <img
                  //   src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.cloth}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus" onClick={() => snap.toggleCartItemQuanitity(item._id, "dec")}>
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus" onClick={() => snap.toggleCartItemQuanitity(item._id, "inc")}>
                          <AiOutlinePlus />
                        </span>
                      </p>
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
          <div className="cart-bottom">
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
