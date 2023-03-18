import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface InpData {
    setUser: (value: object) => void,
    user: object
  };
  

export default function Menu({setUser, user}: InpData) {
    console.log(typeof(setUser))
    return (
        <div>
            <Paper sx={{margin: 3, padding: 2}} elevation={12}>
                <Typography>Домашняя страница</Typography>
            </Paper>
        </div>
    );
}