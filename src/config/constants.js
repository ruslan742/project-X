import { swatch, fileIcon, ai, logoShirt, stylishShirt, logoSock, logoHoodie, logoShirt2 } from "../../public/assets";
import { css, docker, figma, git, html, javascript, mongodb, nodejs, reactjs, redux, tailwind, typescript } from "../../public/logos";
import { texture1, texture2, texture3, texture4, texture5, texture6, texture7, texture8, texture9, texture10 } from "../../public/textures";

export const Textures = [
  {
    name: "texture1",
    image: texture1,
  },
  {
    name: "texture2",
    image: texture2,
  },
  {
    name: "texture3",
    image: texture3,
  },
  {
    name: "texture4",
    image: texture4,
  },
  {
    name: "texture5",
    image: texture5,
  },
  {
    name: "texture6",
    image: texture6,
  },
  {
    name: "texture7",
    image: texture7,
  },
  {
    name: "texture8",
    image: texture8,
  },
  {
    name: "texture9",
    image: texture9,
  },
  {
    name: "texture10",
    image: texture10,
  },
];
export const Logos = [
  {
    name: "css",
    image: css,
  },
  {
    name: "docker",
    image: docker,
  },
  {
    name: "figma",
    image: figma,
  },
  {
    name: "git",
    image: git,
  },
  {
    name: "html",
    image: html,
  },
  {
    name: "javascript",
    image: javascript,
  },
  {
    name: "mongodb",
    image: mongodb,
  },
  {
    name: "nodejs",
    image: nodejs,
  },
  {
    name: "reactjs",
    image: reactjs,
  },
  {
    name: "redux",
    image: redux,
  },
  {
    name: "tailwind",
    image: tailwind,
  },
  {
    name: "typescript",
    image: typescript,
  },
];
export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];
export const ClothTabs = [
  {
    name: "shirt",
    icon: logoShirt2,
  },
  {
    name: "hoodie",
    icon: logoHoodie,
  },
  {
    name: "sock",
    icon: logoSock,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
export const footerLinks = ["Privacy Policy", "Terms of Use", "Sales Policy", "Legal", "Site Map"];
export const navLists = ["Галерея", "Конструктор", "Избранное"];
