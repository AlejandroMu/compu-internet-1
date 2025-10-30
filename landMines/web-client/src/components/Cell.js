const Cell = (cell) => {
    const {id, value, isLandMine, hide, onClick,showAll, ...props} = cell



    const cellContainer = document.createElement("div")
    cellContainer.className = "cell"
    const show = !hide || showAll
    cellContainer.classList.add(!show ? "hide":isLandMine ? "isMine":"blank")
    cellContainer.innerText = show ? (isLandMine ? "*" : value == 0 ? "" : value) : ""

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