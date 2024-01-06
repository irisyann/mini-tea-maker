// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const customTheme = {
  dark: true,
  colors: {
    primary: '#633000',
  },
}

export default createVuetify(
  {
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme,
      },
    },
  }
)
