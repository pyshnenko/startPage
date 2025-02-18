import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import {getGrowIn} from '../mech/mechanic';
import { stateSettings } from '../mech/mechanic';
import { setLoadVisible } from '../mech/mechanic';

interface InpData {
    setLogin: (value: boolean) => void,
    setUser: (value: any) => void,
    user: object,
    api: any
};
  

export default function SingInPage({setLogin, setUser, user, api}: InpData) {

    const [ logData, setLogData ] = useState<{login: string, pass: string}>({login: '', pass: ''});
    const [ errorMess, setErrorMess ] = useState<boolean>(false);
    const [ errorNet, setErrorNet ] = useState<boolean>(false);
    let grow = getGrowIn();

    const formData = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();

        const form = new FormData(event.currentTarget);
    
        const data = {
            login: form.get('login'),
            pass: form.get('pass')
        };

        console.log(data);
        if (!data.login||!data.pass) setErrorMess(true);
        else {
            setErrorMess(false);
            setLoadVisible(true);
            let res = api.sendPost(data, 'login', '');
            res.then((result: {status: number, data: {token: string, data: any}})=>{
                if (result.status===200) {
                    setUser(result.data.data[0]);
                    localStorage.setItem('listToken', result.data.token);
                    localStorage.setItem('listGState', JSON.stringify({login: true, state: 'home'}));
                    stateSettings('home');
                    setLogin(true);
                }
                else setErrorMess(true);
                setLoadVisible(false);
            });
            res.catch((e: any)=>{
                console.log('netErr');
                setLoadVisible(false);
            })
        }
      
    }

    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Grow in={grow}>
                <Paper sx={{margin: 3, padding: 2, width: '300px'}} elevation={12}>
                    <Box component="form" id='guestForm' onSubmit={formData} display={'none'}>
                        <TextField error={errorMess} value={"guest"} label="Логин" variant="standard" name='login' />
                        <TextField error={errorMess} value={"12345678"} type="password" label="Пароль" variant="standard" name='pass' />
                    </Box>
                    <Box component="form" onSubmit={formData}>
                        {errorMess&&<Typography sx={{color: 'red'}}>Некорректные данные</Typography>}
                        {errorNet&&<Typography sx={{color: 'red'}}>Нет интернета</Typography>}
                        {!errorMess&&<Typography>Давай авторизуемся</Typography>}
                        <Box>
                            <TextField error={errorMess} label="Логин" variant="standard" name='login' />
                            <TextField error={errorMess} type="password" label="Пароль" variant="standard" name='pass' />
                        </Box>
                        <Box>
                            <Box>
                                <Button type='submit' sx={{margin:1}} color="success" variant="contained">Вход</Button>
                                <Button onClick={() => stateSettings('register')} sx={{margin:1}} color="primary" variant="contained">Регистрация</Button>
                            </Box>
                                <Button type='submit' form="guestForm" id="guest" name="guest" color="secondary" variant="outlined">Гостевой режим</Button>
                        </Box>
                    </Box>
                </Paper>
            </Grow>
        </Box>
    );
}