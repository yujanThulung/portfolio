import localFont from "next/font/local";

export const lufga = localFont({
  src: [
    {
      path: "../../public/fonts/Lufga/LufgaBold.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lufga/LufgaLight.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lufga/LufgaMedium.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lufga", 
  display: "swap",
});
