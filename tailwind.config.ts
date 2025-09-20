import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-inter)', 'sans-serif'],
        headline: ['var(--font-inter)', 'sans-serif'],
        code: ['var(--font-source-code-pro)', 'monospace'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          nested: 'hsl(var(--card-nested))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        // Radium/Gaming Theme
        'code-bg': 'var(--code-bg)',
        'code-text': 'var(--code-text)',
        'command': 'var(--command)',
        'keyword': 'var(--keyword)',
        'label': 'var(--label)',
        'tips': 'var(--tips)',
        'primary-accent': 'var(--primary-accent)',
        'secondary-accent': 'var(--secondary-accent)',
        'tertiary-accent': 'var(--tertiary-accent)',

        // C Syntax Highlighting
        'syntax-keyword': 'hsl(var(--keyword))',
        'syntax-datatype': 'hsl(var(--datatype))',
        'syntax-function': 'hsl(var(--function))',
        'syntax-string': 'hsl(var(--string))',
        'syntax-number': 'hsl(var(--number))',
        'syntax-comment': 'hsl(var(--comment))',
        'syntax-operator': 'hsl(var(--operator))',
        'syntax-semicolon': 'hsl(var(--semicolon))',


        // Git Game & Regex Theme
        'neon-blue': '#00f3ff',
        'neon-green': '#00ff41',
        'neon-pink': '#ff006e',
        'dark-primary': '#0a0a0f',
        'dark-secondary': '#1a1a2e',
        'accent-purple': '#6c5ce7',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'gradient-animation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fade-in-up': {
            'from': {
                opacity: '0',
                transform: 'translateY(20px)'
            },
            'to': {
                opacity: '1',
                transform: 'translateY(0)'
            }
        },
        // Git Game & Regex Animations
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(1deg)' },
          '66%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
        'gradient-shift': {
            '0%, 100%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' },
        },
        'slide-in-up': {
            'from': { opacity: '0', transform: 'translateY(20px)' },
            'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-custom': {
            '0%, 100%': { transform: 'scale(1)', 'box-shadow': '0 0 0 0 rgba(0, 255, 65, 0.7)' },
            '50%': { transform: 'scale(1.1)', 'box-shadow': '0 0 0 20px rgba(0, 255, 65, 0)' },
        },
        'shake-custom': {
            '0%, 100%': { transform: 'translateX(0)' },
            '25%': { transform: 'translateX(-5px)' },
            '75%': { transform: 'translateX(5px)' },
        },
        'particle-burst': {
            'from': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
            'to': { transform: 'translate(var(--x), var(--y)) scale(0)', opacity: '0' }
        },
        'pulse-once': {
            '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0px #00ff41' },
            '50%': { transform: 'scale(1.1)', boxShadow: '0 0 15px 5px #00ff41' },
            '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0px #00ff41' },
        },
        'confetti-fall': {
            'from': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
            'to': { transform: 'translateY(150px) rotate(720deg)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'gradient': 'gradient-animation 18s ease infinite',
        // Git Game & Regex Animations
        'float': 'float 20s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
        'slide-in-up': 'slide-in-up 0.5s ease',
        'pulse-custom': 'pulse-custom 2s infinite',
        'shake-custom': 'shake-custom 1s infinite',
        'particle-burst': 'particle-burst 1s ease-out',
        'pulse-once': 'pulse-once 0.7s forwards',
        'confetti-fall': 'confetti-fall 2s ease-out forwards',
      },
      textShadow: {
        glow: '0 0 8px hsl(var(--primary) / 0.8)',
      },
      backdropBlur: {
        'xs': '2px'
      }
    },
  },
  plugins: [require('tailwindcss-animate'),
    function ({ addUtilities, theme }: { addUtilities: Function, theme: Function }) {
      const newUtilities = {
        '.text-shadow-glow': {
          textShadow: theme('textShadow.glow'),
        },
      }
      addUtilities(newUtilities, ['dark'])
    }
  ],
} satisfies Config;
