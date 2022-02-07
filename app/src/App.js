import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
const [walletAddress, setWalletAddress] = useState(null);


  const checkIfWalletConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom Wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log('Connected to PK', response.publicKey.toString());
          setWalletAddress(response.publicKey.toString());
        }
      }
    } catch (err) {
      console.error('Error checking if wallet is connected', err);
    }
  }

const connectWallet = async () => {
  console.log('CLIKCED');
  const { solana } = window;

  if (solana) {
    const response = await solana.connect();
    console.log('Connected with Public Key:', response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
  }
};
  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletConnected()
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [])


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress &&
             <button
              className="cta-button connect-wallet-button"
              onClick={connectWallet}
            >
              Connect to Wallets
            </button>
    }
          {walletAddress && <CandyMachine walletAddress={window.solana} />}

        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
