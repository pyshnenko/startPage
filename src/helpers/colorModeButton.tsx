import React, { useState, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import IconButton from '@mui/material/IconButton';

interface InpData {
    setDarkMode: (value: boolean) => void,
    darkMode: boolean,
    width: number
};

export default function ColButton(props: InpData) {
    let {width, darkMode, setDarkMode} = props;
    return (
        <Box sx={{ position: 'fixed', top: width>800? '10px': width<600? 0:'100px', left: width<600?'auto':0, right: width<600?0:'auto' }}>
            <IconButton component="label" onClick={()=>setDarkMode(!darkMode)}>
                <EmojiObjectsIcon sx={{ zoom: width<600?1.5:2 }} />
            </IconButton>
        </Box>
    );
}