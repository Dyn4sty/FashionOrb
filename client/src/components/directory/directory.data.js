import Hats from "../../assets/MenuItems/Hats.jpg";
import Jackets from "../../assets/MenuItems/Jackets.png";
import Womens from "../../assets/MenuItems/Womens.png";
import Mens from "../../assets/MenuItems/Mens.jpg";

export const sections = [
  {
    title: "hats",
    imageUrl: `${Hats}`,
    id: 1,
    linkUrl: "shop/hats",
  },
  {
    title: "jackets",
    imageUrl: `${Jackets}`,
    id: 2,
    linkUrl: "shop/jackets",
  },
  {
    title: "sneakers",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/fashionorb-f7827.appspot.com/o/S2.jpg?alt=media&token=95fc9b8b-8608-4c1a-9a07-e7f7c7981b67",
    id: 3,
    linkUrl: "shop/sneakers",
  },
  {
    title: "womens",
    imageUrl:
    `${Womens}`,
    size: "large",
    id: 4,
    linkUrl: "shop/womens",
  },
  {
    title: "mens",
    imageUrl:
      `${Mens}`,
    size: "large",
    id: 5,
    linkUrl: "shop/mens",
  },
];
