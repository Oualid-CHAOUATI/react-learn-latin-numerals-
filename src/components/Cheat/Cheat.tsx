import { useContext } from "react";
import { LanguageContext, TLanguageContext } from "../../Contexts/App.context";
import { Flex } from "../../UI/Flex";
import "./Cheat.styles.scss";

export function Cheat() {
  const { numbersMap, isOpenCheat } = useContext(
    LanguageContext
  ) as TLanguageContext;
  if (!isOpenCheat) return null;
  return (
    <div className="cheat">
      <Flex isColumn alignItems="center">
        <>
          {numbersMap.arab.map((number: string, index: number) => (
            <Flex alignItems="center">
              <>
                <div>{number}</div> <span className="separator"></span>{" "}
                <div>{numbersMap.roman[index]}</div>
              </>
            </Flex>
          ))}
        </>
      </Flex>
    </div>
  );
}
