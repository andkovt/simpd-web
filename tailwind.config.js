/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  safelist: [
    'alert-info',
    'alert-success',
    'alert-warning',
    'alert-error',
  ]
}

