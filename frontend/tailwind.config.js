module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--brand-primary)',
        'brand-primary-dark': 'var(--brand-primary-dark)',
        'brand-background': 'var(--brand-background)',
        'brand-active': 'var(--brand-active)',
        'brand-header-background': 'var(--brand-header-background)',
        'primary-red': 'var(--primary-red)',
        'red-hover': 'var(--red-hover)',
        'primary-white': 'var(--primary-white)',
        'white-hover': 'var(--white-hover)',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
