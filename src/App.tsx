import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './helpers/menu';
import HomePage from './pages/HomePage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

function App() {

  const [ state, setState ] = useState<String>('');
  const [ width, setWidth ] = useState<number>(window.innerWidth);
  const [ user, setUser ] = useState({});
  const [ darkMode, setDarkMode ] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
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
          {state===''&&<HomePage user={user} setUser={setUser} />}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
