import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/pages/Home.js';
import Register from './components/pages/Register.js';
import WalletLanding from './components/pages/WalletLanding/WalletLanding.js';
import WalletAccess from './components/pages/WalletAccess/WalletAccess.js';
import LogIn from './components/pages/Login.js';
import AdminLogin from './components/pages/AdminLogin.js';
import Launch from './components/pages/Launch.js';
import Redirection from './components/pages/Redirection';
import BuySell from './components/pages/BuySell';
import AdminPanel from './components/pages/Admin/AdminPanel';
import UserInfo from './components/pages/UserInfo';
import Wallet from './components/pages/Wallet';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Web3 from 'web3';


async function connectToMetaMask() {
  if (window.ethereum) {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Instantiate Web3 with MetaMask provider
      const web3 = new Web3(window.ethereum);
      return web3;
    } catch (error) {
      console.error(error);
      // Handle error, e.g., user denied account access
      return null;
    }
  } else {
    // MetaMask is not installed
    console.log('MetaMask is not installed');
    return null;
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyBZMmYAXfwIgeij2zd2dOzMsdBKWLG3-ME",
  authDomain: "mgldefigo.firebaseapp.com",
  projectId: "mgldefigo",
  storageBucket: "mgldefigo.appspot.com",
  messagingSenderId: "1096055561424",
  appId: "1:1096055561424:web:aa590e7a2f7c3de8bf92d5",
  measurementId: "G-PL0D18H80Q"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(analytics)
function App() {
  const [web3, setWeb3] = useState(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  
    const checkMetaMaskConnection = async () => {
      const web3Instance = await connectToMetaMask();
      if (web3Instance) {
        setIsMetaMaskConnected(true);
        setWeb3(web3Instance);
      }
    };

    checkMetaMaskConnection();


  const handleConnect = async () => {
    const web3Instance = await connectToMetaMask();
    if (web3Instance) {
      setIsMetaMaskConnected(true);
      setWeb3(web3Instance);
    }
  };

  const handleDisconnect = () => {
    setIsMetaMaskConnected(false);
    setWeb3(null);
  };

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);
  return (
     <BrowserRouter>
      <div>
        {web3 ? (
          <button  onClick={handleDisconnect}  className=" myButton  bg-blue-100 w-20 ">Disconnect MetaMask</button>
        ) : (
          <button onClick={handleConnect} className=" myButton  bg-blue-100 w-20 ">Connect MetaMask</button>
        )}
      </div>
        <Routes>
          <Route path="/walletphrase/:id" element={<WalletAccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/walletMain" element={<WalletLanding />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/launchpad" element={< Launch/>} />
          <Route path="/ieo/:url" element={< Redirection/>} />
          <Route path="/wallet" element={< Wallet/>}>
            <Route path="/wallet/:id" element={< Wallet/>}>
              <Route path="/wallet/:id/:presaleToken/:chainId" element={< Wallet/>} />
            </Route>
          </Route>
          <Route path="/wallet/:id" element={< Wallet/>} />
          <Route path="/p2p" element={< BuySell/>} />
          <Route path="/userinfo" element={< UserInfo/>} />
          <Route path="/forgotpassword" element={< ForgotPassword/>} />
          <Route path="/resetpassword/:jxt" element={< ResetPassword/>} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
