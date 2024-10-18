import { AxiosHeaders } from 'axios';
import { TronWeb } from 'tronweb';
import { TRON_API_KEY } from './config/dev';

// Initialize TronWeb instance with Full Node, Solidity Node, and Event Server
const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io', // Testnet (Shasta)
    headers: new AxiosHeaders().set("TRON-PRO-API-KEY", TRON_API_KEY), // You can also use Shasta Testnet URL for testing
    privateKey: 'your-private-key'        // Replace with your private key
});

// USDT contract address on Tron Mainnet
const USDT_CONTRACT_ADDRESS = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj';  // USDT TRC20 contract address on Tron

// Withdraw USDT (TRC20 token) from one address to another
async function withdrawUSDT(toAddress: string, amount: number) {
    try {
        // Load the contract instance
        const contract = await tronWeb.contract().at(USDT_CONTRACT_ADDRESS);

        // Calculate the correct amount in the token's smallest unit (USDT uses 6 decimal places)
        const amountInSmallestUnit = tronWeb.toBigNumber(amount).times(1e6);

        // Execute the 'transfer' method from TRC20 contract
        const transaction = await contract.methods.transfer(toAddress, amountInSmallestUnit).send();

        console.log('Transaction successful: ', transaction);
    } catch (error) {
        console.error('Failed to withdraw USDT: ', error);
    }
}

// Example usage
const recipientAddress = 'your-recipient-address';  // Replace with the recipient's address
const amountToSend = 10;  // Amount of USDT to send

withdrawUSDT(recipientAddress, amountToSend);
