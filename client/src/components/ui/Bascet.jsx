import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import state from "../../store";
import { useSnapshot } from "valtio";
// import { useStateContext } from "../context/StateContext";
// import { urlFor } from "../lib/client";
// import getStripe from "../lib/getStripe";

const Cart = () => {
  const snap = useSnapshot(state);
  const cartRef = useRef();
  //   const {
  //     totalPrice,
  //     totalQuantities,
  //     cartItems,
  //     setShowCart,
  //     toggleCartItemQuanitity,
  //     onRemove,
  //   } = useStateContext();
    //   totalPrice=snap.totalPrice,
    //   totalQuantities=snap.totalQuantities,
    //   cartItems=snap.cartItems,
    //   setShowCart=snap.setShowCart,
    //   toggleCartItemQuanitity=snap.toggleCartItemQuanitity,
    //   onRemove=snap.onRemove
  const handleCheckout = async () => {
    //     const stripe = await getStripe();
    //     const response = await fetch("/api/stripe", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(cartItems),
    //     });
    //     if (response.statusCode === 500) return;
    //     const data = await response.json();
    //     toast.loading("Redirecting...");
    //     stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => snap.setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({snap.totalQuantities} items)</span>
        </button>

        {snap.cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link to="/">
              <button
                type="button"
                onClick={() => snap.setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {snap.cartItems.length >= 1 &&
            snap.cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  //   src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            snap.toggleCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            snap.toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => snap.onRemove(item)}
                    >
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
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
