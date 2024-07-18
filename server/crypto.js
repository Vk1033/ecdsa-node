const { secp256k1: secp } = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}
function recoverKey(message, signature) {
  const { r, s, recovery } = signature;
  const sig = new secp.Signature(BigInt(r), BigInt(s), recovery);
  return sig.recoverPublicKey(hashMessage(message)).toHex();
}

module.exports = { recoverKey, secp };
