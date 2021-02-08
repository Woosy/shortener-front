module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: [],
  theme: {
    darkSelector: '.dark-mode',
    extend: {
      height: {
        28: '7rem'
      },
      screens: {
        xs: '380px',
        '2xl': '1590px'
      },
      container: {
        screens: {
          '2xl': '1280px'
        }
      },
      spacing: {
        72: '18rem',
        80: '20rem',
        96: '96rem'
      }
    }
  },
  variants: {
    backgroundColor: ['hover', 'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
    borderColor: ['hover', 'dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['hover', 'dark', 'dark-hover', 'dark-active'],
    divideColor: ['dark']
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ]
}
