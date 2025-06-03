import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import {getGrowIn} from '../mech/mechanic';

interface InpData {
    darkMode: boolean,
    width: number,
    user: any,
    login: boolean,
    api: any
};
  

export default function About({darkMode, width, user, login, api}: InpData) {
    let grow = getGrowIn();
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Grow in={grow}>
                    <Paper id={!darkMode?"aboutPaper":""} sx={{margin: 3, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: width<500?'300px':'500px' }} elevation={12}>
                        <Box sx={{ height: width<500?'120px':'160px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '20px' }}>
                            <Box sx={{ boxShadow: 3, height: width<500?'120px':'160px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}><img
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
                            /></Box>
                            <Box>
                                <Typography sx={{marginLeft: width<500?'0px': '30px', fontSize: width<500?'large':'X-large', fontWeight: '800'}}>АНТОН ПЫШНЕНКО</Typography>
                                <Typography sx={{marginLeft: width<500?'0px': '30px', fontSize: width<500?'large':'large', fontWeight: '400'}}>tg, whatsApp, телефон: +7(999)981-10-66</Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Он же Толян, он же Spamigor</Typography>
                        <Typography sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Обладатель карты "Тройка"</Typography>
                        <Typography sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Мало пьёт и всегда недоволен</Typography>
                        <Typography sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Характер скверный</Typography>
                        <Typography sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Не женат</Typography>
                        <Typography sx={{fontWeight: '600' }}><a href="mailto:79999811066@yandex.ru">79999811066@yandex.ru</a></Typography>
                    </Paper>
                </Grow>
            </div>
        </div>
    );
}

const itemData = [
    {
      img: 'https://spamigor.ru/fiches/img/1.jpg',
      title: 'table',
    },
    {
      img: 'https://spamigor.ru/fiches/img/2.jpg',
      title: 'left',
    }
  ];