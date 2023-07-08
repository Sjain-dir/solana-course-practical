import * as web3 from '@solana/web3.js'
import React from 'react'
import Dotenv from 'dotenv'
//keypair 

Dotenv.config({path : './.env'})

function keypairgenrator() : web3.PublicKey {
    const ownerKeypair = web3.Keypair.generate();
    return ownerKeypair.publicKey;
}

function initializeKeyPair() : web3.Keypair {
    const secret = JSON.parse(process.env.PRIVATE_KEY ?? '') as number[]
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey;
}

async function sendsol(connection : web3.Connection, amount : number, sender : web3.Keypair, reciever : web3.PublicKey){
    const transation = new web3.Transaction();

    const sendsolInterstruction = web3.SystemProgram.transfer({
        fromPubkey : sender.publicKey,
        toPubkey : reciever,
        lamports : amount,
    })

    transation.add(sendsolInterstruction);

    const sig = await web3.sendAndConfirmTransaction(connection, transation, [sender]);
    console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${sig}?cluster=devnet`);
}

async function main() {
    const payer = initializeKeyPair();
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
    await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL*1);
    await sendsol(connection, web3.LAMPORTS_PER_SOL*0.1, payer, keypairgenrator())
}

main();
// console.log(publicKey)
// console.log(secretKey)
// initializeKeyPair()
function page() {
  return (
    <div>page</div>
  )
}

export default page