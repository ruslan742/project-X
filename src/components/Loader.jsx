// import { WifiLoader } from "react-awesome-loaders";
import { Html } from "@react-three/drei";
export const Loader = () => {
  return (
    <Html>
      <div
        className="absolute top-0 left-0 w-full h-full
        flex justify-center items-center"
      >
        <div className="w-[10vw] h-[10vw] rounded-full">
          <div className="🤚">
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="🌴"></div>
            <div className="👍"></div>
          </div>
        </div>
      </div>
    </Html>
  );
};
