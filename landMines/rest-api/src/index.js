const express = require('express');
const cors = require('cors')
const {selectCell, getBoard, restartGame} = require("./services/delegateService")

const app = express()
app.use(express.json());
app.use(cors())

app.get("/board",async (req, resp)=>{

    const res = await getBoard()

    resp.status(200).json(res)
})

app.put("/board", async (req, resp)=>{
    const body = req.body
    console.log(body)

    const res = await selectCell(body["i"],body["j"])

    resp.status(200).json(res)

})

app.post("/restart", async (req, resp)=>{
    const body = req.body
    console.log(body)

    const res = await restartGame(body["n"], body["m"], body["minas"])

    resp.status(200).json(res)

})
app.listen(5000, () =>{
    console.log("Server Intit")
})