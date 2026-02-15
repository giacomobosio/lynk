import React, { ReactNode } from "react";

import clsx from "clsx";
import tinycolor from "tinycolor2";

import theme from "data/theme";
import { shadows } from "src/util/baseTheme";

interface ButtonProps {
  dark?: boolean;
  muted?: boolean;
  color?: string;   // <- opzionale
  flat?: boolean;
  left?: boolean;
  sm?: boolean;
  icon?: ReactNode;
  href: string;
  children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  dark = false,
  muted = false,
  color = "gray.800", // <- default
  flat = false,
  left = false,
  sm = false,
  icon,
  href,
  children,
}) => {
  let rawColor: string;

  if (typeof color === "string" && color.includes(".")) {
    const [group, shade] = color.split(".");
    rawColor = (theme.colors as any)?.[group]?.[shade] ?? "#111827";
  } else {
    rawColor = (theme.colors as any)?.[color] ?? color ?? "#111827";
  }

  return (
    <>
      <a className={clsx("btn", sm && "sm")} href={href} rel="noopener noreferrer" target="_blank">
        {icon && <div className="icon">{icon}</div>}
        {children}
      </a>
      {/* il tuo CSS uguale */}
    </>
  );
};
