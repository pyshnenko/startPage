import React, { useState } from 'react';
import Box from '@mui/material/Box';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';

interface InpData {
    setDarkMode: (value: boolean) => void,
    darkMode: boolean,
    width: number,
    visual: boolean,
    setVisual: (value: boolean) => void
};

export default function ColButton(props: InpData) {
    let {width, darkMode, setDarkMode, visual, setVisual} = props;

    const [ active, setActive ] = useState<boolean>(true);

    const colorEdit = () => {
        setVisual(true);
        setActive(false);

        const visF = () => {
            setVisual(false);
            setActive(true);
        }

        setTimeout(visF, 1000);

        const colSet = () => {
            setDarkMode(!darkMode);
        }

        setTimeout(colSet, 500);

    }

    return (
        <Grow in={true}>
            <Box sx={{ position: 'fixed', top: width>1000? 0:'auto', bottom: width>1000 ? 'auto' : '0', left: 0 }}>
                {active&&<IconButton component="label" onClick={colorEdit}>
                    <EmojiObjectsIcon sx={{ zoom: width<600?1.5:2 }} />
                </IconButton>}
            </Box>
        </Grow>
    );
}