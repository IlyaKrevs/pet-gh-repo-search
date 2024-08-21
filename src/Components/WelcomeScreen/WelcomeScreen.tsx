import { Box, Typography } from '@mui/material'
import React from 'react'
import classes from './WelcomeScreen.module.css'

export const WelcomeScreen: React.FC = () => {
    return (
        <Box component='div'
            className={classes.welcomeBox}
        >
            <Typography variant='h3' >
                Добро пожаловать
            </Typography>
        </Box>
    )
}
