module.exports = {
    content: [
        "./app/**/*.{ts,tsx,js,jsx}",
        "./components/**/*.{ts,tsx,js,jsx}",
        "./pages/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                nunito: ["Nunito Sans", "sans-serif"],
            },
            // STYLEGUIDE COLORS
            colors: {
                primary: {
                    main: "#01959F",
                    surface: "#F3FBFC",
                    border: "#4DB5BC",
                    hover: "#01777F",
                    pressed: "#01595F",
                    focus: "#01959F33",
                },
                secondary: {
                    main: "#FBC037",
                    surface: "#FFFCF5",
                    border: "#FEEABC",
                    hover: "#F8A92F",
                    pressed: "#FA9810",
                    focus: "#FBC03733",
                },
                danger: {
                    main: "#E01428",
                    surface: "#FFF9FA",
                    border: "#F5B1B7",
                    hover: "#BC1121",
                    pressed: "#700A14",
                    focus: "#E0142833",
                },
                warning: {
                    main: "#CA7336",
                    surface: "#FCF7F3",
                    border: "#FEB17B",
                    hover: "#B1652F",
                    pressed: "#985628",
                    focus: "#CA733633",
                },
                success: {
                    main: "#43936C",
                    surface: "#F7F7F7",
                    border: "#B8DBCA",
                    hover: "#367A59",
                    pressed: "#20573D",
                    focus: "#73191233",
                },
                neutral: {
                    10: "#FFFFFF",
                    20: "#FAFAFA",
                    30: "#EDEDED",
                    40: "#E0E0E0",
                    50: "#C2C2C2",
                    60: "#9E9E9E",
                    70: "#757575",
                    80: "#616161",
                    90: "#404040",
                    100: "#1D1F20",
                },
            },
            //STYLEGUIDE FONTSIZE
            fontSize: {
                48: "48px",
                32: "32px",
                28: "28px",
                24: "24px",
                20: "20px",
                18: "18px",
                16: "16px",
                14: "14px",
                12: "12px",
                10: "10px",
                8: "8px",
            },
            //STYLEGUIDE LINE HEIGHT
            lineHeight: {
                64: "64px",
                44: "44px",
                36: "36px",
                32: "32px",
                28: "28px",
                24: "24px",
                20: "20px",
                16: "16px",
                14: "14px",
                12: "12px",
                10: "10px",
            },
            //STYLEGUIDE FONT WEIGHT
            fontWeight: {
                700: 700,
                500: 500,
                400: 400,
            },
        },
    },
    plugins: [],
};
