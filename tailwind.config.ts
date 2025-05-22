
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
					'0%': { transform: 'translate(0, 100%)', opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { transform: 'translate(0, -100vh)', opacity: '0' }
				},
				'glitch': {
					'0%': { opacity: '1', transform: 'translateX(0)' },
					'2%': { opacity: '0.8', transform: 'translateX(2px)' },
					'4%': { opacity: '0.9', transform: 'translateX(-2px)' },
					'6%': { opacity: '1', transform: 'translateX(0)' },
					'54%': { opacity: '1', transform: 'translateX(0)' },
					'55%': { opacity: '0.7', transform: 'translateX(-1px)' },
					'56%': { opacity: '0.8', transform: 'translateX(3px)' },
					'57%': { opacity: '1', transform: 'translateX(0)' },
					'92%': { opacity: '1', transform: 'translateX(0)' },
					'93%': { opacity: '0.8', transform: 'translateX(-3px)' },
					'94%': { opacity: '0.9', transform: 'translateX(2px)' },
					'96%': { opacity: '0.8', transform: 'translateX(-1px)' },
					'98%': { opacity: '1', transform: 'translateX(0)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'lightleak': {
					'0%': { background: 'linear-gradient(0deg, rgba(255,255,255,0) 85%, rgba(255,255,255,0.5) 90%, rgba(255,255,255,0) 95%)', backgroundSize: '200% 200%', backgroundPosition: 'left top' },
					'25%': { background: 'linear-gradient(90deg, rgba(255,255,255,0) 85%, rgba(255,255,255,0.5) 90%, rgba(255,255,255,0) 95%)', backgroundSize: '200% 200%', backgroundPosition: 'right top' },
					'50%': { background: 'linear-gradient(180deg, rgba(255,255,255,0) 85%, rgba(255,255,255,0.5) 90%, rgba(255,255,255,0) 95%)', backgroundSize: '200% 200%', backgroundPosition: 'right bottom' },
					'75%': { background: 'linear-gradient(270deg, rgba(255,255,255,0) 85%, rgba(255,255,255,0.5) 90%, rgba(255,255,255,0) 95%)', backgroundSize: '200% 200%', backgroundPosition: 'left bottom' },
					'100%': { background: 'linear-gradient(0deg, rgba(255,255,255,0) 85%, rgba(255,255,255,0.5) 90%, rgba(255,255,255,0) 95%)', backgroundSize: '200% 200%', backgroundPosition: 'left top' }
				},
				'spark': {
					'0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
					'50%': { transform: 'scale(1) rotate(180deg)', opacity: '0.8' },
					'100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' }
				},
				'float': {
					'0%': { transform: 'translateY(0) translateX(0) rotate(0)' },
					'25%': { transform: 'translateY(-30px) translateX(10px) rotate(5deg)' },
					'50%': { transform: 'translateY(-10px) translateX(20px) rotate(-5deg)' },
					'75%': { transform: 'translateY(-20px) translateX(-10px) rotate(3deg)' },
					'100%': { transform: 'translateY(0) translateX(0) rotate(0)' }
				},
				'snowfall': {
					'0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '0.8' },
					'100%': { transform: 'translateY(600px) rotate(360deg)', opacity: '0' }
				},
				'confetti': {
					'0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '0.8' },
					'100%': { transform: 'translateY(600px) rotate(720deg)', opacity: '0' }
				},
				'matrixDrop': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '0.8' },
					'100%': { transform: 'translateY(600px)', opacity: '0' }
				},
				'flames': {
					'0%': { transform: 'translateY(0) scale(1, 0.8)', filter: 'brightness(1)' },
					'25%': { transform: 'translateY(-15px) scale(1.05, 1)', filter: 'brightness(1.1)' },
					'50%': { transform: 'translateY(-5px) scale(0.95, 0.9)', filter: 'brightness(0.9)' },
					'75%': { transform: 'translateY(-10px) scale(1.05, 0.95)', filter: 'brightness(1.05)' },
					'100%': { transform: 'translateY(0) scale(1, 0.8)', filter: 'brightness(1)' }
				},
				'twinkle': {
					'0%': { opacity: '0.3', transform: 'scale(0.8)' },
					'50%': { opacity: '1', transform: 'scale(1.2)' },
					'100%': { opacity: '0.3', transform: 'scale(0.8)' }
				},
				'waves': {
					'0%': { backgroundPosition: '0% 0%', transform: 'translateY(0)' },
					'25%': { backgroundPosition: '50% 25%', transform: 'translateY(-10px)' },
					'50%': { backgroundPosition: '100% 50%', transform: 'translateY(0)' },
					'75%': { backgroundPosition: '50% 75%', transform: 'translateY(10px)' },
					'100%': { backgroundPosition: '0% 100%', transform: 'translateY(0)' }
				},
				'smoke': {
					'0%': { backgroundPosition: '0% 0%', transform: 'translateY(0) translateX(0)' },
					'25%': { backgroundPosition: '25% 25%', transform: 'translateY(-10px) translateX(5px)' },
					'50%': { backgroundPosition: '50% 50%', transform: 'translateY(0) translateX(10px)' },
					'75%': { backgroundPosition: '75% 75%', transform: 'translateY(10px) translateX(5px)' },
					'100%': { backgroundPosition: '100% 100%', transform: 'translateY(0) translateX(0)' }
				},
				'firework': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'25%': { transform: 'scale(1)', opacity: '0.7' },
					'50%': { transform: 'scale(0.8)', opacity: '0.5' },
					'75%': { transform: 'scale(1.2)', opacity: '0.3' },
					'100%': { transform: 'scale(1.5)', opacity: '0' }
				},
				'bubbles': {
					'0%': { transform: 'translateY(100%) translateX(0) scale(0)', opacity: '0' },
					'10%': { transform: 'translateY(90%) translateX(5px) scale(0.2)', opacity: '0.2' },
					'30%': { transform: 'translateY(70%) translateX(-10px) scale(0.4)', opacity: '0.4' },
					'50%': { transform: 'translateY(50%) translateX(15px) scale(0.6)', opacity: '0.6' },
					'70%': { transform: 'translateY(30%) translateX(-5px) scale(0.8)', opacity: '0.8' },
					'90%': { transform: 'translateY(10%) translateX(10px) scale(1)', opacity: '0.6' },
					'100%': { transform: 'translateY(0%) translateX(0) scale(1.2)', opacity: '0' }
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
				'bubbleRise': 'bubbles 8s ease-in-out infinite',
				'glitch': 'glitch 8s linear infinite',
				'lightleak': 'lightleak 12s ease infinite',
				'spark': 'spark 3s ease-in-out infinite',
				'float': 'float 5s ease infinite',
				'snowfall': 'snowfall 8s linear infinite',
				'confetti': 'confetti 10s linear infinite',
				'matrixDrop': 'matrixDrop 8s linear infinite',
				'flames': 'flames 3s ease-in-out infinite',
				'twinkle': 'twinkle 2s ease-in-out infinite',
				'waves': 'waves 8s ease infinite',
				'smoke': 'smoke 10s ease infinite',
				'firework': 'firework 3s ease-out infinite',
				'bubbles': 'bubbles 10s ease infinite',
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
