import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

interface InpData {
    darkMode: boolean,
    width: number
};
  

export default function About({darkMode, width}: InpData) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 330, margin: 2, boxShadow: 3 }}>
                <CardMedia
                    sx={{ height: 180 }}
                    image="https://spamigor.site/fiches/img/4011.PNG"
                    title="4011"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        4011
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Первый опыт с авторизацией, шаблонированием, токенами, cookies
                        и прочим. Развернут на Node.js. Данные пользователя хранятся в 
                        mongodb, ключ в redis. По токену можно получить доступ к первой
                        API, способной распознавать текст. На сайте есть игры, написанные
                        на JS в процессе изучения языка. Иногда там появляется дыра
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-around'}}>
                    <Button size="small" onClick={()=>window.location.assign('https://spamigor.site/4011')}>Перейти</Button>
                    <Button size="small" onClick={()=>window.location.assign('https://github.com/pyshnenko/http2')}>Git</Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 330, margin: 2, boxShadow: 3 }}>
                <CardMedia
                    sx={{ height: 180 }}
                    image="https://spamigor.site/fiches/img/4014.PNG"
                    title="4014"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        4014
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Безумству храбрых поем мы песни
                        Кто отважился зайти в дыру, попадают в следующий мой проект
                        Нас окружает зереный мир и дорога в закат. Есть возможность динамически 
                        настраивать происходящее. Управление мышью или клавиатурой. Графика Three.JS
                        С объектами можно контактировать
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-around'}}>
                    <Button size="small" onClick={()=>window.location.assign('https://spamigor.site/4014')}>Перейти</Button>
                    <Button size="small" onClick={()=>window.location.assign('https://github.com/pyshnenko/threejs')}>Git</Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 330, margin: 2, boxShadow: 3 }}>
                <CardMedia
                    sx={{ height: 180 }}
                    image="https://spamigor.site/fiches/img/40141587.PNG"
                    title="4015"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        4014/1587
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        В космос трудно добраться. Еще сложнее добраться сюда так как ссылок кроме этой нет.
                        Графика Three.js, взаимодействие с объектами и бэйгл в центре. Здесь можно регулировать
                        параметры света. Поверхность бублика использована для пупырышек
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-around'}}>
                    <Button size="small" onClick={()=>window.location.assign('https://spamigor.site/4014/1587')}>Перейти</Button>
                    <Button size="small" onClick={()=>window.location.assign('https://github.com/pyshnenko/threejs')}>Git</Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 330, margin: 2, boxShadow: 3 }}>
                <CardMedia
                    sx={{ height: 180 }}
                    image="https://spamigor.site/fiches/img/8080.jpg"
                    title="Дата-центр"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Дата-центр
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Первые попытди сделать собственный DashBoard. Все мои ранние проекты по WebSocket передают
                        сюда данные. Можно увидеть какой из сайтов лежит, увидеть действия пользователей
                        а также управлять сервером дворецкого
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-around'}}>
                    <Button size="small" onClick={()=>window.location.assign('https://spamigor.site:8080')}>Перейти</Button>
                    <Button size="small" onClick={()=>window.location.assign('https://github.com/pyshnenko/wsBeta')}>Git</Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 330, margin: 2, boxShadow: 3 }}>
                <CardMedia
                    sx={{ height: 180 }}
                    image="https://spamigor.site/fiches/img/doors.jpg"
                    title="Дворецкий"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Дворецкий
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Изначально, бот Альфред создавался как учебный проект на одноплатном компьютере Raspberry PI.
                        В его возможности входил запрос погоды, отправка изображений на мой API по распознаванию текста.
                        Затем я стал его развивать и подключать схемотехнику. Появилась возможность управлять подсветкой
                        в доме и открывать шлагбаум. Тут даже есть живые пользователи. Реализована автоматическая перезагрузка,
                        перезагрузка по команде, удаленное обновление исполняемого файла (через Git)
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-around'}}>
                    <Button size="small" onClick={()=>window.location.assign('https://t.me/myHomeLightController_bot')}>Перейти</Button>
                    <Button size="small" onClick={()=>window.location.assign('https://github.com/pyshnenko/pi')}>Git</Button>
                </CardActions>
            </Card>
        </Box>
    );
}