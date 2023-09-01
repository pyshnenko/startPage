import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import '../styles/filesStyle.css';
import CircularProgress from '@mui/material/CircularProgress';
import CyrillicToTranslit from 'cyrillic-to-translit-js';

const cyrillicToTranslit = new (CyrillicToTranslit as any)();

const actions = [
    { icon: <ImageIcon />, name: 'Изображение' },
    { icon: <FileCopyIcon />, name: 'Документ' }
];

interface inpDat {
    recipient: string, 
    darkMode: boolean, 
    sendMess:(
        text: string, 
        iBuf: any, 
        user: string
    )=>void,
    sendStatus: boolean,
    setSendStatus:(st: boolean)=>void
}

export default function FileButton({recipient, darkMode, sendMess, sendStatus, setSendStatus}:inpDat) {
    const [ sendCount, setSendCount ] = useState<number>(0);
    const [ sendTotal, setSendTotal ] = useState<number>(0);

    const trig = useRef<Boolean>(true);

    const loadController = new AbortController();  
        
    const onKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Escape') 
            if (sendStatus) {
                loadController.abort();
                setSendStatus(false)
            }
    }; 

    const onAbort = () => {
        console.log('abort'); 
    }

    useEffect(()=>{
        if (trig.current) {
            //trig.current = false;
            console.log('effect')
            loadController.signal.addEventListener('abort', onAbort);

            document.addEventListener('keyup', onKeyUp);
            
            return () => {
                loadController.signal.removeEventListener('abort', onAbort);
                document.removeEventListener('keyup', onKeyUp);
            };
        }
    }, [])

    const attFile = async (mode: string) => {
        console.log(mode);
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = mode===actions[0].name?'image/*':'application/*';
        input.multiple = true;
        input.onchange = async (e: any) => {
            setSendStatus(true);
            let files = e.target.files;
            setSendTotal(files.length);
            for (let i = 0; i<files.length; i++) {
                console.log(cyrillicToTranslit.transform(files[i].name, "_"));
                let data = new FormData();
                data.append('file', files[i]);
                const options = {
                    method: 'POST',
                    headers: {
                        login: encodeURI(recipient),
                        fname: encodeURI(cyrillicToTranslit.transform(files[i].name, "_")),
                        mode: 'chat',
                        ftype: mode===actions[0].name?'image':'document'
                    },
                    body: data,
                    signal: loadController.signal
                }                
                const response = await fetch('https://spamigor.ru/apiChat', options);
                const res = await response.json();
                console.log(res);
                sendMess(`${mode===actions[0].name?'img:':'doc:'}|https://spamigor.ru/${encodeURI(res.addr)}`, null, recipient);
                setSendCount(i+1);
            }
            setSendCount(0);
            setSendStatus(false);
            setSendTotal(0);
        }
        
        input.click();

    }

    return (
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <Box sx={{ position: 'relative', height: sendStatus?62:320, top: '12px', left: '-10px' }}>
                {sendStatus?<CircularProgress variant={sendCount!==0?"determinate":'indeterminate'} value={sendCount/(sendTotal||1)} />:
                <SpeedDial
                    ariaLabel="AttachFileIcon"
                    icon={<AttachFileIcon sx={{ color: darkMode?'white':'black' }} />}
                    id={darkMode?'filesButtonB':'filesButtonW'}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={()=>attFile(action.name)}                            
                        />
                    ))}
                </SpeedDial>}
            </Box>
        </Box>
    );
}