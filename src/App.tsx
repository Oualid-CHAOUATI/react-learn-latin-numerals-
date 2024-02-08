import { Flex } from "./UI/Flex";
import { Header } from "./components/Header/Header.component";
import { Game } from "./components/Game/Game";
import { Cheat } from "./components/Cheat/Cheat";

import "./App.css";
export const App = () => {
  return (
    <Flex isColumn gap="2em">
      <>
        <Header />
        <Game />
        <Cheat />
      </>
    </Flex>
  );
};
