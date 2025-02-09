import React, { useState } from "react";

const Owner = ({ contract, account }) => {
  const [companyHash, setCompanyHash] = useState("");

  const registerCompany = async () => {
    if (contract) {
      await contract.methods.registerCompany(companyHash).send({ from: account });
      alert("Company registered successfully!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Owner Panel - Register Company</h2>
      <input
        type="text"
        placeholder="Company Hash"
        onChange={(e) => setCompanyHash(e.target.value)}
      />
      <button onClick={registerCompany}>Register Company</button>
    </div>
  );
};

export default Owner;
