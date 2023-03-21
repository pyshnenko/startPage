import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface InpData {
    state: string,
    setState: (value: string) => void,
    setUser: (value: object) => void,
    user: object,
    api: any
};
  

export default function SingInPage({state, setState, setUser, user, api}: InpData) {

    const [ logData, setLogData ] = useState<{login: string, pass: string}>({login: '', pass: ''});
    const [ errorMess, setErrorMess ] = useState<boolean>(false);
    const [ errorNet, setErrorNet ] = useState<boolean>(false);

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
            let res = api.sendPost(data, 'login', '');
            res.then((result: {status: number})=>{
                console.log(result);
                if (result.status===200) {
                    console.log(result);
                    setState('home');
                }
                else setErrorMess(true);
            });
            res.catch((e: any)=>{
                console.log('netErr');
            })
        }
      
    }

    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Paper sx={{margin: 3, padding: 2, width: '300px'}} elevation={12}>
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
                            <Button onClick={() => setState('register')} sx={{margin:1}} color="primary" variant="contained">Регистрация</Button>
                        </Box>
                            <Button onClick={() => setState('unlog')} color="secondary" variant="outlined">Гостевой режим</Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}