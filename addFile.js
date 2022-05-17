const IPFS = require('ipfs-core')

module.exports = async (payload) => {
    const node = await IPFS.create()
    const data = JSON.stringify(payload)

    const results = await node.add(data)

    const {cid} = results
    return cid.toString()
}