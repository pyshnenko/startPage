import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/blW.css';
import Menu from './helpers/menu';
import ColorModeButton from './helpers/colorModeButton';
import HomePage from './pages/HomePage';
import About from './pages/About';
import OldPage from './pages/OldPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import sApi from './mech/api';
import SingInPage from './pages/SingInPage';
const url = 'https://spamigor.site/api';

const api = new sApi(url);

function App() {

  const [ state, setState ] = useState<string>('');
  const [ width, setWidth ] = useState<number>(window.innerWidth);
  const [ user, setUser ] = useState<any>();
  const [ darkMode, setDarkMode ] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [ visual , setVisual ] = useState(false);
  const [ token , setToken ] = useState('');
  const [ login, setLogin ] = useState(false);

  useEffect(() => {
      let locData: string  = '';

      locData += localStorage.getItem('listGState');
      console.log(locData)
      if (locData!=='null' && locData!==null && locData !== '') {
        let buf: {login: boolean, state: string};
        buf = JSON.parse(locData);
        if (buf.login) {
          setState(buf.state)
        }
        locData = '';
        locData += localStorage.getItem('listToken');
        if (locData!=='') {
          setToken(locData);
        }
      }

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

  useEffect(()=>{
    if (login) {
      let sBuf: {login: boolean, state: string} = {login: login, state: state};
      localStorage.setItem('listGState', JSON.stringify(sBuf))
    }
  }, [state])
  
  const darkTheme = createTheme({
    palette: {
      mode: darkMode?'dark':'light',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{backgroundColor: darkTheme.palette.background.default }}>
        {visual&&<Box id="black"></Box>}
        <div className="App">
          <Menu width={width} setState={setState} darkTheme={darkTheme} login={login} setLogin={setLogin} />
          <ColorModeButton width={width} darkMode={darkMode} setDarkMode={setDarkMode} visual={visual} setVisual={setVisual} />
          {state===''&&<SingInPage state={state} setState={setState} setUser={setUser} user={user} api={api} setLogin={setLogin} />}
          {state==='home'&&<HomePage user={user} setUser={setUser} />}
          {state==='old'&&<OldPage darkMode={darkMode} width={width} />}
          {state==='about'&&<About darkMode={darkMode} width={width} />}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
