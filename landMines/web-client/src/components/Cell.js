const Cell = (cell) => {
    const {id, value, isMine, hide, onClick, ...props} = cell



    const cellContainer = document.createElement("div")
    cellContainer.className = "cell"

    cellContainer.classList.add(hide ? "hide":isMine ? "isMine":"blank")

    cellContainer.addEventListener("click", (e) => {
        e.preventDefault()
        onClick(id);
    });

    cellContainer.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        console.log("Right click on cell: "+ id);
    });

    return cellContainer
}

export default Cell