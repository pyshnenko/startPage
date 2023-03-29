import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import {getGrowIn} from '../mech/mechanic';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Loading from '../helpers/loading';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface InpProps {
    loadingMode: number, 
    setLoadingMode: (val: number)=>void, 
    darkMode: boolean,
    setDarkMode: (val: boolean)=>void,
    neonOn: boolean,
    setNeonOn: (val: boolean)=>void
}

export default function Settings({loadingMode, setLoadingMode, darkMode, setDarkMode, neonOn, setNeonOn}: InpProps) {
    let grow = getGrowIn();
    
    return (
        <Grow in={grow}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ color: darkMode?'white':'black', margin: '20px' }}>Настройки</Typography>
                <Box sx={{ width: '90%', 
                        maxWidth:600, 
                        minWidth: 100,
                        border: '2px solid dimgray',
                        boxShadow: '0 0 10px dimgrey',
                        borderRadius: '50px' }}>
                    <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box sx={{ margin: '10px 0 20px 0' }}>
                            <InputLabel sx={{ position: 'relative' }} id="demo-simple-select-standard-label">Выбери индикатор загрузки</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                defaultValue={String(loadingMode)}
                                sx={{
                                    width: 200
                                }}
                                onChange={({target}: SelectChangeEvent)=>{
                                    console.log(typeof(target.value));
                                    setLoadingMode(Number(target.value));
                                    localStorage.setItem('listGLoadMode', target.value)
                                }}
                            >
                                <MenuItem value={0}>Простой</MenuItem>
                                <MenuItem value={1}>Цветной</MenuItem>
                                <MenuItem value={2}>Прикольный</MenuItem>
                            </Select>
                        </Box>
                        <Box sx={{ 
                                backgroundColor: darkMode?'#686868':'transparent', 
                                margin: '20px 20px 20px 0',
                                boxShadow: darkMode?'0 0 10px #686868':'none',
                                borderRadius: '20px',
                                zoom: 0.5,
                                zIndex: 0
                            }}>
                            <Loading mode={loadingMode} demo={true} />
                        </Box>
                    </Box>
                    <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box sx={{ margin: '10px 0 20px 0' }}>
                            <InputLabel sx={{ position: 'relative' }} id="demo-simple-select-standard-label">Выбери цветовую палитру</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                defaultValue={localStorage.getItem('listGColorMode')||'auto'}
                                sx={{
                                    width: 200
                                }}
                                onChange={({target}: SelectChangeEvent)=>{
                                    localStorage.setItem('listGColorMode', target.value);
                                    switch (target.value) {
                                        case 'auto' : {setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches); break}
                                        case 'dark' : {setDarkMode(true); break}
                                        case 'light' : {setDarkMode(false); break}
                                    }
                                }}
                            >
                                <MenuItem value={'auto'}>Авто</MenuItem>
                                <MenuItem value={'dark'}>Темная</MenuItem>
                                <MenuItem value={'light'}>Светлая</MenuItem>
                            </Select>
                        </Box>
                        <Box sx={{ 
                                margin: '20px 20px 20px 0',
                                width: 80,
                                zIndex: 0
                            }}>
                        </Box>
                    </Box>
                    <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>          
                        <FormControlLabel sx={{ color: darkMode?'white':'black' }} control={
                            <Switch 
                                checked={neonOn}
                                onChange={(event: any)=>{
                                    console.log(event.target.checked);
                                    setNeonOn(event.target.checked);
                                    localStorage.setItem('listGNeon', String(event.target.checked))
                                }} />} 
                            label="Логотип" 
                        />
                    </Box>
                </Box>
            </Box>
        </Grow>
    );
}