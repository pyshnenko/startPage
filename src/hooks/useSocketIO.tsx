import { io } from 'socket.io-client';


import copy from 'fast-copy';

let socket: any;
const URL ='https://io.spamigor.ru';    
let connectS = false;
let open: boolean, chatMess: any, setChatMess: (val: any)=>void, user: any, login: boolean, setConnectIO: (val: boolean)=>void;
let lastMessDat: {time: number, login: string} = {time: 0, login: ''};

interface inpTypes {
    open: boolean, 
    chatMess: any, 
    setChatMess: (val: any)=>void, 
    user: any, 
    login: boolean, 
    setConnectIO: (val: boolean)=>void
}

export function useSocketIO(props: inpTypes) {

    if (props.hasOwnProperty('open')) open = props.open;
    if (props.hasOwnProperty('chatMess')) chatMess = props.chatMess;
    if (props.hasOwnProperty('setChatMess')) setChatMess = props.setChatMess;
    if (props.hasOwnProperty('user')) user = props.user;
    if (props.hasOwnProperty('login')) login = props.login;
    if (props.hasOwnProperty('setConnectIO')) setConnectIO = props.setConnectIO;

    if (!connectS) {
        console.log('hello');
        socket = io(URL, {
            autoConnect: true
        });
        connectS = true;

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('updChat', onUpdChat);
        socket.on('newMess', onNewMess);
        socket.on('updUserData', onUpdUserData);
        setConnectIO(true);
    }    

    function onConnect() {
        console.log('connect');
        connectS = true;
        setConnectIO(true);
        console.log(user.login);
        socket.emit('chatStart', user.login);
        socket.emit('otherProject', JSON.stringify({from: user.login, text: 'шарится по главной'}));
    }

    function onDisconnect() {
        console.log('disconnect')
        setConnectIO(false);
        //connectS = false;
    }

    function onUpdChat(value: string) {
        //console.log(value);
        if (value!==null) 
        {
            let buf: any = JSON.parse(value);
            setChatMess(buf);
        }
    }

    function sendIO (mess: any) {
        console.log(mess);
        lastMessDat = {time: mess.time, login: mess.login};
        socket.emit('newMess', JSON.stringify(mess));
    }

    function onNewMess(value: string) {
        console.log(value);
        let inpBuf = JSON.parse(value);
        //if ((inpBuf.time!==lastMessDat.time)||(inpBuf.login!==lastMessDat.login)) {
            let buf = copy(chatMess);
            buf.push(inpBuf);
            chatMess = buf;
            setChatMess(buf);
        //}
    }

    function onUserSelect(login: string) {
        console.log(login);
        socket.emit('chatStart', login);
    }

    function onUpdUserData() {
        socket.emit('updUserData', user.login);
    }

    return {
        socket,
        sendIO,
        connect: connectS,
        userSelect: onUserSelect
    }
}