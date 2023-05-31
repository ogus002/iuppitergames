let contractABI;
let contractAddress = "0x2a5020c1a4cF17afd0a74Ec827736D8Fc65e8071";  // You will fill this out with your contract address
let accounts;
let web3;
let contract;

window.onload = function() {
    document.getElementById('connectButton').addEventListener('click', connectMetamask);
    fetch('./IUP_ABI.json')
        .then(response => response.json())
        .then(data => {
            contractABI = data;
        })
        .catch(error => console.error('Error:', error));
};

async function connectMetamask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            accounts = await web3.eth.getAccounts();
            setupContract();
            document.getElementById('connectButton').style.display = 'none';
            document.getElementById('lockedTokenDiv').style.display = 'block';
            displayAccount();
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('Metamask not detected. Please install Metamask!');
    }
}

function setupContract() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    // Now you can start your app & access web3 freely:
    startApp();
}

function startApp() {
    contract.methods.LockTimeOf(accounts[0]).call()
        .then(result => {
            const lockTime = new Date(result * 1000);
            document.getElementById('lockTime').innerText = 'Lock Time: ' + lockTime.toLocaleString();
        });
}

function displayAccount() {
    const accountAddress = accounts[0];
    const accountElement = document.getElementById('account');
    accountElement.innerText = 'Account: ' + accountAddress;
}
