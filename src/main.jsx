
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppRouter from './routes/route.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css'

const theme = createTheme({
  /** Put your mantine theme override here */
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="815218679969-thn30tum9vukbaj84t90qvf4fj6k4r6i.apps.googleusercontent.com">
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <Notifications position='top-right' />
          {/* Your app here */}
            <AppRouter />
        </MantineProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
