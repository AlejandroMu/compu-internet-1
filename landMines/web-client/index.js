import { routes } from "./src/router/routes.js";
import './index.css'

const app = document.getElementById("app");
app.innerHTML = "";



app.appendChild(routes);