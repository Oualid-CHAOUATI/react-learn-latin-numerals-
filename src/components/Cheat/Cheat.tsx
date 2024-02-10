import { useContext } from "react";
import { LanguageContext, TLanguageContext } from "../../Contexts/App.context";
import { Flex } from "../../UI/Flex";
import "./Cheat.styles.scss";
import { arabNumbers, romanNumbers } from "../../assets/hooks/gameHook";

export function Cheat() {
  const { isOpenCheat } = useContext(LanguageContext) as TLanguageContext;
  if (!isOpenCheat) return null;
  return (
    <div className="cheat">
      <Flex isColumn alignItems="center">
        <>
          {arabNumbers.map((number: string, index: number) => (
            <Flex alignItems="center">
              <>
                <div>{number}</div> <span className="separator"></span>{" "}
                <div>{romanNumbers[index]}</div>
              </>
            </Flex>
          ))}
        </>
      </Flex>
    </div>
  );
}
