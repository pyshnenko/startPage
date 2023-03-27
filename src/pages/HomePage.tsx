import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { blueGrey, grey, lightBlue, red, yellow, green } from '@mui/material/colors';
import {getGrowIn} from '../mech/mechanic';
import {stateSettings} from '../mech/mechanic';

interface InpData {
    setUser: (value: any) => void,
    user: any,
    api: any,
    darkMode: boolean,
    width: number,
    setLogin: (val: boolean) => void,
    login: boolean
};

interface EdData {
    activate: boolean, 
    name: string, 
    first_name: string, 
    last_name: string, 
    email: string, 
    telegram: string
}

interface EdDataSend {
    name: string, 
    first_name: string, 
    last_name: string, 
    email: string, 
    telegram: string
}

const styleText = { 
    central: { 
        display: 'flex', 
        alignItems: 'center' 
    }, 
    name: { 
        color: lightBlue[800], 
        marginRight: '10px' 
    }, 
    nameLow: { 
        color: lightBlue[800], 
        marginRight: '10px',
        fontSize: 'medium'
    }, 
    text: {}, 
    textLow: {
        fontSize: 'medium'
    }};

const textFields = [ 
    {text: 'Логин:', index: 'login'}, 
    {text: 'Имя:', index: 'name'}, 
    {text: 'Фамилия:', index: 'last_name'}, 
    {text: 'Отчество:', index: 'first_name'}, 
    {text: 'Почта:', index: 'email'}, 
    {text: 'telegram:', index: 'telegram'} 
]
  

export default function Menu({setUser, user, api, darkMode, width, setLogin, login}: InpData) {
    let grow = getGrowIn();

    const [ edit, setEdit ] = useState<any>({activate: false, name: user.name, first_name: user.first_name, last_name: user.last_name, email: user.email, telegram: user.telegram})

    const handleEditClick = () => {
        console.log('click');
        let buf = {...edit};
        buf.activate=!edit.activate;
        setEdit(buf);
    }

    const handleClick = async (event: any) => {
        let data = new FormData();
        data.append('file', event.target.files[0]);
        const options = {
            method: 'POST',
            headers: {
                login: encodeURI(user.login),
                fname: encodeURI(event.target.files[0].name)
            },
            body: data,
        }
        const response = await fetch('https://spamigor.site/apiUpload', options);
        const res = await response.json();        
        let result = await api.sendPost({avatar: `https://spamigor.site/${res.addr}`}, 'updUserData', `Bearer ${user.token}`);
        console.log(result.data.data[0]);
        setUser(result.data.data[0]);
    }

    const handleEditClickCheck = async () => {
        console.log('ready');
        let bufS: EdDataSend = {...edit};
        let res = await api.sendPost(bufS, 'updUserData', `Bearer ${user.token}`);
        setUser(res.data.data[0]);
        setEdit({activate: false, name: user.name, first_name: user.first_name, last_name: user.last_name, email: user.email, telegram: user.telegram});
        console.log(res);
    }

    const handleValidClick = async (evt: any, index: string) => {
        console.log('valid');
        if (index==='email') {
            console.log(await api.sendPost({}, 'checkMail', `Bearer ${user.token}`));
        }
        else if (index==='telegram') {
            let res = await api.sendPost({}, 'tgCheck', `Bearer ${user.token}`);
            if (res.status===200) {
                let buf = {...user};
                buf.telegramValid=true;
                setUser(buf);
            }
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {login&&<Grow in={grow}>
                <Paper sx={{margin: 3, padding: 2, mwxWidth: 800}} elevation={12}>
                    <Box sx={{ display: 'flex', flexDirection: width>500?'row':'column' }}>
                        <Box sx={{ margin: width>500?"0 25px 0 0":'0 0 20px 0' }}>
                            <IconButton color="primary" component="label">
                                <input hidden accept="image/*" type="file" onChange={handleClick} />
                                <Avatar
                                    alt={(user.first_name+' '+user.last_name).toLocaleUpperCase()}
                                    src={user.avatar ? user.avatar : ''}
                                    sx={{ width: 50, height: 50, backgroundColor: user.avatar ? blueGrey[900] : grey[200], color: grey[800], fontSize: 'x-large', zoom: 3, boxShadow: `0 0 4px ${darkMode?'gainsboro':'black'}` }}
                                >{user.avatar ? '' : ((user.name ? user.name[0] : 'ъ')+(user.last_name ? user.last_name[0] : 'Ъ')).toLocaleUpperCase()}</Avatar>
                            </IconButton>                    
                            <Typography variant="h5" gutterBottom>{user.role}</Typography>                            
                            <Button variant="outlined" startIcon={<LogoutIcon />} color="primary" onClick={()=>{
                                    setLogin(false); 
                                }}>
                                Выйти
                            </Button>
                        </Box>
                        <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'nowrap',
                            alignItems: 'flex-start',
                            padding: width<500?'10px':'30px',
                            borderRadius: '30px',
                            boxShadow: '0 0 5px #121212',
                            backgroundColor: darkMode ? grey[800]:'white',
                        }}>
                            {textFields.map((dat)=>{ return (
                                <Box key={dat.index} sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Box sx={styleText.central}>
                                        {(!edit.activate||dat.index==='login'||dat.index==='telegram')&&<Typography sx={styleText[width<500?'nameLow':'name']} variant={width<500?"h6":"h5"} gutterBottom>{dat.text}</Typography>}
                                        {edit.activate&&dat.index!=='login'&&dat.index!=='telegram' ? 
                                            <TextField sx={{ margin: 1 }} label={dat.text} value={edit[dat.index] as string} onChange={({ target }:{target: {value: string}}) => {
                                                let resObj: any = { ...edit };
                                                resObj[dat.index] = target.value;
                                                setEdit(resObj)}} variant="standard" /> : 
                                            (dat.index!=='telegram'||(dat.index==='telegram'&&(user[dat.index]!==''||(user.telegramID))))&&<Typography sx={styleText[width<500?'textLow':'text']} variant={width<500?"h6":"h5"} gutterBottom>
                                                {dat.index==='telegram' ? (user.telegram==='' ? user.telegramID : user.telegram) : user[dat.index]}
                                            </Typography>}
                                        {!edit.activate&&((dat.index==='email'&&(user.emailValid))||(dat.index==='telegram'&&(user[dat.index]!==''||(user.telegramID))&&(user.telegramValid)))&&
                                            <CheckIcon sx={{ color: green[500]}} />}
                                        {!edit.activate&&((dat.index==='email'&&(!user.emailValid))||(dat.index==='telegram'&&(user[dat.index]!==''||(user.telegramID!==0))&&(!user.telegramValid)))&&
                                            <IconButton component="label" onClick={(event)=>handleValidClick(event, dat.index)}>
                                                <CloseIcon sx={{ color: red[500]}} /> 
                                            </IconButton>}
                                    </Box>
                                    <Box>
                                        {dat.index==='login'&&edit.activate&&<IconButton sx={{color: yellow[800]}} component="label" onClick={handleEditClickCheck}>
                                            <CheckIcon sx={{ color: green[500]}} />
                                        </IconButton>}
                                        {dat.index==='login'&&<IconButton sx={{color: yellow[800]}} component="label" onClick={handleEditClick}>
                                            {edit.activate ? <CloseIcon sx={{ color: red[500]}} /> : <ModeEditIcon />}
                                        </IconButton>}
                                    </Box>
                                </Box>
                            )})}
                        </Box>
                    </Box>
                </Paper>
            </Grow>}
        </div>
    );
}