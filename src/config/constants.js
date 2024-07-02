import { swatch, fileIcon, ai, logoShirt, stylishShirt, logoSock, logoHoodie, logoShirt2 } from "../../public/assets";

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
