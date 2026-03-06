import { createBrowserRouter } from "react-router";
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Game from "./screens/Game";
import Win from "./screens/Win";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/game",
    Component: Game,
  },
  {
    path: "/win",
    Component: Win,
  },
]);
