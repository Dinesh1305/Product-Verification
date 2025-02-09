import React, { useState } from "react";

const User = ({ contract }) => {
  const [checkCompany, setCheckCompany] = useState("");
  const [checkProductHash, setCheckProductHash] = useState("");
  const [productExists, setProductExists] = useState(null);

  const checkProduct = async () => {
    try {
      if (!contract) {
        alert("Contract not initialized");
        return;
      }
      const exists = await contract.methods.checkProduct(checkCompany, checkProductHash).call();
      setProductExists(exists);
    } catch (error) {
      console.error("Error checking product:", error);
      alert("Error checking product. See console.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">User Panel</h2>

      <div>
        <h3>Check Product</h3>
        <input
          type="text"
          placeholder="Company Address"
          onChange={(e) => setCheckCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Hash"
          onChange={(e) => setCheckProductHash(e.target.value)}
        />
        <button onClick={checkProduct}>Check Product</button>
        {productExists !== null && <p>Product Exists: {productExists ? "Yes" : "No"}</p>}
      </div>
    </div>
  );
};

export default User;
