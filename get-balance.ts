import { AxiosHeaders } from 'axios';
import { TronWeb } from 'tronweb';
import { TRON_API_KEY } from './config/dev';

// Initialize TronWeb
const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',
    headers: new AxiosHeaders().set("TRON-PRO-API-KEY", TRON_API_KEY)  // Optional, use your own API key if needed

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
const address = 'TWnkgewgtjYwoS4cdNJy1fiJzae3TcuHRB';

getBalance(address);
