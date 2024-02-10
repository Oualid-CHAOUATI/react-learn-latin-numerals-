import { Flex } from "./UI/Flex";
import { Header } from "./components/Header/Header.component";
import { Game } from "./components/Game/Game";
import { Cheat } from "./components/Cheat/Cheat";

import "./App.css";
import { BG } from "./UI/BG";
import { ProgessBar } from "./UI/ProgessBar/ProgessBar";
export const App = () => {
  return (
    <Flex isColumn gap="2em">
      <>
        <BG />
        <Header />
        <Game />
        <Cheat />
      </>
    </Flex>
  );
};
