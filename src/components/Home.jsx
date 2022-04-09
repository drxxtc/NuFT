import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import FiredGuys from '../artifacts/contracts/MyNFT.sol/FiredGuys.json';

const contractAddress = '0x23987b165a0521dE9d4533E752C8d575A46B1b3b';
//2 const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
//3 const contractAddress = '0x85039a9284D7e072a965B03c7f6AD0eA5b5817Fa';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, FiredGuys.abi, signer);


function Home() {

  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (

  
    <div>
	
      <WalletBalance />

      <div className="container">
      <h1 style={{ paddingLeft: '150', color: '#3B7877', align: 'center' }}>Самые популярные NuFT</h1>
        <div className="row">
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <NFTImage tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmfQRq7qPswHv2Lq18LJVrpvuLdVbWW6Vqj2N5ukKEFMW1';
  const metadataURI = `${contentId}/${tokenId}.json`;
//  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  const imageURI = `img/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result)
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <div className="card" style={{ width: '20rem' }}>
      <img className="card-img-top" src={imageURI}></img>
      <div className="card-body" style={{ margin: 'auto' }}>
        <h5 className="card-title">Nudes Froggy #{tokenId}</h5>
        {!isMinted ? (
          <button style={{ color: '#3B7877',
                             background: '#B0E4CB', border: '45px', font: '400', margin: 'auto' }} className="btn btn-primary" onClick={mintToken}>
            Mint!
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
