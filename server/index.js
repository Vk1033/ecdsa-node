const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { recoverKey } = require("./crypto");

app.use(cors());
app.use(express.json());

const balances = {
  "023c0625c3ef68a7e1a519374163b2a0038b5c124d0021261d1da04cd323a803d4": 100, //442f1315d2960829327d87c70478072073b6f20aafc79a5fb451e916a004b7ac
  "030171ecc6712a1f39c6c14f1fc327eaed1b9357a8ab07ad1f55c6bda7e58ebc69": 50, //5e7d6ca6bdf635bc55d6fc531e4581c6b34f36e55c9d8badcc34d6b03e99db3a
  "02771da263250454fc2af06ddbe5b0cb5fe06c98d9ba97ae8bc7da138e92cd6e23": 75, //b10af40928ef813be26f74d49ab3f1435c7e832da8ceb9838b0ecff8a9d7ead2
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { msg, signature, amount, recipient } = req.body;
  const sender = recoverKey(msg, signature);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    // console.log(balances[sender]);
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
