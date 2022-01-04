import {extendTheme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: true,
	},
	colors: {
		bodyDark: "#212121", // black
		bodyDarkAlt: "#1E1E1E", // black
		bodyDark2nd: "#424242", // lighter black
		bodyDark2ndAlt: "#8F8F8F", // lighter black
		bodyLight: "#F5F5F5", // white
		bodyLight2nd: "#E0E0E0", // darker white
		brandADark: "#8eff9c", // green
		brandALight: "#F48FB1", // lighter greenb
		brandBDark: "#0007d6", // blue
		brandBLight: "#1DE9B6", // teal
		brandCDark: "#c42ba0", // pink
		brandCLight: "#ff93e6", // pink
	},

	fonts: {
		// titleFont:'libre-franklin.800',
		// subtitleFont: "sarala",
		// textsFont: "overpass",
		// controlsFont: "sarala",
		titleFont: "montserrat",
		subtitleFont: "poppins.900",
		textsFont: "roboto",
		controlsFont: "montserrat",
	},

	styles: {
		global: (props) => ({
			body: {
				color: mode("bodyLight", "bodyDark")(props),
				bg: mode("bodyDarkAlt", "bodyLight")(props),
			},
			h1: {
				fontFamily: "titleFont",
			},
			button: {
				// borderRadius: "0",
				// color: mode("bodyLight", "bodyDark")(props),
				// bg: mode("", "")(props),
				// _hover: {
				// 	color: mode("bodyLight", "bodyDark")(props),
				// 	bg: mode("bodyDark2nd", "bodyLight2nd")(props),
				// },
			},
			input: {},
			bold: {
				fontWeight: "bold",
			},
		}),
	},

	components: {
		// Input: {
		// 	baseStyle: (props) => ({
		// 		backgroundColor: mode("bodyLight2nd", "bodyDark2nd")(props),
		// 		borderColor: mode("bodyDark2nd", "bodyLight2nd")(props),
		// 		_hover: {
		// 			borderColor: mode("bodyDark2nd", "bodyLight2nd")(props),
		// 		},
		// 	}),
		// },
		Heading: {
			baseStyle: {}, // i.e. fontWeight: 'bold', etc.
			sizes: {}, // i.e. sm, md, lg:{h:, fontSize:}, etc.

			variants: {
				"showcase-title": {
					fontFamily: "titleFont",
					fontSize: "5xl",
					// fontWeight: "extrabold",
					marginBottom: ".48rem",
					letterSpacing: ".28rem",
				},

				"section-title": {
					fontFamily: "subtitleFont",
					fontSize: "2xl",
					marginBottom: ".48rem",
				},

				"worksample-title": {
					fontSize: "2xl",
					fontFamily: "subtitleFont",
					letterSpacing: ".06vh",
					marginBottom: ".68rem",
				},
			},
		},

		Text: {
			baseStyle: {
				fontFamily: "titleFont",
			},
			variants: {
				"showcase-subtitle": {
					color: "bodyLight2nd",
					fontFamily: "subtitleFont",
					// fontSize: "lg",
					// marginBottom='md',
					// letterSpacing: ".38rem",
				},

				"showcase-text": {
					fontSize: "sm",
					fontFamily: "textsFont",
					lineHeight: "1.6rem",
					letterSpacing: ".08rem",
					// textAlign: "center",
				},

				"highlight-text": {
					display: "inline",
				},

				"highlight-text-bgBlack": {
					display: "inline",
					bg: "black",
				},
				"section-text": {
					fontSize: "1.1rem",
					lineHeight: "2rem",
				},
				"worksample-item-text": {
					fontSize: "sm",
					fontFamily: "textsFont",
					lineHeight: "1.6rem",
					letterSpacing: ".08rem",
				},
			},
		},

		Button: {
			baseStyle: (props) => ({
				fontFamily: "controlsFont",
				// color: mode("bodyLight", "bodyDark")(props),
				// borderColor: mode("bodyLight", "bodyDark")(props),
				// bg: mode("bodyDark2nd", "bodyLight2nd")(props),
				// hov: mode("bodyLight2nd", "bodyDark2nd")(props),
				borderRadius: "0",
				border: ".2rem",
			}),

			variants: {
				// proposed actions
				// confirmed actions
				outline: (props) => ({
					// fontSize: 'sm',
					// fontWeight: 'light',
					// letterSpacing:'.11rem',
					baseStyle: {
						borderColor: mode("brandCLight", "brandCDark")(props),
					},
					_hover: {
						borderColor: mode("brandCLight", "brandCDark")(props),
						backgroundColor: mode("brandCLight", "brandCDark")(props),
						color: "white",
					},
				}),
				ghost: (props) => ({
					// fontSize: 'sm',
					// fontWeight: 'light',
					// letterSpacing:'.11rem',
					// baseStyle: {
					// 	borderColor: mode("brandCLight", "brandCDark")(props),
					// },
					_hover: {
						color: mode("bodyDark", "bodyLight")(props),
						backgroundColor: mode("bodyLight", "bodyDark")(props),
					},
				}),
			},
		},

		Link: {
			baseStyle: (props) => ({
				textUnderlineOffset: 3,
				_hover: {
					color: mode("bodyDark", "bodyLight")(props),
					backgroundColor: mode("bodyLight", "bodyDark")(props),
				},
			}),

			variants: {
				"showcase-nav": (props) => ({
					fontFamily: "subtitleFont",
					letterSpacing: ".22rem",
				}),
			},
		},
	},
});
/*

	#a1a4d9 #00077A
	#a0b6da #0042AD
	#9ebcd6 #006DCA
	#c5dee8 #0096D3
	#9fd7db #00BDCC
	#9dddd3 #00E2BF
*/
// const customTheme = extendTheme(
//   withDefaultSize({
//     size: "lg",
//     components: ["Button", "Badge"],
//   }),
// )

// const customTheme = extendTheme(
//   withDefaultVariant({
//     variant: "outline",
//     components: ["Input", "NumberInput", "PinInput"],
//   }),
// )

// const breakpoints = createBreakpoints({
// 	sm: '320px',
// 	md: '768px',
// 	lg: '960px',
// 	xl: '1200px',
// 	'2xl': '1536px',
//     })

//     // 3. Extend the theme
//     const theme = extendTheme({ breakpoints })

export default theme;
