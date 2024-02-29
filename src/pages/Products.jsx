import React from "react";
import Header from "../Components/Header";
// import { ProductCards } from "./Home";

export default function Products() {
  return (
    <div>
      <Header />
      <div class="text-center pt-5">
        <h1 class="font-bold text-4xl mb-4"> Products</h1>
      </div>

      {/* <section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        <ProductCards />
      </section> */}
    </div>
  );
}
