import { proxy } from "valtio";
const state = proxy({
  clothzScale: 455, //115 1
  clothyScale: 140,
  clothxScale: 105,
  cloth: "sock",
  intro: false,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./kosmos.png",
});
export default state;
