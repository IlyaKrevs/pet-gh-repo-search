import { Box, Typography } from '@mui/material'
import React from 'react'
import classes from './ChooseRepoIDScreen.module.css'

export const ChooseRepoIDScreen = () => {
    return (
        <Box component='div'
            className={classes.chooseRepoScreen}
        >
            <Typography variant='body2'>
                Выберите репозитарий
            </Typography>
        </Box>
    )
}
