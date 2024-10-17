import axios from 'axios';
import { TronWeb } from 'tronweb';
import { TRON_API_KEY } from './config/dev';


const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',
    // You can also use other nodes for mainnet or different testnets
});

// Create a new account
async function createAccount() {
    const account = await tronWeb.createAccount();
    console.log('New Account Address:', account.address.base58);
    console.log('Private Key:', account.privateKey);
    return account;
}

// Request an airdrop from Tron faucet
async function requestAirdrop(address: string) {
    try {
        const response = await axios.post('https://api.shasta.trongrid.io/wallet/faucet', {
            address
        });
        console.log('Airdrop Response:', response.data);
    } catch (error) {
        console.error('Error requesting airdrop:', error);
    }
}

async function main() {
    // Create a new account
    const account = await createAccount();

    // Request an airdrop for the new account
    await requestAirdrop(account.address.base58);
}

main().catch((err) => {
    console.error(err);
});
