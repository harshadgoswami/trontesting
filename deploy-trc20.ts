
import { AxiosHeaders } from 'axios';
import { TronWeb } from 'tronweb';
import { TRON_API_KEY, PRIVATE_KEY_SHASTA } from './config/dev';

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',
    privateKey: PRIVATE_KEY_SHASTA
});

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] // Contract ABI JSON
const bytecode = '0x60806040526040518060400160405280600981526020017f546573742055534454000000000000000000000000000000000000000000000081525060009080519060200190620000519291906200018c565b506040518060400160405280600581526020017f7455534454000000000000000000000000000000000000000000000000000000815250600190805190602001906200009f9291906200018c565b506006600260006101000a81548160ff021916908360ff160217905550348015620000c957600080fd5b50d38015620000d757600080fd5b50d28015620000e557600080fd5b50604051620013a6380380620013a683398181016040528101906200010b919062000253565b600260009054906101000a900460ff1660ff16600a6200012c9190620002e0565b816200013991906200041d565b600381905550600354600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505062000548565b8280546200019a9062000488565b90600052602060002090601f016020900481019282620001be57600085556200020a565b82601f10620001d957805160ff19168380011785556200020a565b828001600101855582156200020a579182015b8281111562000209578251825591602001919060010190620001ec565b5b5090506200021991906200021d565b5090565b5b80821115620002385760008160009055506001016200021e565b5090565b6000815190506200024d816200052e565b92915050565b6000602082840312156200026c576200026b6200051c565b5b60006200027c848285016200023c565b91505092915050565b6000808291508390505b6001851115620002d757808604811115620002af57620002ae620004be565b5b6001851615620002bf5780820291505b8081029050620002cf8562000521565b94506200028f565b94509492505050565b6000620002ed826200047e565b9150620002fa836200047e565b9250620003297fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000331565b905092915050565b60008262000343576001905062000416565b8162000353576000905062000416565b81600181146200036c57600281146200037757620003ad565b600191505062000416565b60ff8411156200038c576200038b620004be565b5b8360020a915084821115620003a657620003a5620004be565b5b5062000416565b5060208310610133831016604e8410600b8410161715620003e75782820a905083811115620003e157620003e0620004be565b5b62000416565b620003f6848484600162000285565b9250905081840481111562000410576200040f620004be565b5b81810290505b9392505050565b60006200042a826200047e565b915062000437836200047e565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615620004735762000472620004be565b5b828202905092915050565b6000819050919050565b60006002820490506001821680620004a157607f821691505b60208210811415620004b857620004b7620004ed565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b60008160011c9050919050565b62000539816200047e565b81146200054557600080fd5b50565b610e4e80620005586000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100ad5760003560e01c8063313ce56711610080578063313ce5671461014e57806370a082311461016c57806395d89b411461019c578063a9059cbb146101ba578063dd62ed3e146101ea576100ad565b806306fdde03146100b2578063095ea7b3146100d057806318160ddd1461010057806323b872dd1461011e575b600080fd5b6100ba61021a565b6040516100c79190610b0b565b60405180910390f35b6100ea60048036038101906100e59190610a04565b6102a8565b6040516100f79190610af0565b60405180910390f35b61010861039a565b6040516101159190610b6d565b60405180910390f35b610138600480360381019061013391906109b1565b6103a0565b6040516101459190610af0565b60405180910390f35b610156610692565b6040516101639190610b88565b60405180910390f35b61018660048036038101906101819190610944565b6106a5565b6040516101939190610b6d565b60405180910390f35b6101a46106bd565b6040516101b19190610b0b565b60405180910390f35b6101d460048036038101906101cf9190610a04565b61074b565b6040516101e19190610af0565b60405180910390f35b61020460048036038101906101ff9190610971565b6108ea565b6040516102119190610b6d565b60405180910390f35b6000805461022790610cf2565b80601f016020809104026020016040519081016040528092919081815260200182805461025390610cf2565b80156102a05780601f10610275576101008083540402835291602001916102a0565b820191906000526020600020905b81548152906001019060200180831161028357829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516103889190610b6d565b60405180910390a36001905092915050565b60035481565b6000600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115610424576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041b90610b4d565b60405180910390fd5b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211156104e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104da90610b2d565b60405180910390fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105329190610c15565b9250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105889190610bbf565b9250508190555081600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461061b9190610c15565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161067f9190610b6d565b60405180910390a3600190509392505050565b600260009054906101000a900460ff1681565b60046020528060005260406000206000915090505481565b600180546106ca90610cf2565b80601f01602080910402602001604051908101604052809291908181526020018280546106f690610cf2565b80156107435780601f1061071857610100808354040283529160200191610743565b820191906000526020600020905b81548152906001019060200180831161072657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156107cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c690610b4d565b60405180910390fd5b81600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461081e9190610c15565b9250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108749190610bbf565b925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516108d89190610b6d565b60405180910390a36001905092915050565b6005602052816000526040600020602052806000526040600020600091509150505481565b60008135905061091e81610dea565b61092781610c49565b905092915050565b60008135905061093e81610e01565b92915050565b60006020828403121561095a57610959610d82565b5b60006109688482850161090f565b91505092915050565b6000806040838503121561098857610987610d82565b5b60006109968582860161090f565b92505060206109a78582860161090f565b9150509250929050565b6000806000606084860312156109ca576109c9610d82565b5b60006109d88682870161090f565b93505060206109e98682870161090f565b92505060406109fa8682870161092f565b9150509250925092565b60008060408385031215610a1b57610a1a610d82565b5b6000610a298582860161090f565b9250506020610a3a8582860161092f565b9150509250929050565b610a4d81610c5b565b82525050565b6000610a5e82610ba3565b610a688185610bae565b9350610a78818560208601610cbf565b610a8181610d87565b840191505092915050565b6000610a99601283610bae565b9150610aa482610d98565b602082019050919050565b6000610abc601483610bae565b9150610ac782610dc1565b602082019050919050565b610adb81610ca8565b82525050565b610aea81610cb2565b82525050565b6000602082019050610b056000830184610a44565b92915050565b60006020820190508181036000830152610b258184610a53565b905092915050565b60006020820190508181036000830152610b4681610a8c565b9050919050565b60006020820190508181036000830152610b6681610aaf565b9050919050565b6000602082019050610b826000830184610ad2565b92915050565b6000602082019050610b9d6000830184610ae1565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610bca82610ca8565b9150610bd583610ca8565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610c0a57610c09610d24565b5b828201905092915050565b6000610c2082610ca8565b9150610c2b83610ca8565b925082821015610c3e57610c3d610d24565b5b828203905092915050565b6000610c5482610c67565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015610cdd578082015181840152602081019050610cc2565b83811115610cec576000848401525b50505050565b60006002820490506001821680610d0a57607f821691505b60208210811415610d1e57610d1d610d53565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f416c6c6f77616e63652065786365656465640000000000000000000000000000600082015250565b7f496e73756666696369656e742062616c616e6365000000000000000000000000600082015250565b610df381610c87565b8114610dfe57600080fd5b50565b610e0a81610ca8565b8114610e1557600080fd5b5056fea26474726f6e5822122097d5789dcef160d4893003a6dedd7bd4a3898b539412793a313635d95c5f77d564736f6c63430008060033'   // Contract bytecode

async function deployContract() {
    try {
        const contractInstance = await tronWeb.contract().new({
            abi: contractABI,
            bytecode: bytecode,
            feeLimit: 1000000000,
            callValue: 0,
            parameters: tronWeb.toHex('1000'),
            userFeePercentage: 30
        });
        console.log('Contract deployed at address:', contractInstance.address);
    } catch (err) {
        console.error('Error deploying contract:', err);
    }
}

deployContract();
