import React, { useState, MouseEvent } from 'react';
import '../styles/style.css';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ElderlyIcon from '@mui/icons-material/Elderly';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {stateSettings} from '../mech/mechanic';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

interface InpData {  
    login: boolean,
    setLogin: (value: boolean) => void,
    darkTheme: {palette: {mode: string}},
    width: number,
    user: any
};

export default function MenuS(props: InpData) {

    let {login, setLogin, darkTheme, width, user} = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuState, setMenuState] = useState<boolean>(false);
    const open = Boolean(anchorEl);
    const menuPos = ['Домой', 'Minio', 'Блокнотик', 'Облачко', 'Дополненная реальность', 'Старые проекты', 'Настройки', 'Обо мне'];

    const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setMenuState(open);
    };


    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (mode: string | null) => {
        setAnchorEl(null);
        if (mode==='logOut') setLogin(false);
        else if (mode==='Settings') stateSettings('settings');
        else if (mode==='home') stateSettings('home');
    };

    let imgStyle = {
      zoom: '1.7',
      position: 'relative',
      color: darkTheme.palette.mode==='dark'?'white':'dimgray'
    }

    const listAdr = 'https://spamigor.ru/list';
    const s3Adr = 'https://spamigor.ru/s3';
    const ar = 'https://ar.spamigor.ru';
    const cloud = 'https://cloud.spamigor.ru';

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem key={menuPos[0]} disablePadding>
                    <ListItemButton onClick={()=>{stateSettings('')}}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={menuPos[0]} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={menuPos[1]} disablePadding>
                    <ListItemButton onClick={()=>{window.location.assign(s3Adr)}}>
                        <ListItemIcon>
                            <DataObjectIcon />
                        </ListItemIcon>
                        <ListItemText primary={menuPos[1]} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={menuPos[2]} disablePadding>
                    <ListItemButton onClick={()=>{window.location.assign(listAdr)}}>
                        <ListItemIcon>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary={menuPos[2]} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={menuPos[3]} disablePadding>
                    <ListItemButton onClick={()=>{window.location.assign(cloud)}}>
                        <ListItemIcon>
                            <CloudUploadIcon />
                        </ListItemIcon>
                        <ListItemText primary={menuPos[3]} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={menuPos[4]} disablePadding>
                    <ListItemButton onClick={()=>{window.location.assign(ar)}}>
                        <ListItemIcon>
                            <ViewInArIcon />
                        </ListItemIcon>
                        <ListItemText primary={menuPos[4]} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={menuPos[5]} disablePadding>
                    <ListItemButton onClick={()=>stateSettings('old')}>
                        <ListItemIcon>
                            <ElderlyIcon />
                        </ListItemIcon>
                        <ListItemText primary={menuPos[5]} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={menuPos[6]} disablePadding>
                    <ListItemButton onClick={()=>stateSettings('settings')}>
                        <ListItemIcon>
                            <BuildIcon />
                        </ListItemIcon>
                        <ListItemText primary={menuPos[6]} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={menuPos[7]} disablePadding>
                    <ListItemButton onClick={()=>stateSettings('about')}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={menuPos[7]} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
      );

    return (
        <div>
            {width>1000 ? <div id="fullBar">
                <div className={darkTheme.palette.mode==='dark'?"barD":"barW"} id="firstBar">
                    <div className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} onClick={()=>stateSettings('home')}><div className="button">
                        <HomeIcon sx={imgStyle} id="img" />
                        <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Домой</h1>
                    </div></div>
                    <a className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} href={s3Adr}><div className="button">
                        <DataObjectIcon sx={imgStyle} id="img" />
                        <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Minio</h1>
                    </div></a>
                    <a className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} href={listAdr}><div className="button">                    
                        <EventNoteIcon sx={imgStyle} id="img" />
                        <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Блокнотик</h1>
                    </div></a>
                    <a className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} href={cloud}><div className="button">                    
                        <CloudUploadIcon sx={imgStyle} id="img" />
                        <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Облачко</h1>
                    </div></a>
                    <a className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} href={ar}><div className="button">                    
                        <ViewInArIcon sx={imgStyle} id="img" />
                        <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>AR</h1>
                    </div></a>
                    <div className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} onClick={()=>stateSettings('old')}><div className="button">                   
                        <ElderlyIcon sx={imgStyle} id="img" />
                        <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"} id="doubleString">Старые проекты</h1>
                    </div></div>
                    <div className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} onClick={()=>stateSettings('settings')}><div className="button">                 
                        <BuildIcon sx={imgStyle} id="img" />                    
                        <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Настройки</h1>
                    </div></div>
                    <div className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} onClick={()=>stateSettings('about')}><div className="button">                            
                        <PersonIcon sx={imgStyle} id="img" />                    
                        <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Обо мне</h1>
                    </div></div>
                </div>
            </div> :
            <div>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                    <IconButton onClick={()=>setMenuState(!menuState)}>
                        <MenuIcon />
                    </IconButton>
                    {login&&<Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar 
                                alt={(user.first_name+' '+user.last_name).toLocaleUpperCase()}
                                src={user.avatar ? user.avatar : ''}
                                sx={{ width: 32, height: 32 }}
                            >
                                {user.avatar ? '' : ((user.name ? user.name[0] : 'ъ')+(user.last_name ? user.last_name[0] : 'Ъ')).toLocaleUpperCase()}
                            </Avatar>
                        </IconButton>
                    </Tooltip>}
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={()=>handleClose(null)}
                    onClick={()=>handleClose(null)}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={()=>handleClose('home')}>
                        <Avatar /> Профиль
                    </MenuItem>
                    <MenuItem onClick={()=>handleClose(null)}>
                        <Avatar /> Что-то
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={()=>handleClose(null)}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Тут пусто
                    </MenuItem>
                    <MenuItem onClick={()=>handleClose('Settings')}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Настройки
                    </MenuItem>
                    <MenuItem onClick={()=>handleClose('logOut')}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Выход
                    </MenuItem>
                </Menu>
                <div>
                    <Drawer
                        anchor={'left'}
                        open={menuState}
                        onClose={toggleDrawer(false)}
                    >
                        {list()}
                    </Drawer>
                </div>
            </div>}            
        </div>
    );
}