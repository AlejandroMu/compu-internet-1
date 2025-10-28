const express = require('express');
const {selectCell} = require("./services/delegateService")

const app = express()
app.use(express.json());


app.get("/board",(req, resp)=>{
    const jsonRes = {
        "message":"HW"
    }
    resp.json(jsonRes)
})

app.put("/board", async (req, resp)=>{
    const body = req.body
    console.log(body)

    const res = await selectCell(body["i"],body["j"])

    resp.status(200).json(res)

})

app.listen(5000, () =>{
    console.log("Server Intit")
})