import { createBrowserRouter } from "react-router";
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Game from "./screens/Game";
import Win from "./screens/Win";

export const router = createBrowserRouter(
  [
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
  ],
  {
    // react-router's `basename` must start with '/' to match URLs.
    // Vite may set `import.meta.env.BASE_URL` to a relative value like './'
    // when `base` is './'. Normalize it so we pass '/' in that case.
    basename: ((): string => {
      const b = import.meta.env.BASE_URL ?? '/';
      return typeof b === 'string' && b.startsWith('/') ? b : '/';
    })(),
  },
);
