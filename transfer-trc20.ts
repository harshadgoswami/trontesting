import { AxiosHeaders } from 'axios';
import { TronWeb } from 'tronweb';
import { TRON_API_KEY, TRON_USDT_SMARTCONTRACT, PRIVATE_KEY_SHASTA } from './config/dev';

// Set up TronWeb instance with testnet or mainnet full host
const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',  // For Shasta Testnet (for mainnet use https://api.trongrid.io)
    privateKey: PRIVATE_KEY_SHASTA  // Replace with private key of account 1 (the sender)
});

// TRC20 contract address (like USDT on Tron network)
const contractAddress = TRON_USDT_SMARTCONTRACT;  // Replace with actual TRC20 contract address (e.g., USDT)

// Receiver address (account 2)
const receiverAddress = 'TWnkgewgtjYwoS4cdNJy1fiJzae3TcuHRB';  // Replace with the receiver's address

// Amount to transfer (for USDT: 1 USDT = 1,000,000 units since USDT has 6 decimal places)
const amount = 100;  // Example: 1 USDT = 1,000,000 in smallest unit for TRC20

// Function to transfer TRC20 tokens
async function transferTRC20(): Promise<void> {
    try {
        // Create contract instance
        const contract = await tronWeb.contract().at(contractAddress);

        // Call transfer function on TRC20 contract
        const result = await contract.methods.transfer(receiverAddress, amount).send({
            feeLimit: 1000000000,  // Set a fee limit to cover the transaction fees
            callValue: 0           // Since this is a token transfer, no TRX is sent
        });

        console.log('Transaction successful:', result);
    } catch (error) {
        console.error('Error during TRC20 transfer:', error);
    }
}

// Run the transfer function
transferTRC20();
