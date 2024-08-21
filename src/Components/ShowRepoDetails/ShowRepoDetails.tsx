import { Box, Typography } from '@mui/material'
import React from 'react'
import classes from './ShowRepoDetails.module.css'
import { GetDetailsRepoResponse } from '../../redux/gh-graphql-api/types'

interface IShowRepoDetails {
    data: GetDetailsRepoResponse
}

export const ShowRepoDetails: React.FC<IShowRepoDetails> = ({ data }) => {
    return (
        <Box component='div'
            className={classes.showRepoDetails}
        >
            <Typography variant='h3'>
                {data.name}
            </Typography>
            <Typography variant='body2'>
                Description: {data.description}
            </Typography>
            <Typography variant='body2'>
                LicenseInfo: {data.licenseInfo?.name || 'N/A'}
            </Typography>
        </Box>
    )
}
