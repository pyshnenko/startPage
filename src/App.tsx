import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './helpers/menu';
import ColorModeButton from './helpers/colorModeButton';
import HomePage from './pages/HomePage';
import About from './pages/About';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import sApi from './mech/api';
import SingInPage from './pages/SingInPage';
const url = 'https://spamigor.site/api';

const api = new sApi(url);

function App() {

  const [ state, setState ] = useState<string>('');
  const [ width, setWidth ] = useState<number>(window.innerWidth);
  const [ user, setUser ] = useState({});
  const [ darkMode, setDarkMode ] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      let done = params.get('page');
      if (done) setState(done);

      const handleResize = (event: any) => {
          setWidth(event.target.innerWidth);
      };

      const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleSetTheme = (theme: boolean) => {
        console.log(theme);
        setDarkMode(theme)
      }

      themeMediaQuery.addEventListener('change', function (event) {
        handleSetTheme(event.matches)
      })

      window.addEventListener('resize', handleResize);
          return () => {
              window.removeEventListener('resize', handleResize);
          };
  }, []);

  
  const darkTheme = createTheme({
    palette: {
      mode: darkMode?'dark':'light',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{backgroundColor: darkTheme.palette.background.default }}>
        <div className="App">
          <Menu width={width} setState={setState} darkTheme={darkTheme} />
          <ColorModeButton width={width} darkMode={darkMode} setDarkMode={setDarkMode} />
          {state===''&&<SingInPage state={state} setState={setState} setUser={setUser} user={user} api={api} />}
          {state==='home'&&<HomePage user={user} setUser={setUser} />}
          {state==='about'&&<About darkMode={darkMode} width={width} />}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
