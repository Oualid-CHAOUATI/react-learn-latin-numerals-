import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type TjustifyAndAlign =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

type TFlexProps<T extends ElementType> = {
  children?: ReactNode;
  isColumn?: true;
  gap?: string;
  As?: T;
  doWrap?: true;
  justifyContent?: TjustifyAndAlign;
  alignItems?: TjustifyAndAlign;
} & ComponentPropsWithoutRef<T>;

export const Flex = <T extends ElementType>({
  children,
  isColumn,
  gap = "1em",
  As,
  doWrap,
  alignItems,
  justifyContent,
  ...otherProps
}: TFlexProps<T>) => {
  const style = {
    display: "flex",
    flexDirection: isColumn && "column",
    flexWrap: doWrap && "wrap",
    gap,
    justifyContent,
    alignItems,
  };

  const Elem = As || "div";
  return (
    <Elem style={{ ...otherProps.style, ...style }} {...otherProps}>
      {children}
    </Elem>
  );
};
