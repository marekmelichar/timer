import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack';
import { CssBaseline, IconButton, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { App } from './App';
import '@/i18n';
import store from './store';
import theme from './theme';

declare module '@mui/material/styles' {
  interface Palette {
    accepted: {
      main: string;
      light: string;
    };
  }
}

// INFO: declaration is in /env.js
declare global {
  // tslint:disable-next-line
  interface Window {
    BASE_API_URL: string;
  }
}

const queryClient = new QueryClient();

function SnackbarCloseButton({ snackbarKey }: { snackbarKey: SnackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return <IconButton onClick={() => closeSnackbar(snackbarKey)}></IconButton>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* Suspense added as requirement of react-i18next useTranslation hook */}
      <React.Suspense fallback="Loading...">
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Provider store={store}>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
              >
                <App />
              </SnackbarProvider>
            </Provider>
          </ThemeProvider>
        </StyledEngineProvider>
      </React.Suspense>
    </QueryClientProvider>
  </React.StrictMode>,
);
