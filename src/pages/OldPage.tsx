import React, { useState, useEffect } from 'react';
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
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface InpData {
    darkMode: boolean
}; 
interface ArrDara {
    href: string, 
    title: string, 
    text: string, 
    url: string, 
    git: string
};

export default function About({darkMode}: InpData) {
    
    const [ width, setWidth ] = useState<number>(window.innerWidth);
    let grow = getGrowIn();

    useEffect(()=>{
        const handleResize = (event: any) => {
            setWidth(event.target.innerWidth);
        };

        window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
    }, [])

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

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = data.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
            {width>500 ? data.map((item, index)=>
                <Grow in={grow} timeout={index*1000} key={item.title}>
                        <Card sx={{ maxWidth: 330, margin: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
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
                            </Box>
                            <CardActions sx={{justifyContent: 'space-around'}}>
                                {item.url!==''&&<Button size="small" onClick={()=>window.location.assign(item.url)}>Перейти</Button>}
                                <Button size="small" onClick={()=>window.location.assign(item.git)}>Git</Button>
                            </CardActions>
                        </Card>
                </Grow>
            ) :
            <Grow in={grow}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 5px black', padding: '5px', borderRadius: '8px', backgroundColor: darkMode?'#333333':'#EEEEEE', }}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: darkMode?'#333333':'#EEEEEE',
                    }}
                >
                    <Typography sx={{ fontWeight: 800, fontSize: 'large', margin: '10px' }}>{data[activeStep].title}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                    style={{
                        width: '90vw'
                    }}
                >
                    {data.map((step, index) => (
                    <div key={step.title}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box
                                    component="img"
                                    sx={{
                                        height: '70vw',
                                        //display: 'block',
                                        overflow: 'hidden',
                                        width: '90vw',
                                        padding: 0,
                                        margin: '0 0 10px 0'
                                    }}
                                    src={step.href}
                                    alt={step.title}
                                />
                                <Typography sx={{width: '90vw', fontSize: 'small', color: darkMode?'white':'auto'}}>{data[activeStep].text}</Typography>
                                <Box>                                
                                    {step.url!==''&&<Button size="small" onClick={()=>window.location.assign(step.url)}>Перейти</Button>}
                                    <Button size="small" onClick={()=>window.location.assign(step.git)}>Git</Button>
                                </Box>
                            </Box>
                        ) : null}
                    </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    sx={{width: '80vw', backgroundColor: darkMode?'#333333':'#EEEEEE',}}
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                        ) : (
                        <KeyboardArrowRight />
                        )}
                    </Button>
                    }
                    backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                        ) : (
                        <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                    }
                />
                </Box>
                </Grow>
            }
        </Box>
    );
}