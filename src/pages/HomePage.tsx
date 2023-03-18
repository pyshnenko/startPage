import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface InpData {
    setUser: ()=>{},
    user: object
  };
  

export default function Menu({setUser, user}: any) {
    console.log(typeof(setUser))
    return (
        <div>
            <Paper elevation={24}>
                <Typography>Домашняя страница</Typography>
            </Paper>
        </div>
    );
}