const express = require('express');
const net = require('net');
const cors = require('cors');


const socket = new net.Socket();
let connected = false;

socket.connect(5000, "127.0.0.1", () => {
    // socket.write("message from nodejs\n")
    connected = true;
})

const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());

app.post('/tasks', (req, res) => {
    const body = req.body
    const backReq = {
        command: "CREATE_TASK",
        data: body
    }
    const bodyStr = JSON.stringify(backReq)
    if(connected){
        socket.write(bodyStr)
        socket.write("\n")
        socket.once("data", (data) => {
            const message = data.toString().trim();
            console.log("Respuesta del servidor:", message);
            try{
                res.json(JSON.parse(message));
            }catch(e){
                res.status(500).json({ error: "Error al procesar la respuesta del servidor" });
            }
        });
    }else{
        res.status(500).json({ error: "Socket no conectado" });
    }
});

app.put('/tasks/:id', (req, res) => {
    const body = req.body
    const taskId = req.params.id
    body.taskId = taskId
    const backReq = {
        command: "UPDATE_TASK",
        data: body
    }
    const bodyStr = JSON.stringify(backReq)
    if(connected){
        socket.write(bodyStr)
        socket.write("\n")
        socket.once("data", (data) => {
            const message = data.toString().trim();
            console.log("Respuesta del servidor:", message);
            try{
                res.json(JSON.parse(message));
            }catch(e){
                res.status(500).json({ error: "Error al procesar la respuesta del servidor" });
            }
        });
    }else{
        res.status(500).json({ error: "Socket no conectado" });
    }
});

app.get('/tasks', (req, res) => {
    if (connected) {
        const backReq = {
            command: "GET_TASKS",
            data: {}
        }
        const bodyStr = JSON.stringify(backReq)
        // Enviar el comando
        socket.write(bodyStr);
        socket.write("\n");

        socket.once("data", (data) => {
            const message = data.toString().trim();
            console.log("Respuesta del servidor:", message);
            try{
                res.json(JSON.parse(message));
            }catch(e){
                res.status(500).json({ error: "Error al procesar la respuesta del servidor" });
            }  
        });
    } else {
        res.status(500).json({ error: "Socket no conectado" });
    }
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});