import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { slideAnimation } from "../../config/motion";
import { reader } from "../../config/helpers";
import { AiPicker, ColorPicker, CustomButton, FilePicker, Tab } from "..";
import { ClothTabs, DecalTypes, EditorTabs, FilterTabs } from "../../config/constants";
import state from "../../store";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Shirt from "../../canvas/Shirt";
import Hoodie from "../../canvas/Hoodie";
import Sock from "../../canvas/Sock";
import CameraRig from "../../canvas/CameraRig";
import LogoPicker from "../models/LogoPicker";
import TexturePicker from "../models/TexturePicker";
import OpenAI from "openai";
import domToImage from "dom-to-image";
// import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from "react-icons/ai";
// import { Loader } from "../../HOC/Loader";
import { toast } from "react-toastify";
import axios from "axios";

function Customizer() {
  const tabRef = useRef(null);
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeEditorLogoTab, setActiveEditorLogoTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: false,
    stylishShirt: false,
  });
  useEffect(() => {
    state.price =
      ((snap.cloth === "sock" ? 100 : snap.cloth === "shirt" ? 500 : 1000) + (snap.isFullTexture ? 300 : 0) + (snap.isLogoTexture ? 200 : 0)) *
      snap.qty;
  }, [snap.cloth, snap.isFullTexture, snap.isLogoTexture, snap.qty]);

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return <AiPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />;
      default:
        return null;
    }
  };
  const closeModal = () => {
    setActiveEditorLogoTab("");
  };
  const generateLogoTabContent = () => {
    switch (activeEditorLogoTab) {
      case "logoShirt":
        return <LogoPicker closeModal={closeModal} tabRef={tabRef} />;
      case "stylishShirt":
        return <TexturePicker closeModal={closeModal} tabRef={tabRef} />;
      default:
        return null;
    }
  };

  const handleActiveClothTab = (tabName) => {
    switch (tabName) {
      case "hoodie":
        state.cloth = "hoodie";
        state.clothzScale = 115;
        state.clothxScale = 0;
        state.clothyScale = 135;
        break;
      case "shirt":
        state.cloth = "shirt";
        state.clothzScale = 1;
        state.clothxScale = 0;
        state.clothyScale = 0;
        break;
      case "sock":
        state.cloth = "sock";
        state.clothzScale = 455;
        state.clothxScale = 95;
        state.clothyScale = 145;
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a propmt");
    try {
      setGeneratingImg(true);
      const response = await fetch("http://localhost:3000/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await response.json();
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = false;
        break;
    }
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };
  // функции связанные с добавлением в корзину:
  const incQty = () => {
    state.qty++;
  };

  const decQty = () => {
    if (snap.qty !== 1) state.qty--;
  };

  const onAdd = async (product, quantity, type) => {
    let image;
    //console.log("snap.email", snap.email);
    if (snap.email === "") {
      toast.error("Registration is needed.");
      return;
    }
    var node = document.getElementById("canvasimg");
    const productKeys = Object.keys(product);
    let id = null;
    let previousQuantity;
    if (type === "bascet") {
      state.totalQuantities = snap.totalQuantities + quantity;
      state.totalPrice = snap.totalPrice + product.price;
    }
    //console.log("product", product, "quantity", quantity);
    const filteredProductKeys = productKeys.filter((key) => key != "quantity" && key != "price");
    const checkProductInCart = snap.cartItems.find((item) => {
      return filteredProductKeys.every((key) => {
        if (product[key] === item[key]) {
          id = item.id;
          previousQuantity = item.quantity;
          return product[key] === item[key];
        }
      });
    });
    state.totalPrice = snap.totalPrice + snap.price;
    //console.log("check", checkProductInCart);
    try {
      domToImage
        .toPng(node)
        .then(function (dataUrl) {
          // Создаем новый canvas и рисуем на нем изображение
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const img = new Image();
          img.src = dataUrl;
          return new Promise((resolve, reject) => {
            img.onload = () => {
              // Обрезаем изображение
              const croppedWidth = 650; // Желаемая ширина обрезанного изображения
              const croppedHeight = 600; // Желаемая высота обрезанного изображения
              const x = (img.width - croppedWidth) / 2; // Координата X для обрезки
              const y = (img.height - croppedHeight) / 2; // Координата Y для обрезки
              canvas.width = croppedWidth;
              canvas.height = croppedHeight;
              ctx.drawImage(img, x, y, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);
              // Получаем новый dataURL с обрезанным изображением
              const croppedDataUrl = canvas.toDataURL("image/png", 0.7); // Качество 70%
              resolve(croppedDataUrl);
            };
            img.onerror = reject;
          });
        })
        .then((croppedDataUrl) => {
          return axios.post(`api/${type === "bascet" ? "bascet" : "favorite"}/${snap.email}`, {
            ...product,
            usermail: snap.email,
            image: croppedDataUrl,
          });
        })
        .then((response) => {
          if (type === "bascet") {
            state.cartItems = [...snap.cartItems, response.data];
          } else {
            state.favoriteItems = [...snap.favoriteItems, response.data];
          }
          toast.success(`Item added to ${type === "bascet" ? "to the cart" : "to favorites"}.`);
        });
    } catch (error) {
      toast.error(`Item wasn't added to ${type === "bascet" ? "to the cart" : "to favorites"}.`);
    }
  };

  return (
    <section className="app">
      <Canvas
        shadows
        id="canvasimg"
        camera={{ position: [0, 0, 0], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        className=" w-full max-w-full h-full transition-all ease-in"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <CameraRig>
          {snap.cloth === "shirt" && <Shirt />}
          {snap.cloth === "hoodie" && <Hoodie />}
          {snap.cloth === "sock" && <Sock />}
        </CameraRig>
      </Canvas>
      <AnimatePresence>
        (
        <>
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container ">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div key="buttons" className="flex flex-col items-center absolute top-0 right-10 z-10" {...slideAnimation("right")}>
            <div className="flex items-center min-h-screen">
              <div className="buttontabs-container ">
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${snap.price}</div>
                <form className="max-w-xs mx-auto">
                  <label for="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Choose quantity:
                  </label>
                  <div className="relative flex items-center max-w-[8rem]">
                    <button
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="quantity-input"
                      onClick={decQty}
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
                      value={snap.qty}
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1"
                      required
                    />
                    <button
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="quantity-input"
                      onClick={incQty}
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
                </form>
                <CustomButton
                  type="filled"
                  title="Добавить в корзину"
                  handleClick={() =>
                    onAdd(
                      {
                        cloth: snap.cloth,
                        color: snap.color,
                        logo: snap.isLogoTexture ? snap.logoDecal : null,
                        texture: snap.isFullTexture ? snap.fullDecal : null,
                        quantity: snap.qty,
                        price: snap.price,
                      },
                      snap.qty,
                      "bascet"
                    )
                  }
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
                <CustomButton
                  type="filled"
                  title="Добавить в избранное"
                  handleClick={() =>
                    onAdd(
                      {
                        cloth: snap.cloth,
                        color: snap.color,
                        logo: snap.isLogoTexture ? snap.logoDecal : null,
                        texture: snap.isFullTexture ? snap.fullDecal : null,
                        quantity: snap.qty,
                        price: snap.price,
                      },
                      snap.qty,
                      "favorite"
                    )
                  }
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
              </div>
            </div>
          </motion.div>
          <motion.div ref={tabRef} className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => {
                  handleActiveFilterTab(tab.name);
                  setActiveEditorLogoTab(tab.name);
                }}
              />
            ))}
            {generateLogoTabContent()}
          </motion.div>
          <motion.div className="clothtabs-container" {...slideAnimation("up")}>
            {ClothTabs.map((tab) => (
              <Tab key={tab.name} tab={tab} isClothTab isActiveTab={tab.name === snap.cloth} handleClick={() => handleActiveClothTab(tab.name)} />
            ))}
          </motion.div>
        </>
        )
      </AnimatePresence>
    </section>
  );
}

export default Customizer;
