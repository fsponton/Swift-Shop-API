const Connection = require('../config/DB/connection')
const Shop = require('../config/schemas/Shop')
const Product = require('../config/schemas/Product')

const config = require('../config/DB/config')
const db = new Connection(config)
const { entity } = require('../helpers')

module.exports = async (req, res) => {
    let { model } = req.params
    const name = entity(model)
    const pool = await db.connect()


    if (name === "PRODUCT") {
        const instance = new Product({ id: null, name: null, location: null, address: null, pool: pool })
        const result = await instance.getTotal()
        return res.status(200).send(result.recordset)
    }

    if (name === "SHOP") {
        const instance = new Shop({ id: null, name: null, location: null, address: null, pool: pool })
        const result = await instance.getTotal()
        return res.status(200).send(result.recordset)
    }

    res.status(200).send(result)
}