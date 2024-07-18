import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, setPrivKey, privKey }) {
  async function onChange(evt) {
    const PrivateKey = evt.target.value;
    setPrivKey(PrivateKey);
    const address = toHex(secp256k1.getPublicKey(PrivateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Put your Private Key" value={privKey} onChange={onChange}></input>
      </label>

      <label>Public key: {address.slice(0, 10)}...</label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
