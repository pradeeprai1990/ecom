import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { cartContext } from "../CartContext/MainContext";

export default function Cart() {
  let { carts, setCarts } = useContext(cartContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  // Calculate total amount whenever carts change
  useEffect(() => {
    let total = 0;
    carts.forEach((item) => {
      total += item.price * item.qty;
    });
    setTotalAmount(total);

    let tax = Math.floor(0.18 * total);
    setTaxAmount(tax);

    setFinalAmount(total + tax);
  }, [carts]);

  return (
    <div>
      <Header />
      <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">
          <div>
            <h2 class="text-2xl font-semibold leading-tight">Cart Items</h2>
          </div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Serial Number
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Product Image / Name
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      QTY.
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cartItems, index) => {
                    return <CartList index={index} cartItems={cartItems} />;
                  })}
                </tbody>
              </table>
            </div>

            <div className=" flex justify-end mt-3">
              <table>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    total Amount
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ${totalAmount}
                  </th>
                </tr>

                <tr className="m-5">
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tax Amount(18%)
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ${taxAmount}
                  </th>
                </tr>

                <tr className="mt-2">
                  <th class="px-5 py-3 text-red-700    border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Final Amount
                  </th>
                  <th class="px-5 py-3 border-b-2  text-red-700 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    ${finalAmount}
                  </th>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartList({ cartItems, index }) {
  let { carts, setCarts } = useContext(cartContext);
  let removeData = () => {
    let filterData = carts.filter((v, i) => index !== i);
    setCarts(filterData);
  };

  return (
    <tr>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p class="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div class="flex">
          <div class="flex-shrink-0 w-10 h-10">
            <img
              class="w-full h-full rounded-full"
              src={cartItems.image}
              alt=""
            />
          </div>
          <div class="ml-3">
            <p class="text-gray-900 whitespace-no-wrap">{cartItems.title}</p>
          </div>
        </div>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p class="text-gray-900 whitespace-no-wrap">${cartItems.price}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* <input
          value={cartItems.qty}
          type="number"
          className="border border-red-700"
        /> */}
        <input
          value={cartItems.qty}
          type="number"
          className="border border-red-700"
          onChange={(e) => {
            const newQty = parseInt(e.target.value);
            if (!isNaN(newQty)) {
              // Check if the input is a valid number
              if (newQty < 1) {
                // If the new quantity is 1, do nothing
                return;
              }
              // Otherwise, update the quantity
              setCarts((prevCarts) => {
                const updatedCarts = [...prevCarts];
                updatedCarts[index].qty = newQty;
                return updatedCarts;
              });
            }
          }}
        />
      </td>

      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span>{cartItems.price * cartItems.qty}</span>
      </td>

      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={removeData}
          className="btn px-4 py-2 bg-blue-400 text-white rounded"
        >
          Remove Item
        </button>
      </td>
    </tr>
  );
}
