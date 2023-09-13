import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

export default function ImageFolder({setVisible, img}: {setVisible: (val: {visible: boolean, img: string}) => void, img: string}) {
    const [ growIn, setGrowIn ] = useState<boolean>(true);

    const trig = useRef<boolean>(true);

    const onKeyUp = (e: KeyboardEvent)=> {
        if (e.code === 'Escape') 
        {            
            setGrowIn(false);
            setTimeout(setVisible,1000,{visible: false, img: ''})
        }
    }

    useEffect(()=>{
        if (trig.current) {

            document.addEventListener('keyup', onKeyUp);
            
            return () => {
                document.removeEventListener('keyup', onKeyUp);
            };
        }
    }, [])
    
    return (
        <Fade in={growIn}>
            <Box sx={{ 
                    position: 'fixed', 
                    width: '100vw', 
                    height: '100vh',
                    top: 0,
                    left: 0,
                    margin: '0',
                    zIndex: 9990, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                }}>
                <Box sx={{ 
                        position: 'fixed', 
                        width: '100vw', 
                        height: '100vh',
                        top: 0,
                        left: 0,
                        backgroundColor: '#080808', 
                        boxShadow: `0 0 100vh #080808`,
                        zIndex: 9991,
                        opacity: 0.85
                    }}
                    onClick={()=>{
                        setGrowIn(false);
                        setTimeout(setVisible,1000,{visible: false, img: ''})
                    }}>
                </Box>
                <img style={{ zIndex:9992, maxWidth:'80%' }} className="bigImg" id="openImg" src={img} />
            </Box>
        </Fade>
    );
}