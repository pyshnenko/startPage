import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './styles/blW.css';
import './styles/neon.css';
import Menu from './helpers/menu';
import ColorModeButton from './helpers/colorModeButton';
import Loading from './helpers/loading';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Settings from './pages/Settings';
import OldPage from './pages/OldPage';
import Register from './pages/Register';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import sApi from './mech/api';
import SingInPage from './pages/SingInPage';
import {setParams, stateSettings, setLoadParams, loadTypes} from './mech/mechanic';
import ChatPlace from './helpers/chatPlace';
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
  const [ growIn, setGrowIn ] = useState(true);
  const [ loadState, setLoadState ] = useState(false);
  const [ growState, setLoadGrow ] = useState(true);
  const [ loadingMode, setLoadingMode ] = useState(0);
  const [ neonOn, setNeonOn ] = useState(true);
  const trig = useRef<boolean>(true)
  let stateSetter = setParams(setState, state, 500, growIn, setGrowIn);
  let loadOptions = setLoadParams({loadState, growState, setLoadState, setLoadGrow})

  useEffect(() => {
      if (trig.current) {
        trig.current = false;
        //обработка локального хранилища
        let locData: string  = '';
        locData += localStorage.getItem('listGNeon');
        if (locData==='false') setNeonOn(false);
        else setNeonOn(true);
        locData='';
        locData += localStorage.getItem('listGColorMode');
        if (locData==='dark') setDarkMode(true);
        else if (locData==='light') setDarkMode(false);
        locData='';
        locData += localStorage.getItem('listGLoadMode');
        if (locData!=='null' && locData!==null && locData !== '') {
          let mode = Number(locData);
          if (mode||mode===0) setLoadingMode(mode);
        }
        locData='';
        locData += localStorage.getItem('listGState');
        console.log(locData)
        if (locData!=='null' && locData!==null && locData !== '') {
          let buf: {login: boolean, state: string};
          buf = JSON.parse(locData);
          locData = '';
          locData += localStorage.getItem('listToken');
          if (locData!=='') {
            if (!login) {
              console.log('upD');
              loadOptions(true);
              const answ = api.sendPost({}, 'login', `Bearer ${locData}`);
              answ.then((res: any)=>{
                if (res?.status!==200) {
                  setLogin(false);
                  setToken('');
                  setUser({});
                  stateSetter('');
                  localStorage.clear();
                  loadOptions(false);
                }
                else {
                  setUser(res.data.data[0]);
                  stateSetter(buf.state);
                  setToken(locData);
                  setLogin(true);
                  console.log('data upd');
                  loadOptions(false);
                }
              })
            }
          }
        }
        //обработка параметров из uri
        const params = new URLSearchParams(window.location.search);
        let done = params.get('page');
        if (done) stateSetter(done);
      }
      //параметры отображения
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
    console.log(state);
    if (login) {
      if (state==='') stateSettings('home');
      else {
        let sBuf: {login: boolean, state: string} = {login: login, state: state};
        localStorage.setItem('listGState', JSON.stringify(sBuf))
      }
    }
    else {
      if (state==='home') stateSettings('');
    }
  }, [state]);

  useEffect(()=>{
    if ((token!=='')&&(!login)) {
      setUser({}); 
      setToken('');
      stateSettings('');
      localStorage.setItem('listToken', '')
      localStorage.setItem('listGState', JSON.stringify({login: false, state: ''}))
    }
  }, [login])
  
  const darkTheme = createTheme({
    palette: {
      mode: darkMode?'dark':'light',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{backgroundColor: darkTheme.palette.background.default }}>
        {loadState&&<Loading mode={loadingMode} demo={false} />}
        {visual&&<Box id="black"></Box>}
        <div className="App">
          {neonOn&&
            <div id="neonDiv">
              <h2 id={darkMode?"neonH2F":"neonH2FW"}>Д</h2>
              <h2 id={darkMode?"neonH2":"neonH2W"}>ызыг</h2>
              <h2 id={darkMode?"neonH2l":"neonH2lW"}>н</h2>
            </div>}
          {true&&<Menu width={width} darkTheme={darkTheme} login={login} setLogin={setLogin} user={user} />}
          <ColorModeButton width={width} darkMode={darkMode} setDarkMode={setDarkMode} visual={visual} setVisual={setVisual} />
          <div style={{position: 'relative'}}>
            {state===''&&<SingInPage setUser={setUser} user={user} api={api} setLogin={setLogin} />}
            {state==='home'&&login&&<HomePage user={user} setUser={setUser} api={api} darkMode={darkMode} width={width} login={login} setLogin={setLogin} />}
            {state==='old'&&<OldPage darkMode={darkMode} />}
            {state==='register'&&<Register api={api} />}
            {state==='about'&&<About darkMode={darkMode} width={width} user={user} login={login} api={api} />}
            {state==='settings'&&<Settings loadingMode={loadingMode} setLoadingMode={setLoadingMode} darkMode={darkMode} setDarkMode={setDarkMode} neonOn={neonOn} setNeonOn={setNeonOn} />}
          </div>
        </div>
        {login&&<ChatPlace darkMode={darkMode} user={user} login={login} api={api} />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
