import { AxiosHeaders } from 'axios';
import { TronWeb } from 'tronweb';

// Initialize TronWeb instance
// api key generate from : https://www.trongrid.io/dashboard
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io', // Mainnet
    // fullHost: 'https://api.shasta.trongrid.io', // Testnet (Shasta)
    headers: new AxiosHeaders().set("TRON-PRO-API-KEY", "09f72e09-a15e-46a9-9e85-bdf56a728ba5")
});

// Function to get TRX transactions for a specific account
async function getTransactions(address: string) {
    try {
        // Fetch transactions from TronGrid
        const response = await tronWeb.trx.getTransactionsRelated(address, 'all', 30, 0);

        //const account = await tronWeb.trx.getAccount(address);


        if (response) {
            console.log(`Transactions for address ${address}:`, response);
            return response;
        } else {
            console.log('No transactions found.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
}

// Replace with the actual address you want to check
const accountAddress = 'TXRq2ovfj98DHoMz4MpxMULKPvimH3vaAS';

// Get transactions for the account
getTransactions(accountAddress);
