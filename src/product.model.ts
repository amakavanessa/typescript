import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
// always remember to turn experimentalDecorators to true on tsconfig when you want to use decorators
export class Product {
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
  getInformation() {
    return this.title + " " + `$${this.price}`;
  }
}
