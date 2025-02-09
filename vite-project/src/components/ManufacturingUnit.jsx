import React, { useState } from "react";

const ManufacturingUnit = ({ contract, account }) => {
  const [productHash, setProductHash] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [salesmanAddress, setSalesmanAddress] = useState("");

  const addProduct = async () => {
    if (contract) {
      await contract.methods.addProduct(productHash, companyAddress).send({ from: account });
      alert("Product added successfully!");
    }
  };

  const addSalesman = async () => {
    if (contract) {
      await contract.methods.addSalesman(salesmanAddress).send({ from: account });
      alert("Salesman added successfully!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Manufacturing Unit Panel</h2>

      <div>
        <h3>Add Product</h3>
        <input
          type="text"
          placeholder="Product Hash"
          onChange={(e) => setProductHash(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company Address"
          onChange={(e) => setCompanyAddress(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <div>
        <h3>Add Salesman</h3>
        <input
          type="text"
          placeholder="Salesman Address"
          onChange={(e) => setSalesmanAddress(e.target.value)}
        />
        <button onClick={addSalesman}>Add Salesman</button>
      </div>
    </div>
  );
};

export default ManufacturingUnit;
