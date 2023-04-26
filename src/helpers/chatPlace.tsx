import React, { useState, useEffect, useRef } from 'react';
import copy from 'fast-copy';
import Box from '@mui/material/Box';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import '../styles/chat.css';

interface InpData {
    setDarkMode: (value: boolean) => void,
    darkMode: boolean,
    width: number,
    visual: boolean,
    setVisual: (value: boolean) => void
};

const darkStyle = (dark: boolean) => {
    return {
        position: 'fixed',
        bottom: '3%',
        right: '3%',
        width: '30%',
        maxWidth: '400px',
        minWidth: '300px',
        height: '50%',
        maxHeight: '600px',
        minHeight: '300px',
        borderRadius: '50px 20px 10px 10px',
        backgroundColor: dark?'rebeccapurple':'#43998c',
        border: `1px solid ${dark?'rebeccapurple':'#43998c'}`,
        boxShadow: `0 0 10px ${dark?'rebeccapurple':'#43998c'}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}

export default function ChatPlace(props: any) {

    const [ open, setOpen ] = useState<boolean>(false);
    const [ text, setText ] = useState<string>('g');
    const [ chatMess, setChatMess ] = useState<any>([{login: 'spamigor', time: Number(new Date()), text: 'Hello World'},{login: 'spamigor2', time: Number(new Date()), text: 'Hello'}]);

    let { width, darkMode } = props;

    

    //let scrollPos: HTMLElement;

    useEffect(() => {
        
        const onKeypress = (e: any) => {
            if (e.code==='Enter') {
                console.log('Enter')
                sendMess();
            }
        };
        document.addEventListener('keydown', onKeypress);

        //scrollPos = document.getElementById('chatWindow');
        //console.log(typeof(scrollPos));
      
        return () => {
            document.removeEventListener('keydown', onKeypress);
        };
    }, []);

    const sendMess = () => {
        console.log(chatMess);
        if (true)   //open&&(text!=='')) 
        {
            let buf = copy(chatMess);
            buf.push({login: 'login', time: Number(new Date()), text});
            setChatMess(buf);
            setText('');
            //scrollPos.scrollTo(0,100);
        }
    }

    return (
        <Grow in={true}>
            <Box 
                sx={darkStyle(darkMode)}
                id={open?'chatOpen':'chatClosed'}
                onClick={()=>{if (!open) setOpen(true)}}
            >
                
                <Box sx={{ height: '50px', width: '100%'}} onClick={()=>setOpen(false)} >
                    <Grow in={open} timeout={open?2000:0}><Box 
                        sx={{ 
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Box 
                            sx={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '5px',
                                backgroundColor: 'red',
                                marginLeft: '25px',
                                marginRight: '20%'
                            }} 
                        />
                        <Typography color="primary">Чат с Толяном</Typography>

                    </Box></Grow>
                </Box>
                <Grow in={open} timeout={open?2000:0}><Box 
                    sx={{ 
                        width: '99%',
                        height: '100%',
                        backgroundColor: darkMode?'#202525':'#d4d5ce',
                        borderRadius: '5px 0 0 0',
                        display: 'block', 
                        scrollBehavior: 'smooth',
                        overflowY: 'auto'
                    }}
                    id="chatWindow"
                >
                    {chatMess.map((mess:any, index:number)=>{  
                        return (
                            <Box sx={{ display: 'flex', justifyContent: mess.login==='spamigor'?'flex-start':'flex-end' }} key={index}>
                                <Typography>{mess.text}</Typography>
                            </Box>
                        )
                    }, null)}
                </Box></Grow>
                <Grow in={open} timeout={open?2000:0} id={'chatTextField'}><TextField 
                    variant="outlined"
                    sx={{
                        backgroundColor: darkMode?'#202525':'#d4d5ce',
                        margin: '2px',
                        borderRadius: '0 0 10px 10px',
                        borderTop: `1px solid ${darkMode?'rebeccapurple':'#43998c'}`,
                        width: '99%'
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" onClick={()=>sendMess()} sx={{ cursor: 'default' }}>
                                <SendIcon />
                            </InputAdornment>
                        ),
                    }}
                    multiline
                    maxRows={4}
                    value={text}
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>setText(evt.target.value)}
                /></Grow>
            </Box>
        </Grow>
    );
}