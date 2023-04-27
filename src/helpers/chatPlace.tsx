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
import { useSocketIO } from "../hooks/useSocketIO";

interface InpData {
    darkMode: boolean,
    width: number,
    user: any,
    login: boolean
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

export default function ChatPlace(props: InpData) {

    let { width, darkMode, user, login } = props;

    const [ open, setOpen ] = useState<boolean>(false);
    const [ connectIO, setConnectIO ] = useState<boolean>(false);
    const [ text, setText ] = useState<string>('');
    const [ chatMess, setChatMess ] = useState<any>([{login: 'spamigor', time: Number(new Date()), text: ['Hello World', '', 'word']},{login: 'spamigor2', time: Number(new Date()), text: ['Hello']}]);
    const shift = useRef<boolean>(false);

    const { sendIO, connect }: {sendIO: any, connect: boolean} = useSocketIO({ open, chatMess, setChatMess, user, login, setConnectIO });

    const textRef = useRef<string>(text);
    const chatMessArr = useRef<any>(chatMess);
        
    const onKeypress = (e: any) => {
        if ((e.code==='ShiftLeft')||(e.code==='ShiftRight')) {
            shift.current = true;
        }
        if (e.code==='Enter') {
            console.log(textRef.current);
            if (!shift.current) sendMess(textRef.current, chatMessArr.current);
        }
    };    
        
    const onKeyUp = (e: any) => {
        if ((e.code==='ShiftLeft')||(e.code==='ShiftRight')) {
            shift.current = false;
        }
    };   

    let scrollPos = useRef<HTMLElement>();

    useEffect(() => {
        document.addEventListener('keydown', onKeypress);
        document.addEventListener('keyup', onKeyUp);

        scrollPos.current = document.getElementById('chatWindow') as HTMLElement;
      
        return () => {
            document.removeEventListener('keydown', onKeypress);
            document.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    useEffect(()=>{
        textRef.current = text;
    }, [text])

    useEffect(()=>{
        chatMessArr.current = chatMess;
    }, [chatMess])

    const sendMess = (text:string, iBuf: any) => {
        if (true)
        {
            let buf = copy(iBuf);
            let str = (text.trim()).split('\n');
            let mess = {login: user.login, time: Number(new Date()), text: str};
            sendIO(mess);
            buf.push(mess);
            setChatMess(buf);
            setText('');
            if (scrollPos.current!==undefined) scrollPos.current.scrollBy(0,100);
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
                                backgroundColor: connectIO?'chartreuse':'red',
                                boxShadow: `0 0 5px ${connectIO?'chartreuse':'red'}`,
                                marginLeft: '25px',
                                marginRight: '20%'
                            }} 
                        />
                        <Typography sx={{ color: 'black' }}>Чат с Толяном</Typography>

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
                    {(chatMess!==undefined)&&(chatMess.length!==0)&&chatMess.map((mess:any, index:number)=>{  
                        return (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: mess.login==='spamigor'?'flex-start':'flex-end' }} key={index}>
                                <Box 
                                    sx={{ 
                                        textAlign: mess.login==='spamigor'?'left':'right',
                                        backgroundColor: mess.login==='spamigor'?'antiquewhite':'white',
                                        padding: '10px',
                                        margin: '10px',
                                        border: `1px solid ${mess.login==='spamigor'?'antiquewhite':'white'}`,
                                        boxShadow: `0 0 5px ${mess.login==='spamigor'?'antiquewhite':'white'}`,
                                        borderRadius: mess.login==='spamigor'?'10px 10px 10px 0':'10px 10px 0 10px',
                                        maxWidth: '75%',
                                        wordBreak: 'break-all'
                                    }}
                                >
                                    {mess.text.map((item: string, index: number)=>{
                                        if (item==='') return (<br key={index}/>);
                                        else return (
                                            <Typography key={index}>{item}</Typography>
                                        )
                                    })}
                                </Box>
                            </Box>
                        )
                    }, null)}
                </Box></Grow>
                <Grow in={open} timeout={open?2000:0} id={'chatTextField'}>
                    <TextField 
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
                                <InputAdornment position="end" onClick={()=>sendMess(text, chatMess)} sx={{ cursor: 'default' }}>
                                    <SendIcon />
                                </InputAdornment>
                            ),
                        }}
                        multiline
                        maxRows={4}
                        value={text}
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>)=>{
                            if (evt.target.value!=='\n') {
                                setText(evt.target.value);
                            }
                        }}
                    />
                </Grow>
            </Box>
        </Grow>
    );
}