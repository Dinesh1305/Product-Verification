import React, { useState } from "react";

const Company = ({ contract, account }) => {
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [salesmanAddress, setSalesmanAddress] = useState("");

  const addManufacturer = async () => {
    if (contract) {
      await contract.methods.addManufacturer(manufacturerAddress).send({ from: account });
      alert("Manufacturer added successfully!");
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
      <h2 className="text-lg font-bold">Company Panel</h2>

      <div>
        <h3>Add Manufacturer</h3>
        <input
          type="text"
          placeholder="Manufacturer Address"
          onChange={(e) => setManufacturerAddress(e.target.value)}
        />
        <button onClick={addManufacturer}>Add Manufacturer</button>
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

export default Company;
