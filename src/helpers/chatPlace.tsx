import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import '../styles/chat.css';
import { useSocketIO } from "../hooks/useSocketIO";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FileButton from './fileButton';
import ChatIcon from '@mui/icons-material/Chat';

interface InpData {
    darkMode: boolean,
    user: any,
    login: boolean,
    api: any
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
        alignItems: 'center',
    }
}

const actions = [
    { name: 'Изображение' },
    { name: 'Документ' }
];

export default function ChatPlace(props: InpData) {

    let { darkMode, user, login, api } = props;

    const [ open, setOpen ] = useState<boolean>(false);
    const [ sendStatus, setSendStatus ] = useState<boolean>(false);
    const [ connectIO, setConnectIO ] = useState<boolean>(false);
    const [ text, setText ] = useState<string>('');
    const [ chatUser, setChatUser ] = useState<string>(user.login);
    const [ usList, setUsList ] = useState([{login: 'spamigor', role: 'admin', name:('Толян')}]);
    const [ chatMess, setChatMess ] = useState<any>([{login: 'spamigor', time: Number(new Date()), text: ['Hello World', '', 'word']},{login: 'spamigor2', time: Number(new Date()), text: ['Hello']}]);
    const shift = useRef<boolean>(false);

    const { sendIO, userSelect }: {sendIO: any, userSelect: (val: string)=>void} = useSocketIO({ open, chatMess, setChatMess, user, login, setConnectIO });

    const textRef = useRef<string>(text);
    const userRef = useRef<string>(chatUser);
    const chatMessArr = useRef<any>(chatMess);
    const trigger = useRef<Boolean>(true);
        
    const onKeypress = (e: any) => {
        if ((e.code==='ShiftLeft')||(e.code==='ShiftRight')) {
            shift.current = true;
        }
        if (e.code==='Enter') {
            console.log(textRef.current);
            if (!shift.current) sendMess(textRef.current, chatMessArr.current, userRef.current);
        }
    };    
        
    const onKeyUp = (e: any) => {
        if ((e.code==='ShiftLeft')||(e.code==='ShiftRight')) {
            shift.current = false;
        }
    }; 

    let scrollPos = useRef<HTMLElement>();

    useEffect(() => {

        if (trigger.current) {
            trigger.current = false;
            let prom: any = api.sendPost({}, 'usersList', `Bearer ${user.token}`);
            prom.then((res: any)=>setUsList(res.data.list))
        }

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
        if (scrollPos.current!==undefined) scrollPos.current.scrollTo(0,scrollPos.current.scrollHeight);
    }, [chatMess])

    useEffect(()=>{
        userRef.current = chatUser;
    }, [chatUser])

    const sendMess = (text:string, iBuf: any, user: string) => {
        if (true)
        {
            let str = (text.trim()).split('\n');
            let mess = {login: user, time: Number(new Date()), text: str};
            sendIO(mess);
            setText('');
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setChatUser(event.target.value);
        setOpen(true);
        userSelect(event.target.value)
    };
    
    const scrollToBottom = (scroll:HTMLElement) => {
        scroll.scrollTo(0,scroll.scrollHeight)
    }

    const attFile = async (e: any) => {
        //setSendStatus(true);
        let files = e.clipboardData.files;
        setSendStatus(true);
        //setSendTotal(files.length);
        for (let i = 0; i<files.length; i++) {
            let data = new FormData();
            data.append('file', files[i]);
            const options = {
                method: 'POST',
                headers: {
                    login: encodeURI(chatUser),
                    fname: encodeURI(files[i].name),
                    mode: 'chat',
                    ftype: 'image'
                },
                body: data,
                //signal: loadController.signal
            }                
            const response = await fetch('https://spamigor.ru/apiChat', options);
            const res = await response.json();
            console.log(res);
            sendMess(`img:|https://spamigor.ru/${encodeURI(res.addr)}`, null, chatUser);
            //setSendCount(i+1);
        }
        //setSendCount(0);
        setSendStatus(false);
        //setSendTotal(0);

    }

    return (
        <Grow in={true}>
            <Box 
                sx={darkStyle(darkMode)}
                id={open?'chatOpen':'chatClosed'}
                onClick={()=>{if (!open) {setOpen(true); /*if (scrollPos.current!==undefined) setTimeout(scrollToBottom, 1000, scrollPos.current);*/}}}
            >
                
                <Box sx={{ height: '50px', width: '100%', borderRadius: '50px', animation: open?'none':`3s infinite alternate ${darkMode?'tickB':'tickW'}`}} onClick={()=>setOpen(false)} >
                    {!open&&<Grow in={!open}><ChatIcon sx={{ color: 'aliceblue', position: 'relative', width: '35px', height: '35px', top: '9px', left: '7px' }} /></Grow>}
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
                        {user.role!=='admin'?
                            <Typography sx={{ color: darkMode?'black':'white' }}>Чат с Толяном</Typography> :
                            <FormControl sx={{ minWidth: 120 }} size="small">
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={chatUser}
                                    onChange={handleChange}
                                    sx={{ color: 'white' }}
                                >
                                    {usList.map((item: any)=>{
                                        return (
                                            <MenuItem value={item.login} key={item.login}>{item.login}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        }
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
                                        else if (item.slice(0,4)==='img:') return (
                                            <img src={item.slice(5)} key={index} id='chatFile'/>
                                        )
                                        else if (item.slice(0,4)==='doc:') { 
                                            let fileName = item.slice(item.lastIndexOf('img/')+4);
                                            fileName = fileName.slice(fileName.indexOf('-')+1);
                                            return (
                                                <a key={index} href={item.slice(5)} id='chatDocs' target='_blank' download><p>Скачать {fileName.slice(0, 30)+(fileName.length>30?'...':'')}</p></a>
                                        )}
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
                                <InputAdornment position="end" onClick={()=>sendMess(text, chatMess, chatUser)} sx={{ cursor: 'pointer' }}>
                                    <SendIcon />
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start" sx={{ cursor: 'pointer' }}>
                                    <FileButton recipient={chatUser} darkMode={darkMode} sendMess={sendMess} sendStatus={sendStatus} setSendStatus={setSendStatus} />
                                </InputAdornment>
                            )
                        }}
                        multiline
                        maxRows={4}
                        value={text}
                        onPasteCapture={attFile}
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