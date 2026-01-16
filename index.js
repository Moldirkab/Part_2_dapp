import { ethers } from "ethers";

const CONTRACT_ADDR = "0xaBAD29F720779a7e15fB6eA8cf9Ca9E79641629b";
const ABI = ["function getQuote() public view returns (string)"];

let provider, signer, contract;

const accountDisplay = document.getElementById('accountDisplay');
const quoteDisplay = document.getElementById('quoteDisplay');
const errorDisplay = document.getElementById('errorDisplay');
const connectBtn = document.getElementById('connectBtn');

connectBtn.onclick = async () => {
    errorDisplay.innerText = "";
    if (!window.ethereum) return errorDisplay.innerText = "Install MetaMask!";
    
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        const address = await signer.getAddress();
        accountDisplay.innerText = address;
        connectBtn.style.display = 'none';
        fetchQuote();
    } catch (e) {
        errorDisplay.innerText = "Connection failed.";
    }
};

async function fetchQuote() {
    try {
        contract = new ethers.Contract(CONTRACT_ADDR, ABI, signer);
        const quote = await contract.getQuote();
        quoteDisplay.innerText = `"${quote}"`;
    } catch (err) {
        errorDisplay.innerText = "Check network (Ganache)!";
    }
}

callBtn.onclick = fetchQuote;