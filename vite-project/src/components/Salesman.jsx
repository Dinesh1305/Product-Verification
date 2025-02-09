import React, { useState } from "react";

const Salesman = ({ contract, account }) => {
  const [removeCompany, setRemoveCompany] = useState("");
  const [removeProductHash, setRemoveProductHash] = useState("");

  const removeProduct = async () => {
    if (contract) {
      await contract.methods.removeProduct(removeCompany, removeProductHash).send({ from: account });
      alert("Product removed successfully!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Salesman Panel</h2>

      <div>
        <h3>Remove Product</h3>
        <input
          type="text"
          placeholder="Company Address"
          onChange={(e) => setRemoveCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Hash"
          onChange={(e) => setRemoveProductHash(e.target.value)}
        />
        <button onClick={removeProduct}>Remove Product</button>
      </div>
    </div>
  );
};

export default Salesman;
