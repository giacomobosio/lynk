import React, { ReactNode } from "react";
import clsx from "clsx";
import tinycolor from "tinycolor2";

import theme from "data/theme";
import { shadows } from "src/util/baseTheme";

interface ButtonProps {
  dark?: boolean;
  muted?: boolean;
  color?: string;          // <- opzionale per non rompere in prerender
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
  color = "primary.500",
  flat = false,
  left = false,
  sm = false,
  icon,
  href,
  children,
}) => {
  const resolveColor = (c: string): string | undefined => {
    if (c.includes(".")) {
      const [group, shade] = c.split(".");
      return (theme.colors as any)?.[group]?.[shade];
    }
    return (theme.colors as any)?.[c];
  };

  const raw = resolveColor(color) ?? color;
  const finalColor = tinycolor(raw).isValid() ? raw : "#111827";

  const bg = !muted ? finalColor : dark ? "#f9fafb" : "#111827";

  const text = muted
    ? tinycolor
        .mostReadable(bg, [finalColor, "#111827", "#f9fafb"], { includeFallbackColors: true })
        .toString()
    : tinycolor(dark ? "white" : "black").setAlpha(0.9).toString();

  const bgHover = !muted
    ? tinycolor(finalColor).darken(8).toString()
    : dark
    ? "#d9d9d9"
    : "#1f2937";

  const textHover = muted
    ? tinycolor
        .mostReadable(bgHover, [finalColor, "#111827", "#f9fafb"], { includeFallbackColors: true })
        .toString()
    : tinycolor(dark ? "white" : "black").setAlpha(1).toString();

  return (
    <>
      <a className={clsx("btn", sm && "sm")} href={href} rel="noopener noreferrer" target="_blank">
        {icon && <div className="icon">{icon}</div>}
        {children}
      </a>

      <style jsx>{`
        a {
          text-align: ${left ? "left" : "center"};
          background: ${bg};
          color: ${text};
          border: ${muted ? `1px solid ${dark ? "#e5e7eb" : "#374151"}` : "none"};
          box-shadow: ${flat ? "none" : shadows.sm};
        }

        /* evita che <span> o icone ereditino/overrideino colori globali */
        a :global(*) {
          color: ${text};
        }

        a:hover {
          background: ${bgHover};
          color: ${textHover};
          border: ${muted ? `1px solid ${dark ? "#d1d5db" : "#4b5563"}` : "none"};
          box-shadow: ${flat ? "none" : shadows.md};
        }

        a:hover :global(*) {
          color: ${textHover};
        }

        a:focus {
          box-shadow: ${shadows.xs}${flat ? "" : ", " + shadows.md};
          color: ${muted ? text : tinycolor(dark ? "white" : "black").setAlpha(1).toString()};
        }

        a:active {
          background: ${!muted
            ? tinycolor(finalColor).darken(10).toString()
            : dark
            ? "#f3f4f6"
            : "#1f2937"};
          border: ${muted ? `1px solid ${dark ? "#e5e7eb" : "#374151"}` : "none"};
          box-shadow: ${shadows.xs}${flat ? "" : ", " + shadows.lg};
        }
      `}</style>
    </>
  );
};
