import localFont from "next/font/local";

export const neueGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/neue-haas-grotesk-pro/NeueHaasDisplayXXThin.ttf",
      weight: "100", // Extra Thin
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-grotesk-pro/NeueHaasDisplayXThin.ttf",
      weight: "200", // Thin
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-grotesk-pro/NeueHaasDisplayThin.ttf",
      weight: "300", // Light-Thin
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-grotesk-pro/NeueHaasDisplayLight.ttf",
      weight: "400", // Light
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-grotesk-pro/NeueHaasDisplayRoman.ttf",
      weight: "500", // Regular / Roman
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-grotesk-pro/NeueHaasDisplayMedium.ttf",
      weight: "600", // Medium
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-grotesk-pro/NeueHaasDisplayBold.ttf",
      weight: "700", // Bold
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-grotesk-pro/NeueHaasDisplayBlack.ttf",
      weight: "900", // Black
      style: "normal",
    },
  ],
  variable: "--font-neue-grotesk",
  display: "swap", // ensures no FOIT (Flash of Invisible Text)
});
