To withdraw USDT from the Tron network using Node.js and TypeScript, you can use the `tronWeb` library to interact with the Tron blockchain. Below is an example script for sending USDT (Tether) on the Tron network:

### Steps:

1. **Install Dependencies**:

   You will need `tronweb`, which is a JavaScript library for interacting with the Tron network.

   ```bash
   npm install tronweb
   ```

2. **Get Tron Wallet Details**:

   - You'll need the private key of your Tron wallet.
   - You'll also need the contract address for USDT (Tether) on the Tron network (for TRC20 tokens).

3. **Set Up the Script**:

Below is a TypeScript example that demonstrates how to withdraw USDT (TRC20) from a Tron wallet to another address:

### Node.js/TypeScript Example:

```typescript
import TronWeb from "tronweb";

// Initialize TronWeb instance with Full Node, Solidity Node, and Event Server
const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io", // You can also use Shasta Testnet URL for testing
  privateKey: "your-private-key", // Replace with your private key
});

// USDT contract address on Tron Mainnet
const USDT_CONTRACT_ADDRESS = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"; // USDT TRC20 contract address on Tron

// Withdraw USDT (TRC20 token) from one address to another
async function withdrawUSDT(toAddress: string, amount: number) {
  try {
    // Load the contract instance
    const contract = await tronWeb.contract().at(USDT_CONTRACT_ADDRESS);

    // Calculate the correct amount in the token's smallest unit (USDT uses 6 decimal places)
    const amountInSmallestUnit = tronWeb.toBigNumber(amount).times(1e6);

    // Execute the 'transfer' method from TRC20 contract
    const transaction = await contract.methods
      .transfer(toAddress, amountInSmallestUnit)
      .send();

    console.log("Transaction successful: ", transaction);
  } catch (error) {
    console.error("Failed to withdraw USDT: ", error);
  }
}

// Example usage
const recipientAddress = "your-recipient-address"; // Replace with the recipient's address
const amountToSend = 10; // Amount of USDT to send

withdrawUSDT(recipientAddress, amountToSend);
```

### Explanation:

1. **TronWeb Initialization**: We initialize the `tronWeb` instance using a Full Node API (`https://api.trongrid.io`), which is the Tron mainnet URL. If you're using the Shasta testnet, you can replace this with `https://api.shasta.trongrid.io`.

2. **USDT Contract Address**: USDT is a TRC20 token on the Tron network, and the contract address for USDT on the Tron mainnet is `TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj`.

3. **Transfer Function**:
   - We get the contract instance using `tronWeb.contract().at(USDT_CONTRACT_ADDRESS)`.
   - We then call the `transfer()` function of the contract, which is a standard ERC20/TRC20 method for transferring tokens.
   - We convert the amount to the smallest unit of the token by multiplying it by `1e6`, since USDT on Tron has 6 decimal places.
   - Finally, we send the transaction and log the result.

### How to Run:

1. **Create an `.env` file** (or hardcode in your private key):

   ```bash
   YOUR_PRIVATE_KEY=<your-tron-private-key>
   ```

2. **Run the script**:

   ```bash
   ts-node your-script-name.ts
   ```

### Testnet:

If you're testing on the Tron Shasta testnet, you can use the Shasta testnet URL and corresponding USDT contract address for Shasta. You can get Shasta test TRX from [Shasta Faucet](https://www.trongrid.io/shasta).

### Important Notes:

1. **Ensure USDT Approval**: Before you can transfer USDT tokens from a smart contract, ensure that the `approve` function has been called (if required), depending on how the contract interaction is set up.
2. **Gas Fees**: Make sure the sender's wallet has enough TRX to cover the transaction fees, even though you're transferring USDT. TRX is required for paying network fees.
3. **Private Key**: Keep your private key secure and never expose it in your code.

This should enable you to withdraw USDT from the Tron network using Node.js and TypeScript.
