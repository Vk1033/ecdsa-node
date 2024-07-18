import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privKey, setPrivKey] = useState("");

  return (
    <div className="app">
      <Wallet balance={balance} setBalance={setBalance} address={address} setAddress={setAddress} setPrivKey={setPrivKey} privKey={privKey} />
      <Transfer setBalance={setBalance} privKey={privKey} />
      <div className="container">
        <h2>Keys for testing</h2>

        <table className="keys-table">
          <tr>
            <th>S.No.</th>
            <th>Private key</th>
            <th>Public key</th>
          </tr>
          <tr>
            <td>1</td>
            <td>442f1315d2960829327d87c70478072073b6f20aafc79a5fb451e916a004b7ac</td>
            <td>023c0625c3ef68a7e1a519374163b2a0038b5c124d0021261d1da04cd323a803d4</td>
          </tr>
          <tr>
            <td>2</td>
            <td>5e7d6ca6bdf635bc55d6fc531e4581c6b34f36e55c9d8badcc34d6b03e99db3a</td>
            <td>030171ecc6712a1f39c6c14f1fc327eaed1b9357a8ab07ad1f55c6bda7e58ebc69</td>
          </tr>
          <tr>
            <td>3</td>
            <td>b10af40928ef813be26f74d49ab3f1435c7e832da8ceb9838b0ecff8a9d7ead2</td>
            <td>02771da263250454fc2af06ddbe5b0cb5fe06c98d9ba97ae8bc7da138e92cd6e23</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
