import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Web3 from "web3";
import Owner from "./components/Owner";
import Company from "./components/Company";
import ManufacturingUnit from "./components/ManufacturingUnit";
import Salesman from "./components/Salesman";
import User from "./components/User";
import abi from "./Json/Products.json";

const contractABI = abi.abi;
const contractAddress = "0x6bF73827A8C3B3AE83Be87d187Eac6436F3DC249";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);

        setWeb3(web3Instance);
        setContract(contractInstance);
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask to use this application.");
      }
    };
    initWeb3();
  }, []);

  return (
    <Router>
      <div className="container">
        <h1>Product Verification System</h1>
        <p>Connected Account: {account}</p>

        <div className="button-container">
          <Link to="/owner"><button>Owner</button></Link>
          <Link to="/company"><button>Company</button></Link>
          <Link to="/manufacturing"><button>Manufacturing Unit</button></Link>
          <Link to="/salesman"><button>Salesman</button></Link>
          <Link to="/user"><button>User</button></Link>
        </div>

        <Routes>
          <Route path="/owner" element={<Owner contract={contract} account={account} />} />
          <Route path="/company" element={<Company contract={contract} account={account} />} />
          <Route path="/manufacturing" element={<ManufacturingUnit contract={contract} account={account} />} />
          <Route path="/salesman" element={<Salesman contract={contract} account={account} />} />
          <Route path="/user" element={<User contract={contract} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
