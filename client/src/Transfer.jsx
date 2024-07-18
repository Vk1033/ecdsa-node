import { useState } from "react";
import server from "./server";
import signMessage from "./crypto.js";

function Transfer({ privKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const msg = `send ${sendAmount} to ${recipient}`;
    const { r, s, recovery } = await signMessage(msg, privKey);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        msg,
        signature: {
          r: r.toString(),
          s: s.toString(),
          recovery,
        },
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input placeholder="1, 2, 3..." value={sendAmount} onChange={setValue(setSendAmount)}></input>
      </label>

      <label>
        Recipient
        <input placeholder="Type an public key" value={recipient} onChange={setValue(setRecipient)}></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
