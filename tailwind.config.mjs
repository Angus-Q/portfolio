import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'main': '#1d1e22',
                'accent': '#1d1e22',
                'accent-red': '#1d1e22',
                'hover-accent': '#2d2e32',
                'section-darker': '#f9fafb',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            // This section overrides the default prose (markdown) styles
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        'h1, h2, h3, h4, h5, h6': {
                            fontFamily: theme('fontFamily.serif'),
                        },
                        // This new rule styles all images inside your markdown content
                        'img': {
                            borderRadius: theme('borderRadius.xl'),
                            boxShadow: theme('boxShadow.md'),
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        typography,
    ],
}