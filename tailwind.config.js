/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'var(--background)',
    			emerald: {
    				'50': 'var(--emerald-50)',
    				'100': 'var(--emerald-100)',
    				'200': 'var(--emerald-200)',
    				'300': 'var(--emerald-300)',
    				'400': 'var(--emerald-400)',
    				'500': 'var(--emerald-500)',
    				'600': 'var(--emerald-600)',
    				'700': 'var(--emerald-700)',
    				'800': 'var(--emerald-800)',
    				'900': 'var(--emerald-900)'
    			},
    			slate: {
    				'50': 'var(--slate-50)',
    				'100': 'var(--slate-100)',
    				'200': 'var(--slate-200)',
    				'300': 'var(--slate-300)',
    				'400': 'var(--slate-400)',
    				'500': 'var(--slate-500)',
    				'600': 'var(--slate-600)',
    				'700': 'var(--slate-700)',
    				'800': 'var(--slate-800)',
    				'900': 'var(--slate-900)'
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
    			}
    		}
    	}
    },
	plugins: [
		require("tailwindcss-animate"),
		require('@tailwindcss/typography'),
	  ],
}

