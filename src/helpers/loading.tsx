import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import { getLoadVisible, loadTypes } from '../mech/mechanic';
import '../styles/hueh.css';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function Loading({mode, demo}: {mode: number, demo: boolean}) {
    const theme = useTheme();

    const options: loadTypes = getLoadVisible();
//options.growState}>
    return (
        <Box sx={{ 
                position: demo?'relative':'fixed', 
                width: demo?'120px':'100vw', 
                height: demo?'120px':'100vh',
                margin: demo?'20px':'0',
                zIndex: 9999, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
            }}>
            {!demo&&<Box id={options.growState?"loadingOpacityIn":"loadingOpacityOut"} sx={{ 
                    backgroundColor: mode===0?'white':'black', 
                    boxShadow: `0 0 500px ${mode===0?'white':'black'}`,
                    opacity: '0.5', 
                    width: '100vw', 
                    height: '100vh', 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    zIndex: 10000 
                }}></Box>}              
            {mode===2&&<Grow in={(options.growState||demo)}>
                <Box sx={{ 
                        width: '20vw', 
                        height: '20vw', 
                        backgroundColor: theme.palette.mode==='dark'?'#080808':'white', 
                        border: `2px solid ${theme.palette.mode==='dark'?'#CCCCCC':'#333333'}`, 
                        boxShadow: `0 0 5px ${theme.palette.mode==='dark'?'#CCCCCC':'#333333'}`,
                        borderRadius: '10px', 
                        position: 'relative', 
                        zIndex: 10010,                        
                        maxWidth: '120px',
                        maxHeight: '120px',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <img className="images" id="image1" src="https://spamigor.ru/fiches/3/huehuyz.png" />
                </Box>
            </Grow>}           
            {mode===1&&<Grow in={(options.growState||demo)}>
                <div className="sqr"></div>
            </Grow>}
            {mode===0&&<Grow in={(options.growState||demo)}>
                <span className={theme.palette.mode==='dark'?"loaderBl":"loaderWh"}></span>
            </Grow>}
        </Box>
    );
}