import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import {getGrowIn} from '../mech/mechanic';

interface InpData {
    darkMode: boolean,
    width: number
}; 
interface ArrDara {
    href: string, 
    title: string, 
    text: string, 
    url: string, 
    git: string
};

export default function About({darkMode, width}: InpData) {
    let grow = getGrowIn();

    const data:Array<ArrDara> = [
        {
            href: "https://spamigor.site/fiches/img/4011.PNG",
            title: "4011",
            text: 'Первый опыт с авторизацией, шаблонированием, токенами, cookies и прочим. Развернут на Node.js. Данные пользователя хранятся в mongodb, ключ в redis. По токену можно получить доступ к первой API, способной распознавать текст. На сайте есть игры, написанные на JS в процессе изучения языка. Иногда там появляется дыра',
            url: 'https://spamigor.site/4011',
            git: 'https://github.com/pyshnenko/http2'
        },
        {
            href: "https://spamigor.site/fiches/img/4014.PNG",
            title: "4014",
            text: "Безумству храбрых поем мы песни. Кто отважился зайти в дыру, попадают в следующий мой проект. Нас окружает зереный мир и дорога в закат. Есть возможность динамически настраивать происходящее. Управление мышью или клавиатурой. Графика Three.JS. С объектами можно контактировать",
            url: 'https://spamigor.site/4014',
            git: 'https://github.com/pyshnenko/threejs'
        },
        {
            href: "https://spamigor.site/fiches/img/40141587.PNG",
            title: "4014/1587",
            text: "В космос трудно добраться. Еще сложнее добраться сюда так как ссылок кроме этой нет. Графика Three.js, взаимодействие с объектами и бэйгл в центре. Здесь можно регулировать параметры света. Поверхность бублика использована для пупырышек",
            url: 'https://spamigor.site/4014/1587',
            git: 'https://github.com/pyshnenko/threejs'
        },
        {
            href: "https://spamigor.site/fiches/img/8080.jpg",
            title: "Дата-центр",
            text: "Первые попытди сделать собственный DashBoard. Все мои ранние проекты по WebSocket передают сюда данные. Можно увидеть какой из сайтов лежит, увидеть действия пользователей а также управлять сервером дворецкого",
            url: 'https://spamigor.site:8080',
            git: 'https://github.com/pyshnenko/wsBeta'
        },
        {
            href: "https://spamigor.site/fiches/img/doors.jpg",
            title: "Дворецкий",
            text: "Изначально, бот Альфред создавался как учебный проект на одноплатном компьютере Raspberry PI. В его возможности входил запрос погоды, отправка изображений на мой API по распознаванию текста. Затем я стал его развивать и подключать схемотехнику. Появилась возможность управлять подсветкой в доме и открывать шлагбаум. Тут даже есть живые пользователи. Реализована автоматическая перезагрузка, перезагрузка по команде, удаленное обновление исполняемого файла (через Git)",
            url: 'https://t.me/myHomeLightController_bot',
            git: 'https://github.com/pyshnenko/pi'
        },
    ]; 
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {data.map((item, index)=>
                <Grow in={grow} timeout={index*1000} key={item.title}>
                    <Card sx={{ maxWidth: 330, margin: 2, boxShadow: 3 }}>
                        <CardMedia
                            sx={{ height: 180 }}
                            image={item.href}
                            title={item.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">{item.text}</Typography>
                        </CardContent>
                        <CardActions sx={{justifyContent: 'space-around'}}>
                            {item.url!==''&&<Button size="small" onClick={()=>window.location.assign(item.url)}>Перейти</Button>}
                            <Button size="small" onClick={()=>window.location.assign(item.git)}>Git</Button>
                        </CardActions>
                    </Card>
                </Grow>
            )}
        </Box>
    );
}