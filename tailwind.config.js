module.exports = {
  darkMode: 'class', // Ensure 'class' mode is set for dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files for purge
    "./public/index.html", // Include the root HTML file
  ],
  theme: {
    extend: {
      colors: {
        // Google-like colors
        'google-blue': '#4285F4',
        'google-gray': '#202124',
        'google-light-gray': '#F8F9FA',
        'google-dark-gray': '#5F6368',
        'google-white': '#FFFFFF',
        'google-black': '#000000',
        'google-red': '#EA4335',
        'google-yellow': '#FBBC05',
        'google-green': '#34A853',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        serif: ['Lora', 'Serif'],
      },
      textColor: {
        'google-dark-text': '#202124',
        'google-light-text': '#E8EAED',
      },
      backgroundColor: {
        'google-header': '#4285F4',
        'google-footer': '#F2F2F2',
        'google-footer-dark': '#202124',
      },
      borderColor: {
        'google-border': '#DADCE0',
      },
    },
  },
  plugins: [],
};
