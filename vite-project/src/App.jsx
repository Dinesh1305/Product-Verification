import React, { useState, useEffect } from "react";
import Web3 from "web3";
import './App.css';
import abi from "./Json/Products.json"; 

const contractABI = abi.abi;
const contractAddress = "0x5424D9e81e0Ad39fb00Fe43d650eE7995D49cE07";

const ProductsDApp = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("Not connected");
  const [companyAddress, setCompanyAddress] = useState("");
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [salesmanAddress, setSalesmanAddress] = useState("");
  const [productHash, setProductHash] = useState("");
  const [checkCompany, setCheckCompany] = useState("");
  const [checkProductHash, setCheckProductHash] = useState("");
  const [productExists, setProductExists] = useState(null);
  const [removeCompany, setRemoveCompany] = useState("");
  const [removeProductHash, setRemoveProductHash] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        const contractInstance = new web3Instance.eth.Contract(
          contractABI,
          contractAddress
        );
        setWeb3(web3Instance);
        setContract(contractInstance);
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask");
      }
    };
    init();
  }, []);

  const registerCompany = async () => {
    if (contract) {
      await contract.methods.registerCompany(companyAddress).send({ from: account });
      alert("Company registered successfully");
    }
  };

  const addManufacturer = async () => {
    if (contract) {
      await contract.methods.addManufacturer(manufacturerAddress).send({ from: account });
      alert("Manufacturer added successfully");
    }
  };

  const addProduct = async () => {
    if (contract) {
      await contract.methods.addProduct(productHash, companyAddress).send({ from: account });
      alert("Product added successfully");
    }
  };

  const addSalesman = async () => {
    if (contract) {
      await contract.methods.addSalesman(salesmanAddress).send({ from: account });
      alert("Salesman added successfully");
    }
  };

  const checkProduct = async () => {
    try {
      if (!contract) {
        alert("Contract not initialized");
        return;
      }
      console.log("Checking Product for:", checkCompany, checkProductHash);
      const exists = await contract.methods.checkProduct(checkCompany, checkProductHash).call();
      setProductExists(exists);
      console.log("Product Exists:", exists);
    } catch (error) {
      console.error("Error checking product:", error);
      alert("Error checking product. See console.");
    }
  };

  const removeProduct = async () => {
    try {
      if (!contract) {
        alert("Contract not initialized");
        return;
      }
      await contract.methods.removeProduct(removeCompany, removeProductHash).send({ from: account });
      alert("Product removed successfully");
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Error removing product. See console.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Products Management</h1>
      <p>Connected Account: {account}</p>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Register Company</h2>
        <input type="text" placeholder="Company Address" onChange={(e) => setCompanyAddress(e.target.value)} />
        <button onClick={registerCompany}>Register</button>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Add Manufacturer</h2>
        <input type="text" placeholder="Manufacturer Address" onChange={(e) => setManufacturerAddress(e.target.value)} />
        <button onClick={addManufacturer}>Add</button>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Add Product</h2>
        <input type="text" placeholder="Product Hash" onChange={(e) => setProductHash(e.target.value)} />
        <button onClick={addProduct}>Add</button>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Add Salesman</h2>
        <input type="text" placeholder="Salesman Address" onChange={(e) => setSalesmanAddress(e.target.value)} />
        <button onClick={addSalesman}>Add</button>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Check Product</h2>
        <input type="text" placeholder="Company Address" onChange={(e) => setCheckCompany(e.target.value)} />
        <input type="text" placeholder="Product Hash" onChange={(e) => setCheckProductHash(e.target.value)} />
        <button onClick={checkProduct}>Check</button>
        {productExists !== null && <p>Product Exists: {productExists ? "Yes" : "No"}</p>}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Remove Product</h2>
        <input type="text" placeholder="Company Address" onChange={(e) => setRemoveCompany(e.target.value)} />
        <input type="text" placeholder="Product Hash" onChange={(e) => setRemoveProductHash(e.target.value)} />
        <button onClick={removeProduct}>Remove</button>
      </div>
    </div>
  );
};

export default ProductsDApp;