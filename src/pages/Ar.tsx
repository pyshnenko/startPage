import React from 'react';
import Card from '../helpers/card'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {getGrowIn} from '../mech/mechanic';
import { InpData, CardData } from '../types/frontTypes';

const data: CardData[] = [
    {pict: 'https://ar.spamigor.ru/model.gif', title: 'Машинка', text: 'Машинка дрифтит', href: 'https://ar.spamigor.ru/model.html'},
    {pict: 'https://ar.spamigor.ru/model2.gif', title: 'Ford mustang', text: 'Открывает двери и капот. Можно взаимодействовать', href: 'https://ar.spamigor.ru/model2.html'},
    {pict: 'https://ar.spamigor.ru/model3.gif', title: 'Нескольно объектов', text: 'На каждый маркер свой объект', href: 'https://ar.spamigor.ru/model3.html'},
    {pict: 'https://ar.spamigor.ru/shirt.gif', title: 'Куча', text: 'Навалено на маркер 2. Можно подарить', href: 'https://ar.spamigor.ru/shit.html'},
]

export default function Ar ({darkMode, width, user, login, api}: InpData) {
    let grow = getGrowIn();
    return (
        <Box>
            <Grow in={grow}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: width>1000?'40px':1}}>
                    <Typography sx={{
                        margin: 2,
                        fontWeight: 'bold',
                        fontSize: 'large',
                        color: darkMode?'aliceblue':'black'
                    }} variant='h1'>Проекты с дополненной реальностью</Typography>
                    <Typography sx={{padding: 2,
                        color: darkMode?'aliceblue':'black'}}>При наведении камеры на маркер появляется объект, созданный с использованием библиотек THREE.js. С некоторыми моделями можно взаимодействовать</Typography>
                    <Box sx={{margin: 2}}>
                        <Accordion sx={{maxWidth: '300px', backgroundColor: darkMode?'cadetblue':'beige'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>Маркер 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img width={'250px'} height={'250px'} src={'https://ar.spamigor.ru/marker.png'} />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{maxWidth: '300px', backgroundColor: darkMode?'cadetblue':'beige'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>Маркер 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <img width={'250px'} height={'250px'} src={'https://ar.spamigor.ru/box.png'} />
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {data.map((card: CardData)=>{
                            return (<Card key={card.title} data={card} darkMode={darkMode} width={width} />)
                        })}
                    </Box>
                </Box>
            </Grow>
        </Box>
    )
}