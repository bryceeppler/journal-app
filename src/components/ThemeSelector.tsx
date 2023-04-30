import { useEffect } from "react";
import { themeChange } from "theme-change";

type Props = object;

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export default function ThemeSelector({}: Props) {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (

        <ul
          tabIndex={0}
          className="rounded-box w-52 bg-base-100 p-2 shadow"
        >
          {themes.map((theme) => (
            <li key={theme}>
              <div data-set-theme={theme} className="cursor-pointer">
                {theme}
              </div>
            </li>
          ))}
        </ul>

  );
}
