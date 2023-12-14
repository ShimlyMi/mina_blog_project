/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        colors: {
            "primary-red": "#f08080";
        }
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
}
