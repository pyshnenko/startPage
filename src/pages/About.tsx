import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface InpData {
    darkMode: boolean,
    width: number
};
  

export default function About({darkMode, width}: InpData) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper sx={{margin: 3, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: width<500?'300px':'500px'}} elevation={12}>
                <Box sx={{ height: width<500?'120px':'160px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '20px' }}>
                    <img
                        style={{height: '100%', width: 'auto'}}
                        src={`${itemData[0].img}`}
                        srcSet={`${itemData[0].img}`}
                        alt={itemData[0].title}
                        loading="lazy"
                    />
                    <img
                        style={{height: '100%', width: 'auto'}}
                        src={`${itemData[1].img}`}
                        srcSet={`${itemData[1].img}`}
                        alt={itemData[1].title}
                        loading="lazy"
                    />
                    <Typography sx={{marginLeft: width<500?'0px': '30px', fontSize: width<500?'large':'X-large'}}>АНТОН ПЫШНЕНКО</Typography>
                </Box>
                <Typography>Он же "Толян"</Typography>
                <Typography>Он же "Spamigor"</Typography>
                <Typography>Обладатель карты "Тройка"</Typography>
                <Typography>Мало пьёт и всегда недоволен</Typography>
                <Typography>Характер скверный</Typography>
                <Typography>Не женат</Typography>
            </Paper>
        </div>
    );
}

const itemData = [
    {
      img: 'https://spamigor.site/fiches/img/1.jpg',
      title: 'table',
    },
    {
      img: 'https://spamigor.site/fiches/img/2.jpg',
      title: 'left',
    }
  ];