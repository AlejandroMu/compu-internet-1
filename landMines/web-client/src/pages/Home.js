
function Home(){
    const container = document.createElement('div');
    container.id = 'home-page';

    const title = document.createElement("h1")
    title.innerText = "Welcome"
    title.classList = "title"

    container.appendChild(title)

    return container;
}

export default Home