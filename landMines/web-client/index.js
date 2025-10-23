import { routes } from "./src/router/routes.js";

const app = document.getElementById("app");
app.innerHTML = "";



app.appendChild(routes);