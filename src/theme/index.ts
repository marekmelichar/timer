import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import palette from './palette'
import typography from './typography'

// Create theme
const intermediateTheme = createTheme({
  palette,
  typography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          fontWeight: 600,
          border: `2px solid ${palette.primary.main}`,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: palette.primary.dark,
            borderColor: palette.primary.dark,
            color: palette.primary.contrastText,
          },
        },
      },
    },
  },
})

// Generate responsive typography based on visual breakpoints
const theme = responsiveFontSizes(intermediateTheme, {})

export default theme
