import React, { useState } from 'react';
import '../styles/style.css';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ElderlyIcon from '@mui/icons-material/Elderly';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';

export default function Menu(props: any) {

    let {setState, darkTheme} = props;

    let imgStyle = {
      zoom: '1.7',
      position: 'relative',
      color: darkTheme.palette.mode==='dark'?'white':'dimgray'
    }

    const listAdr = 'https://spamigor.site/list';
    const s3Adr = 'https://spamigor.site/s3';
    const homeAdr = 'https://spamigor.site/build';

    return (
        <div id="fullBar">
            <div className={darkTheme.palette.mode==='dark'?"barD":"barW"} id="firstBar">
                <a className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} href={homeAdr}><div className="button">
                    <HomeIcon sx={imgStyle} id="img" />
                    <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Домой</h1>
                </div></a>
                <a className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} href={s3Adr}><div className="button">
                    <CloudUploadIcon sx={imgStyle} id="img" />
                    <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Minio</h1>
                </div></a>
                <a className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} href={listAdr}><div className="button">                    
                    <EventNoteIcon sx={imgStyle} id="img" />
                    <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Блокнотик</h1>
                </div></a>
                <a className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} href="/"><div className="button">                   
                    <ElderlyIcon sx={imgStyle} id="img" />
                    <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"} id="doubleString">Старые проекты</h1>
                </div></a>
                <a className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} href="/"><div className="button">                 
                    <BuildIcon sx={imgStyle} id="img" />                    
                    <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Настройки</h1>
                </div></a>
                <a className={darkTheme.palette.mode==='dark'?"aClass":"aClassW"} href="/"><div className="button">                            
                    <PersonIcon sx={imgStyle} id="img" />                    
                    <h1 className={darkTheme.palette.mode==='dark'?"h1D":"h1W"}>Обо мне</h1>
                </div></a>
            </div>
        </div>
    );
}