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
      window.addEventListener('resize', handleResize);
          return () => {
              window.removeEventListener('resize', handleResize);
          };
  }, []);

  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
      <Box sx={{backgroundColor: darkMode? darkTheme.palette.background.default : lightTheme.palette.background.default}}>
        <div className="App">
          {(width>600)&&<Menu setState={setState} darkTheme={darkMode?darkTheme: lightTheme} />}
          {state===''&&<HomePage user={user} setUser={setUser} />}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
