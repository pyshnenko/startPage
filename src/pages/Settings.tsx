import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import {getGrowIn} from '../mech/mechanic';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Loading from '../helpers/loading';

export default function Settings({loadingMode, setLoadingMode, darkMode}: {loadingMode: number, setLoadingMode: (val: number)=>void, darkMode: boolean}) {
    let grow = getGrowIn();
    
    return (
        <Grow in={grow}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ color: darkMode?'white':'black', margin: '20px' }}>Настройки</Typography>
                <Box sx={{ width: '90%', maxWidth:400, minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Выбери индикатор загрузки
                        </InputLabel>
                        <NativeSelect
                            defaultValue={loadingMode}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                            onChange={({target}: any)=>{
                                console.log(typeof(target.value));
                                setLoadingMode(Number(target.value));
                                localStorage.setItem('listGLoadMode', target.value)
                            }}
                        >
                            <option value={0}>Простой</option>
                            <option value={1}>Цветной</option>
                            <option value={2}>Прикольный</option>
                        </NativeSelect>
                    </FormControl>
                </Box>
                <Box sx={{ 
                        backgroundColor: darkMode?'#686868':'transparent', 
                        margin: '10px',
                        boxShadow: darkMode?'0 0 10px #686868':'none',
                        borderRadius: '20px',
                        padding: '20px' 
                    }}>
                    <Loading mode={loadingMode} demo={true} />
                </Box>
            </Box>
        </Grow>
    );
}