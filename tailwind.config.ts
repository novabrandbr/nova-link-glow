
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				nova: {
					purple: '#6A0DAD',
					'light-purple': '#C9A0FF',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'bubbleRise': {
					'0%': { backgroundPosition: '0% 100%' },
					'100%': { backgroundPosition: '0% 0%' }
				},
				'glitch': {
					'0%': { opacity: '1' },
					'50%': { opacity: '0.5', transform: 'translateX(2px)' },
					'51%': { opacity: '0.5', transform: 'translateX(-2px)' },
					'100%': { opacity: '1' }
				},
				'lightleak': {
					'0%': { backgroundPosition: '0% 0%' },
					'25%': { backgroundPosition: '100% 0%' },
					'50%': { backgroundPosition: '100% 100%' },
					'75%': { backgroundPosition: '0% 100%' },
					'100%': { backgroundPosition: '0% 0%' }
				},
				'spark': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'50%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0)', opacity: '0' }
				},
				'float': {
					'0%': { transform: 'translateY(0) translateX(0)' },
					'25%': { transform: 'translateY(-30px) translateX(10px)' },
					'50%': { transform: 'translateY(-10px) translateX(20px)' },
					'75%': { transform: 'translateY(-20px) translateX(-10px)' },
					'100%': { transform: 'translateY(0) translateX(0)' }
				},
				'snowfall': {
					'0%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(600px)' }
				},
				'confetti': {
					'0%': { transform: 'translateY(-10px) rotate(0deg)' },
					'100%': { transform: 'translateY(600px) rotate(360deg)' }
				},
				'matrixDrop': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(600px)' }
				},
				'flames': {
					'0%': { transform: 'translateY(0) scaleY(0.8)' },
					'50%': { transform: 'translateY(-10px) scaleY(1.0)' },
					'100%': { transform: 'translateY(0) scaleY(0.8)' }
				},
				'twinkle': {
					'0%': { opacity: '0.3' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0.3' }
				},
				'waves': {
					'0%': { backgroundPosition: '0% 0%' },
					'25%': { backgroundPosition: '100% 0%' },
					'50%': { backgroundPosition: '100% 100%' },
					'75%': { backgroundPosition: '0% 100%' },
					'100%': { backgroundPosition: '0% 0%' }
				},
				'smoke': {
					'0%': { backgroundPosition: 'center 0%' },
					'25%': { backgroundPosition: 'center 25%' },
					'50%': { backgroundPosition: 'center 50%' },
					'75%': { backgroundPosition: 'center 75%' },
					'100%': { backgroundPosition: 'center 0%' }
				},
				'firework': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'25%': { transform: 'scale(1)', opacity: '0.7' },
					'50%': { transform: 'scale(0.8)', opacity: '0.5' },
					'75%': { transform: 'scale(1.2)', opacity: '0.3' },
					'100%': { transform: 'scale(1.5)', opacity: '0' }
				},
				'customEffect': {
					'0%': { backgroundPosition: '0% 0%' },
					'25%': { backgroundPosition: '100% 0%' },
					'50%': { backgroundPosition: '100% 100%' },
					'75%': { backgroundPosition: '0% 100%' },
					'100%': { backgroundPosition: '0% 0%' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bubbleRise': 'bubbleRise 4s linear infinite',
				'glitch': 'glitch 0.5s linear infinite',
				'lightleak': 'lightleak 8s ease infinite',
				'spark': 'spark 3s linear infinite',
				'float': 'float 5s ease infinite',
				'snowfall': 'snowfall 10s linear infinite',
				'confetti': 'confetti 10s linear infinite',
				'matrixDrop': 'matrixDrop 10s linear infinite',
				'flames': 'flames 2s ease-in-out infinite',
				'twinkle': 'twinkle 2s ease-in-out infinite',
				'waves': 'waves 5s ease infinite',
				'smoke': 'smoke 8s ease infinite',
				'firework': 'firework 3s ease-out infinite',
				'customEffect': 'customEffect 10s linear infinite',
			},
			fontFamily: {
				'montserrat': ['Montserrat', 'sans-serif'],
				'bebas-neue': ['"Bebas Neue"', 'sans-serif'],
				'helvetica-neue': ['-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'Arial', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
				'burbank': ['"Burbank Big"', 'Impact', 'sans-serif'],
				'pixelated': ['"Press Start 2P"', 'monospace'],
				'handwritten': ['"Caveat"', 'cursive'],
				'roboto': ['Roboto', 'sans-serif'],
				'open-sans': ['"Open Sans"', 'sans-serif'],
				'lato': ['Lato', 'sans-serif'],
				'playfair': ['"Playfair Display"', 'serif'],
				'merriweather': ['Merriweather', 'serif'],
				'georgia': ['Georgia', 'serif'],
				'verdana': ['Verdana', 'sans-serif'],
				'impact': ['Impact', 'Haettenschweiler', 'sans-serif'],
				'times-new-roman': ['"Times New Roman"', 'serif'],
				'courier-new': ['"Courier New"', 'monospace'],
				'comic-sans': ['"Comic Sans MS"', 'cursive'],
				'arial': ['Arial', 'sans-serif'],
				'tahoma': ['Tahoma', 'sans-serif'],
				'trebuchet': ['"Trebuchet MS"', 'sans-serif'],
				'nunito': ['Nunito', 'sans-serif'],
				'raleway': ['Raleway', 'sans-serif'],
				'oswald': ['Oswald', 'sans-serif'],
				'pacifico': ['Pacifico', 'cursive'],
				'dancing-script': ['"Dancing Script"', 'cursive'],
				'quicksand': ['Quicksand', 'sans-serif'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
