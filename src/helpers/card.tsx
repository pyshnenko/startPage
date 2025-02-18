import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CardData } from '../types/frontTypes';

export default function Card ({data, darkMode, width}: {data: CardData, darkMode: boolean, width: number}) {
    return (
        <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                padding: '8px',
                backgroundColor: 'antiquewhite',
                margin: '8px',
                width: '80%',
                maxWidth: '350px',
                height: '150px',
                border: '1px solid gold',
                borderRadius: '16px',
                boxShadow: '0 0 8px gold'
            }}>
            <img style={{width: '25%', minWidth: '150px', objectFit: 'cover', borderRadius: '20px'}} src={data.pict} />
            <Box sx={{width: '100%', display: 'flex', paddingLeft: '10px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <Typography sx={{fontWeight: 'bold'}}>{data.title}</Typography>
                <Typography sx={{textAlign: 'left'}}>{data.text}</Typography>
                <Button onClick={()=>window.location.assign(data.href)}>Попробовать</Button>
            </Box>
        </Box>
    )
}