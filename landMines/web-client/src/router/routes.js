import  Game from "../pages/Game.js";
import  Home  from "../pages/Home.js";
import { Router } from "./Router.js";

const urls = {
    "/": Home,
    "/game": Game,
}

export const routes = Router(urls);