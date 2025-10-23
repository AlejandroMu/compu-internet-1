const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 3001;
app.use(express.json());

const board = [
    [{value:"1", isMine:false, hide:true},{value:"1", isMine:false, hide:true}],
    [{value:"1", isMine:false, hide:true},{value:"*", isMine:true, hide:true}],
[{value:"1", isMine:false, hide:true},{value:"1", isMine:false, hide:true}]
]



app.post('/board', (req, res) => {
    
});

app.get('/board', (req, res) => {
    res.json(board)
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});