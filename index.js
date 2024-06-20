const AsyncMikronode = require('./mikronode-tools/asyncMikrotik');
const barco = require('./barcos');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/barco/:id', async (req, res) => {
    let barcoid = parseInt(req.params.id);
    try {
        console.log(barcoid);
        let usuario = await AsyncMikronode.getHotspotUser(barco.get(barcoid))
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify({ usuario: usuario['name'], password: usuario['password'] }))
    } catch (error) {
        console.error(error);
    }
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

