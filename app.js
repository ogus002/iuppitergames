let contractABI;
let contractAddress = "0x2a5020c1a4cF17afd0a74Ec827736D8Fc65e8071";  // You will fill this out with your contract address
let accounts;
let web3;
let contract;

window.onload = function() {
    fetch('./IUP_ABI.json')
        .then(response => response.json())
        .then(data => {
            contractABI = data;
            initializeWeb3();
        })
        .catch(error => console.error('Error:', error));
};

async function initializeWeb3() {
    // Setting up Web3
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            accounts = await web3.eth.getAccounts();
            setupContract();
        } catch (error) {
            console.error(error);
        }
    }
    // Legacy dapp browsers
    else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        setupContract();
    }
    // Non-dapp browsers
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

function setupContract() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    // Now you can start your app & access web3 freely:
    startApp();
}

function startApp() {
    document.getElementById('connectButton').style.display = 'none';
    document.getElementById('lockedTokenDiv').style.display = 'block';

    contract.methods.LockTimeOf(accounts[0]).call()
        .then(result => {
            const lockTime = new Date(result * 1000);
            document.getElementById('lockTime').innerText = 'Lock Time: ' + lockTime.toLocaleString();
        });
}
