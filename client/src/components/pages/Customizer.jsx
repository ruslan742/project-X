import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { slideAnimation } from "../../config/motion";
import { reader } from "../../config/helpers";
import { ColorPicker, CustomButton, FilePicker, Tab } from "..";
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
import { Loader } from "../../HOC/Loader";

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

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />;
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

  return (
    <section className="app">
      <Canvas
        shadows
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
          <motion.div key="buttons" className="absolute top-0 right-10 z-10" {...slideAnimation("right")}>
            <div className="flex items-center min-h-screen">
              <div className="buttontabs-container ">
                <CustomButton type="filled" title="Добавить в корзину" handleClick={() => {}} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
                <CustomButton type="filled" title="Добавить в избранное" handleClick={() => {}} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
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
