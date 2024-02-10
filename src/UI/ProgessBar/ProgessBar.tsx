import "./ProgessBar.styles.scss";

type TProgessBarProps = {
  percentage: number | string;
  progessColor?: string;
  bgColor?: string;
  showLabel?: true;
  textColor?: string;
  fontSize?: string;
};
export function ProgessBar({
  percentage,
  bgColor,
  progessColor,
  showLabel = true,
  textColor = "#000",
  fontSize = "1.2em",
}: TProgessBarProps) {
  if (percentage) percentage = percentage + "%";
  const style = { percentage, bgColor, progessColor, textColor, fontSize };

  const styleMap = Object.entries(style).map(([key, value]) => {
    return [`--${key}`, value];
  });

  return (
    <div
      style={Object.fromEntries(styleMap)}
      className="progress-bar"
      role="progressbar"
    >
      {showLabel && percentage}
    </div>
  );
}
