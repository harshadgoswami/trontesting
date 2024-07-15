import { AxiosHeaders } from 'axios';
import { TronWeb } from 'tronweb';

// Initialize TronWeb
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: new AxiosHeaders().set("TRON-PRO-API-KEY", "09f72e09-a15e-46a9-9e85-bdf56a728ba5")  // Optional, use your own API key if needed

});

// Function to get balance of an account
async function getBalance(address: string) {
    try {
        const balanceInSun = await tronWeb.trx.getBalance(address);
        const balanceInTRX = tronWeb.fromSun(balanceInSun);
        console.log(`Balance of address ${address}: ${balanceInTRX} TRX`);
    } catch (error) {
        console.error('Error getting balance:', error);
    }
}

// Replace with your Tron address
const address = 'your-tron-address-here';

getBalance(address);
