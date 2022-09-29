// Importando as dependências
const bip32 = require("bip32")
const bip39 = require("bip39")
const bitcoinjs = require("bitcoinjs-lib")
const isTestNet = true

// Definindo a rede
// bitcoin - Rede principal - mainet
// testnet - Rede de testes - testnet
const network = (isTestNet) ? bitcoinjs.networks.testnet : bitcoinjs.networks.bitcoin

// Derivação de carteiras HD
const path = (isTestNet) ? `m/49'/1'/0'/0` : `m/49'/0'/0'/0`

// Gerando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

// Criando a conta - Par private e public Keys
let account = root.derivePath(path)

// Gerando a carteira raiz
let node = account.derive(0).derive(0)

// Gerando o endereço público da carteira
let btcAddress = bitcoinjs.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

// Exibindo a carteira
console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave Privada: ", node.toWIF())
console.log("Seed: ", mnemonic)















