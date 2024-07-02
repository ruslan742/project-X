import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { download } from "../../public/assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { ColorPicker, CustomButton, FilePicker, Tab } from "../components";
import { ClothTabs, DecalTypes, EditorTabs, FilterTabs } from "../config/constants";
import state from "../store";
import { Canvas } from "@react-three/fiber";
import { Environment, Center, OrbitControls } from "@react-three/drei";
import { animateWithGsapTimeLine } from "../utils/animations";
// import Backdrop from './Backdrop';
// import CameraRig from './CameraRig';
import Shirt from "../canvas/Shirt";
import Hoodie from "../canvas/Hoodie";
import Sock from "../canvas/Sock";
import CameraRig from "../canvas/CameraRig";
function Customizer() {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });
  // const [activeClothTab, setActiveClothTab] = useState({
  //   // logoShirt: true,
  //   // stylishShirt: false,
  // });
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
        state.isLogoTexture = true;
        break;
    }
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };
  // const handleActiveClothTab = (tabName) => {
  //   switch (tabName) {
  //     case "logoShirt":
  //       state.isLogoTexture = !activeFilterTab[tabName];
  //       break;
  //     case "stylishShirt":
  //       state.isFullTexture = !activeFilterTab[tabName];
  //       break;

  //     default:
  //       state.isFullTexture = false;
  //       state.isLogoTexture = true;
  //       break;
  //   }
  //   setActiveFilterTab((prevState) => {
  //     return {
  //       ...prevState,
  //       [tabName]: !prevState[tabName],
  //     };
  //   });
  // };

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
          {/* <Backdrop /> */}

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
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab) => (
              <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]} handleClick={() => handleActiveFilterTab(tab.name)} />
            ))}
          </motion.div>
          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Добавить в корзину"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
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
