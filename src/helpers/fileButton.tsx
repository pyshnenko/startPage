import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import '../styles/filesStyle.css';

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
    )=>void}

export default function FileButton({recipient, darkMode, sendMess}:inpDat) {

    const attFile = async (mode: string) => {
        console.log(mode);
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = mode===actions[0].name?'image/*':'application/*';
        input.multiple = true;
        input.onchange = async (e: any) => { 
            let files = e.target.files;
            for (let i = 0; i<files.length; i++) {
                let data = new FormData();
                data.append('file', files[i]);
                const options = {
                    method: 'POST',
                    headers: {
                        login: encodeURI(recipient),
                        fname: encodeURI(files[i].name),
                        mode: 'chat',
                        ftype: mode===actions[0].name?'image':'document'
                    },
                    body: data,
                }                
                const response = await fetch('https://spamigor.site/apiChat', options);
                const res = await response.json();
                console.log(res);
                sendMess(`${mode===actions[0].name?'img:':'doc:'}|https://spamigor.site/${res.addr}`, null, recipient);
            }
        }
        
        input.click();

    }

    return (
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <Box sx={{ position: 'relative', height: 320, top: '12px', left: '-10px' }}>
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
                </SpeedDial>
            </Box>
        </Box>
    );
}