import Features from "./components/Features";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
// import Hero from "./components/Hero";
import Highligts from "./components/Highligts";
import HowItWorks from "./components/HowItWorks";
// import Model from "./components/Model";
import NameOfStore from "./components/NameOfStore";
import Navbar from "./components/Navbar";
// import Test from "./components/Test";
import * as Sentry from "@sentry/react";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import Hero from "./components/Hero";
const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      {/* <NameOfStore /> */}
      {/* <Gallery /> */}
      {/* <Hero /> */}
      {/* <Test />
      
      
     
      <Highligts />

      <Features />
      <HowItWorks />
      <Footer /> */}
      {/* <Home /> */}
      {/* <Canvas /> */}
      <Customizer />
      {/* <Model /> */}
    </main>
  );
};

export default App;
