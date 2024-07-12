import { proxy } from "valtio";
const state = proxy({
  clothzScale: 455, // 115 1
  clothyScale: 140,
  clothxScale: 105,
  cloth: "sock",
  color: "#EFBD48",
  isLogoTexture: false,
  isFullTexture: false,
  logoDecal: "./logos/css.png",
  fullDecal: "./textures/1.jpg",
  totalPrice: 0,
  totalQuantities: 0,
  cartItems: 0,
  setShowCart: 0,
  toggleCartItemQuanitity:true,
  onRemove:false,
});
export default state;



