import { useState } from 'react';
import { ethers } from 'ethers';

function WalletBalance() {

    const [balance, setBalance] = useState();
    
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
    };
  
    return (
      <div className="card" style={{ width: '25rem', height: "6rem"  }}>
        <div className="card-body">
          <h5 className="card-title">Скока денег: {balance}</h5>
          <button className="btn btn-success" onClick={() => getBalance()}>Show my кэш</button>
        </div>
      </div>
    );
  };
  
  export default WalletBalance;