/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [],
    theme: {
      extend: {
        colors: {
          border: 'var(--color-border)',
          input: 'var(--color-input)',
          ring: 'var(--color-ring)',
          background: 'var(--color-background)',
          foreground: 'var(--color-foreground)',
          primary: {
            DEFAULT: 'var(--color-primary)',
            foreground: 'var(--color-primary-foreground)'
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)',
            foreground: 'var(--color-secondary-foreground)'
          },
          destructive: {
            DEFAULT: 'var(--color-destructive)',
            foreground: 'var(--color-destructive-foreground)'
          },
          muted: {
            DEFAULT: 'var(--color-muted)',
            foreground: 'var(--color-muted-foreground)'
          },
          accent: {
            DEFAULT: 'var(--color-accent)',
            foreground: 'var(--color-accent-foreground)'
          },
          popover: {
            DEFAULT: 'var(--color-popover)',
            foreground: 'var(--color-popover-foreground)'
          },
          card: {
            DEFAULT: 'var(--color-card)',
            foreground: 'var(--color-card-foreground)'
          },
          success: {
            DEFAULT: 'var(--color-success)',
            foreground: 'var(--color-success-foreground)'
          },
          warning: {
            DEFAULT: 'var(--color-warning)',
            foreground: 'var(--color-warning-foreground)'
          },
          error: {
            DEFAULT: 'var(--color-error)',
            foreground: 'var(--color-error-foreground)'
          }
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace']
        },
        borderRadius: {
          lg: '12px',
          md: '8px',
          sm: '6px'
        },
        boxShadow: {
          sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
          DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
          lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
          xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        },
        animation: {
          'fade-in': 'fadeIn 200ms ease-out',
          'slide-in': 'slideIn 300ms ease-out',
          'scale-in': 'scaleIn 200ms ease-out'
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          },
          slideIn: {
            '0%': { transform: 'translateY(-10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          },
          scaleIn: {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' }
          }
        }
      }
    },
    corePlugins: {
      preflight: true,
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('tailwindcss-animate')
    ]
  }