import "reflect-metadata";
//this is used for converting plain objects like json to class objects
import { plainToInstance } from "class-transformer";

import { Product } from "./product.model";

const products = [
  { title: "hair", price: "100" },
  { title: "shoe", price: "50" },
  { title: "top", price: "20" },
  { title: "bag", price: "100" },
  { title: "food", price: "70" },
  { title: "laptop", price: "500" },
  { title: "phone", price: "800" },
  { title: "drum", price: "10" },
  { title: "purse", price: "80" },
];

const loadedProducts = plainToInstance(Product, products);
for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
