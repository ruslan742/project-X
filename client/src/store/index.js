import { proxy } from "valtio";

const state = proxy({
  clothzScale: 455, //115 1
  clothyScale: 140,
  clothxScale: 105,
  cloth: "sock",
  color: "#EFBD48",
  isLogoTexture: false,
  isFullTexture: false,
  logoDecal: "./logos/css.png",
  fullDecal: "./textures/1.jpg",
  amount: 0,
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvv: "",
});
export default state;



