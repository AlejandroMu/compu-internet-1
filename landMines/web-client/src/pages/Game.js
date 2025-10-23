import Board from "../components/Board.js"
import axios from "axios";

const getBoard = async ()=>{
    let data = await fetch("http://localhost:3001/board");
    return data.json()
}

const getBoardAxios = async ()=>{
    let data = await axios.get("http://localhost:3001/board");
    console.log(data.data)
    
}

function Game(){
    const container = document.createElement('div');
    container.id = 'home-page';
    getBoardAxios();
    const title = document.createElement("h1")
    title.innerText = "Land Mines"
    title.classList = "title"
    const cells = getBoard()
    cells.then((data) =>{
        console.log(data)
        const board = Board(data)
        container.appendChild(board);
    })

    container.appendChild(title)

    return container;
}

export default Game 