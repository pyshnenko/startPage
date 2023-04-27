import React, { useState, useEffect } from 'react';
import copy from 'fast-copy';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { setLoadVisible } from '../mech/mechanic';
import { getGrowIn } from '../mech/mechanic';
import { stateSettings } from '../mech/mechanic';
import Grow from '@mui/material/Grow';

const steps = ['Придумай логин', 'Задай пароль', 'О себе', 'e-mail'];

interface indicateState {
    [k: number]: boolean;
}

interface InpData {
    login: string,
    pass: string,
    first_name: string, 
    last_name: string, 
    name: string, 
    email: string 
}

interface inpProps {
    api: any
}

export default function Register({api}: inpProps) {

    let grow = getGrowIn();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<indicateState>({});
    const [error, setError] = useState<indicateState>({});
    const [pass, setPass] = useState<{pass1: string, pass2: string}>({pass1:'', pass2: ''});
    const [ width, setWidth ] = useState<number>(window.innerWidth);
    const [inpData, setInpData] = useState<InpData>({
        login: '',
        pass: '',
        first_name: '', 
        last_name: '', 
        name: '', 
        email: '' 
    })

    useEffect(()=>{
        
        const onKeypress = (e: any) => {
            if (e.code==='Enter') {
                handleNext();
            }
        };
      
        document.addEventListener('keydown', onKeypress);
      
        return () => {
          document.removeEventListener('keydown', onKeypress);
        };

        const handleResize = (event: any) => {
            setWidth(event.target.innerWidth);
        };

        window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
    }, [])

    const ready = () => {
        for (let i=0; i<steps.length; i++) if (!completed[i]) return false
        return true;
    }
    
    const handleNext = () => {
        if (activeStep<steps.length) {
            if (activeStep===0) {
                if (inpData.login==='') handleComplete(false);
                else {
                    setLoadVisible(true);
                    let promis = api.sendPost({login: inpData.login}, 'checkLogin', '');
                    promis.then((res: any)=>{
                        if (res.data.result==='buzy') handleComplete(false);
                        else {
                            handleComplete(true);
                            setActiveStep(activeStep + 1);
                        }
                        setLoadVisible(false);
                    })
                    promis.catch((e: any)=>setLoadVisible(false))
                }
            }
            else if (activeStep===1) {
                if ((pass.pass1.length>=7)&&(pass.pass1===pass.pass2)) {
                    setInpData({...inpData, pass: pass.pass1})
                    handleComplete(true);
                    setActiveStep(activeStep + 1);
                }
                else handleComplete(false);
            }
            else if (activeStep===steps.length-1) {
                console.log('end');
                setLoadVisible(true);
                let sjj = api.sendPost(inpData, 'reg', '' );
                sjj.then((res: any)=>{
                    console.log(res);
                    stateSettings('');
                    setLoadVisible(false);
                })
                sjj.catch((e: any)=>setLoadVisible(false))
            }
            else {
                setActiveStep(activeStep + 1);
                handleComplete(true);
            }
        }
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleComplete = (dat: boolean) => {
        const newCompleted = copy(completed);
        newCompleted[activeStep] = dat;
        setCompleted(newCompleted);
        const newError = copy(error);
        newError[activeStep] = !dat;
        setError(newError);
    };
    
    return (
        <Grow in={grow}>
            <Box sx={{ display: 'flex', margin: 3, justifyContent: 'center' }}>
                {width>800?<Box sx={{ 
                        width: 800, 
                        position: 'relative', 
                        zIndex: 10, 
                        border: '1px solid black', 
                        boxShadow: '0 0 10px black', 
                        borderRadius: '25px', padding: '20px', 
                        backgroundColor: 'white'
                    }}>
                    <Stepper nonLinear activeStep={activeStep} >
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepLabel error={error[index]}>
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep===0&&
                        <Box>
                            <TextField 
                                label={steps[activeStep]} 
                                value={inpData.login} 
                                onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{
                                    setInpData({...inpData, login: evt.target.value})
                                    let buf = copy(error); 
                                    buf[activeStep]=false;
                                    setError(buf);
                                }} 
                                error={error[activeStep]}
                                sx={{ margin: 2}}
                            />
                            {error[activeStep]&&<Typography color="error">{inpData.login===''?'Поле пустое':'Логин занят'}</Typography>}
                        </Box>
                    }
                    {activeStep===1&&
                        <Box>
                            <TextField 
                                label="Придумай пароль"
                                value={pass.pass1} 
                                onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{
                                    setPass({...pass, pass1: evt.target.value})
                                    let buf = copy(error); 
                                    buf[activeStep]=false;
                                    setError(buf);
                                }} 
                                error={error[activeStep]}
                                type="password"
                                sx={{ margin: 2}}
                            />
                            <TextField 
                                label="Повтори пароль"
                                value={pass.pass2} 
                                onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{
                                    setPass({...pass, pass2: evt.target.value})
                                    let buf = copy(error); 
                                    buf[activeStep]=false;
                                    setError(buf);
                                }} 
                                error={error[activeStep]}
                                type="password"
                                sx={{ margin: 2}}
                            />
                            {error[activeStep]&&<Typography color="error">{pass.pass1.length<7?'Пароль слишком короткий':pass.pass1===pass.pass2?'':'Пароли не совпадают'}</Typography>}
                        </Box>
                    }
                    {activeStep===2&&
                        <Box>
                            <TextField 
                                label="Фамилия"
                                value={inpData.last_name} 
                                sx={{ margin: 2}}
                                onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{setInpData({...inpData, last_name: evt.target.value})}}
                            />
                            <TextField 
                                label="Имя"
                                value={inpData.name} 
                                sx={{ margin: 2}}
                                onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{setInpData({...inpData, name: evt.target.value})}}
                            />
                            <TextField 
                                label="Отчество"
                                value={inpData.first_name} 
                                sx={{ margin: 2}}
                                onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{setInpData({...inpData, first_name: evt.target.value})}}
                            />
                        </Box>
                    }
                    {activeStep===3&&
                        <Box>
                            <TextField 
                                label="e-mail"
                                value={inpData.email} 
                                sx={{ margin: 2}}
                                onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{setInpData({...inpData, email: evt.target.value})}}
                            />
                        </Box>
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            variant='contained'
                        >
                            Назад
                        </Button>
                        <Button onClick={handleNext} sx={{ mr: 1 }} disabled={ready()} variant='contained'>
                            {activeStep !== steps.length-1 ? 'Вперед' : 'Готово'}
                        </Button>
                    </Box>
                </Box> :
                <Box>
                    <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step}>
                                    <StepLabel>
                                        {step}
                                    </StepLabel>
                                    <StepContent>
                                        {activeStep===0&&
                                            <Box>
                                                <TextField 
                                                    label={steps[activeStep]} 
                                                    value={inpData.login} 
                                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{
                                                        setInpData({...inpData, login: evt.target.value});
                                                        let buf = copy(error); 
                                                        buf[activeStep]=false;
                                                        setError(buf);
                                                    }} 
                                                    error={error[activeStep]}
                                                    sx={{ margin: 2}}
                                                />
                                                {error[activeStep]&&<Typography color="error">{inpData.login===''?'Поле пустое':'Логин занят'}</Typography>}
                                            </Box>
                                        }
                                        {activeStep===1&&
                                            <Box>
                                                <TextField 
                                                    label="Придумай пароль"
                                                    value={pass.pass1} 
                                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{
                                                        setPass({...pass, pass1: evt.target.value})
                                                        let buf = copy(error); 
                                                        buf[activeStep]=false;
                                                        setError(buf);
                                                    }} 
                                                    error={error[activeStep]}
                                                    type="password"
                                                    sx={{ margin: 2}}
                                                />
                                                <TextField 
                                                    label="Повтори пароль"
                                                    value={pass.pass2} 
                                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{
                                                        setPass({...pass, pass2: evt.target.value})
                                                        let buf = copy(error); 
                                                        buf[activeStep]=false;
                                                        setError(buf);
                                                    }} 
                                                    error={error[activeStep]}
                                                    type="password"
                                                    sx={{ margin: 2}}
                                                />
                                                {error[activeStep]&&<Typography color="error">{pass.pass1.length<7?'Пароль слишком короткий':pass.pass1===pass.pass2?'':'Пароли не совпадают'}</Typography>}
                                            </Box>
                                        }
                                        {activeStep===2&&
                                            <Box>
                                                <TextField 
                                                    label="Фамилия"
                                                    value={inpData.last_name} 
                                                    sx={{ margin: 2}}
                                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{setInpData({...inpData, last_name: evt.target.value})}}
                                                />
                                                <TextField 
                                                    label="Имя"
                                                    value={inpData.name} 
                                                    sx={{ margin: 2}}
                                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{setInpData({...inpData, name: evt.target.value})}}
                                                />
                                                <TextField 
                                                    label="Отчество"
                                                    value={inpData.first_name} 
                                                    sx={{ margin: 2}}
                                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{setInpData({...inpData, first_name: evt.target.value})}}
                                                />
                                            </Box>
                                        }
                                        {activeStep===3&&
                                            <Box>
                                                <TextField 
                                                    label="e-mail"
                                                    value={inpData.email} 
                                                    sx={{ margin: 2}}
                                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{setInpData({...inpData, email: evt.target.value})}}
                                                />
                                            </Box>
                                        }
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', pt: 2 }}>
                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                                variant='contained'
                                            >
                                                Назад
                                            </Button>
                                            <Button onClick={handleNext} sx={{ mr: 1 }} disabled={ready()} variant='contained'>
                                                {activeStep !== steps.length-1 ? 'Вперед' : 'Готово'}
                                            </Button>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>    
                </Box>}
            </Box>
        </Grow>
    );
}