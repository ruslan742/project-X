import { proxy } from "valtio";

const state = proxy({
  email: null,
  userName: "",
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
  cartItems: [],
  showCart: false,
  toggleCartItemQuanitity: true,
  onRemove: false,
  qty: 1,
  price: 100,
});

export default state;
