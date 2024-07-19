import React, { useEffect, useRef, useState } from "react";
import SectionWrapper from "../../HOC/SectionWrapper";
import { slideIn } from "../../utils/motion";
import domToImage from "dom-to-image";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import state from "../../store";
import { useSnapshot } from "valtio";
import FavoriteCard from "../ui/FavoriteCard";
import StarsCanvas from "../../canvas/Stars";
import axios from "axios";
import { GrHost } from "react-icons/gr";
import { MdFavoriteBorder } from "react-icons/md";
// import Payment from '../ui/Payment';
//template_7zasq57
//service_06ydlko
//v8tfH1PqmqX4ZRrxq
const Account = () => {
  const snap = useSnapshot(state);
  //console.log("snap.favoriteItems", snap.favoriteItems);

  useEffect(() => {
    try {
      const userMail = snap.email;
      if (userMail) {
        axios.get(`api/order/${userMail}`).then(({ data }) => {
          state.orderItems = data;
        });
        axios.get(`api/favorite/${userMail}`).then(({ data }) => {
          state.favoriteItems = data;
        });
      }
    } catch (error) {
      //alert(error.response.data.message || "Oops!");
    }
  }, [snap.email]);
  const handleAdd = async (product) => {
    //console.log("product", product);
    //console.log("snap.email", snap.email);
    if (snap.email === "") {
      toast.error("Registration is needed.");
      return;
    }

    state.totalQuantities = snap.totalQuantities + 1;
    state.totalPrice = snap.totalPrice + product.price;
    state.totalPrice = snap.totalPrice + product.price;
    ////console.log("check", checkProductInCart);
    try {
      console.log("product", product);
      //console.log('',product)
      axios
        .post(`api/bascet/${snap.email}`, {
          ...product,
          usermail: snap.email,
          image: product.image,
        })
        .then((response) => {
          state.cartItems = [...snap.cartItems, response.data];
          //console.loog("response", response);

          toast.success(`Item added to the cart.`);
        });
    } catch (error) {
      toast.error(`Item wasn't added to the cart.`);
    }
  };

  const handleRemove = async (product) => {
    const foundProduct = snap.favoriteItems.find((item) => item.id === product.id);
    const newCartItems = snap.favoriteItems.filter((item) => item.id !== product.id);
    state.favoriteItems = newCartItems;
    try {
      const newFavorite = await axios.delete(`api/favorite/${snap.email}/${product.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    }

    // setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    // setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    // setCartItems(newCartItems);
  };
  const handlechangestatus = async (id) => {
    let items = snap.orderItems;
    const foundProduct = snap.orderItems.find((elem) => elem.id === id);
    if (foundProduct.status === "canceled") return;

    const { data } = await axios.patch(`api/order/${snap.email}/${id}`, {
      ...foundProduct,
      status: "canceled",
    });
    state.orderItems = items.map((elem) => {
      if (elem.id === id) {
        return { ...elem, status: "canceled" };
      }
      return elem;
    });
  };

  return (
    <>
      <h3 className={styles.sectionHeadText}>Favorites.</h3>
      {snap.favoriteItems.length < 1 && (
        <div className="empty-cart text-white flex flex-col items-center">
          <MdFavoriteBorder size={150} />
          <h3 className="text-white">Your favorites list is empty</h3>
        </div>
      )}
      {snap.favoriteItems.length > 0 && (
        <div className="mt-20 flex flex-wrap justify justify-evenly gap-10">
          {snap.favoriteItems.map((item, index) => (
            <FavoriteCard
              key={item.id}
              index={index}
              image={item.image}
              cloth={item.cloth}
              item={item}
              onRemove={() => handleRemove(item)}
              onAdd={() => handleAdd(item)}
            />
          ))}
        </div>
      )}
      <h3 className={styles.sectionHeadText}>Orders history.</h3>
      {snap.orderItems.length < 1 && (
        <div className="empty-cart text-white flex flex-col items-center">
          <GrHost size={150} />
          <h3 className="text-white">Your orders history is empty</h3>
        </div>
      )}
      {snap.orderItems.length > 0 && (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 rounded-3xl">
          {snap.orderItems.map((elem) => (
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mx-auto max-w-5xl">
                <div className="mt-6 flow-root sm:mt-8">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="flex flex-wrap items-center gap-y-4 py-6">
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                        <dd className="mt-1.5 text-lg font-semibold text-gray-900 dark:text-white">
                          <a href="#" className="hover:underline">
                            {`#FWB${Math.floor(Math.random() * 9000) + 1000}`}
                          </a>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                        <dd className="mt-1.5 text-lg font-semibold text-gray-900 dark:text-white">{elem.createdAt.toString().slice(0, 10)}</dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                        <dd className="mt-1.5 text-lg font-semibold text-gray-900 dark:text-white">${elem.price}</dd>
                      </dl>

                      {elem.status === "pre-order" ? (
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                          <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium  text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            <svg
                              className="me-1 h-3 w-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                              />
                            </svg>
                            Pre-order
                          </dd>
                        </dl>
                      ) : (
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-lg font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                          <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-lg font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                            <svg
                              className="me-1 h-3 w-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Cancelled
                          </dd>
                        </dl>
                      )}

                      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            handlechangestatus(elem.id);
                          }}
                          className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-lg  font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                        >
                          Cancel order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default SectionWrapper(Account, "account");
