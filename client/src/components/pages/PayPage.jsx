import React, { useRef, useState } from "react";
import SectionWrapper from "../../HOC/SectionWrapper";
import { slideIn } from "../../utils/motion";
import EarthCanvas from "../../canvas/Earth";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import StarsCanvas from "../../canvas/Stars";
import Datepicker from "../ui/Datepicker";
import state from "../../store";
import { useSnapshot } from "valtio";
import axios from "axios";
import { toast } from "react-toastify";

// import Payment from '../ui/Payment';
//template_7zasq57
//service_06ydlko
//v8tfH1PqmqX4ZRrxq
const validateCardNumber = (number) => {
  const cleanedNumber = number.replace(/\D/g, "");
  return /^\d{16}$/.test(cleanedNumber);
};
const Contact = () => {
  const snap = useSnapshot(state);
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const formatCardNumber = (number) => {
    return number.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const handleCardNumberChange = (e) => {
    const formattedCardNumber = formatCardNumber(e.target.value);
    setCardNumber(formattedCardNumber);
  };
  const validateCvc = (cvc) => /^\d{3}$/.test(cvc);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (snap.totalQuantities == 0) {
      toast.error("Your shopping cart is empty.");
      return;
    }
    // if (snap.email === "") {
    //   toast.error("Registration is needed.");
    //   return;
    // }
    // if (!validateCardNumber(cardNumber)) {
    //   toast.error("Invalid card number.");
    //   return;
    // }
    if (!validateCvc(cvc)) {
      toast.error("Invalid CVV.");
      return;
    }
    setLoading(true);
    try {
      // console.log("product", product);
      //console.log('',product)
      axios
        .post(`api/order/${snap.email}`, {
          status: "pre-order",
          usermail: snap.email,
          price: snap.totalPrice,
          items: snap.cartItems.toString(),
        })
        .then((response) => {
          state.orderItems = [...snap.orderItems, response.data];
          //console.loog("response", response);

          toast.success(`Thank you.`);
        });
    } catch (error) {
      toast.error(`Something went wrong.`);
    }

    emailjs
      .send(
        "service_06ydlko",
        "template_7zasq57",
        {
          from_name: form.name,
          to_name: "Ruslan",
          from_email: form.email,
          to_email: "ruslan742742742@gmail.com",
          message: form.message,
        },
        "v8tfH1PqmqX4ZRrxq"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you.");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          toast.error("Something went wrong.");
        }
      );
  };
  return (
    <>
      <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
          {/* <p className={styles.sectionSubText}>Get in touch</p> */}
          <h3 className={styles.sectionHeadText}>Payment.</h3>
          <div className="flex flex-col">
            <form
              action="#"
              className="w-full rounded-lg border mt-5 mb-5 border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
            >
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label for="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {" "}
                    Full name (as displayed on card)*{" "}
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Surname Name"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label for="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {" "}
                    Card number*{" "}
                  </label>
                  <input
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    // onChange={(e) => setCardNumber(e.target.value)}
                    type="text"
                    id="card-number-input"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    //pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                    required
                    maxLength="19"
                  />
                </div>

                <div>
                  <label for="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Card expiration*{" "}
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                      <svg
                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    {/* <input
                      datepicker
                      datepicker-format="mm/yy"
                      id="card-expiration-input"
                      type="text"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="12/23"
                      required
                    /> */}

                    <Datepicker />
                  </div>
                </div>
                <div>
                  <label for="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                    CVV*
                    <button
                      data-tooltip-target="cvv-desc"
                      data-tooltip-trigger="hover"
                      className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                    >
                      <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="cvv-desc"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      The last 3 digits on back of card
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </label>
                  <input
                    type="text"
                    id="cvv-input"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    aria-describedby="helper-text-explanation"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="•••"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
              
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="flex w-full items-center justify-center rounded-lg bg-gray-800 px-6 py-3 text-base font-semibold text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500 shadow-lg"
                >
                  Pay now
                </button>
              
            </form>
            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">${snap.totalPrice}</dd>
                  </dl>

                  {/* <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                    <dd className="text-base font-medium text-green-500">-$299.00</dd>
                  </dl> */}

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">$10</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">$ 99</dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">${+snap.totalPrice + 99 + 10}</dd>
                </dl>
              </div>

              <div className="mt-6 flex items-center justify-center gap-8">
                <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                <img
                  className="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                  alt=""
                />
                <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                <img
                  className="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div className="flex flex-col mt-9" variants={slideIn("right", "tween", 0.2, 1)}>
          <h3 className={styles.sectionHeadText}>Worldwide delivery.</h3>
          <motion.div className=" xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
            <EarthCanvas />
          </motion.div>
        </motion.div>
      </div>
      <StarsCanvas />
      {/* <Payment/> */}
    </>
  );
};

export default SectionWrapper(Contact, "contact");
