import React, { useEffect, useRef, useState } from 'react'

import { Box, Button, CircularProgress, TableCell, TableRow, TableSortLabel, TextField, Typography } from '@mui/material'
import classes from './Main.module.css'
import { WelcomeScreen } from '../../Components/WelcomeScreen/WelcomeScreen'
import { CustomTable } from '../../Components/CustomTable/CustomTable'
import { useGetRepoDetailsQuery, useSearchRepoListQuery } from '../../redux/gh-graphql-api/gh-graphql-api'
import { SearchRepoListVariables } from '../../redux/gh-graphql-api/types'
import { ChooseRepoIDScreen } from '../../Components/ChooseRepoIDScreen/ChooseRepoIDScreen'
import { ShowRepoDetails } from '../../Components/ShowRepoDetails/ShowRepoDetails'


export type Order = 'asc' | 'desc' | null
export type OrderBy = 'stars' | 'forks' | 'updated' | null

type MoveDirection = 'moveNext' | 'movePrev' | 'notMove'

export const Main: React.FC = () => {

    const [input, setInput] = useState<string>('')
    const [order, setOrder] = useState<Order>(null)
    const [orderBy, setOrderBy] = useState<OrderBy>(null)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [canMakeReq, setCanMakeReq] = useState<boolean>(false)

    const moveDirection = useRef<MoveDirection>('notMove')


    const [queryParam, setQueryParam] = useState<Partial<SearchRepoListVariables>>({})
    const [chosenID, setChosenID] = useState<string>('')


    const { data: repoListData, isFetching: isFetchRepoList } = useSearchRepoListQuery(queryParam, { skip: !canMakeReq })

    const { data: repoDetailsData, isFetching: isFetchRepoDetails } = useGetRepoDetailsQuery(chosenID, { skip: !chosenID.length })

    const repAmount = repoListData && repoListData.repositoryCount || 0



    useEffect(() => {
        setQueryParam(generateQueryParam(moveDirection.current))
    }, [canMakeReq, input, order, orderBy, rowsPerPage, currentPage])


    function generateQueryParam(moveDirection: MoveDirection) {

        let newQuery: Partial<SearchRepoListVariables> = {}

        if (!repoListData) {
            newQuery = { searchQuery: input, first: rowsPerPage }
            return newQuery
        }


        let makeInput = input

        if (orderBy !== null) {
            makeInput = makeInput + ` sort:${orderBy}-${order === 'desc' ? 'desc' : 'asc'}`
        }

        let directionConfig: Partial<SearchRepoListVariables> = {}


        if (moveDirection === 'moveNext') {
            directionConfig.first = rowsPerPage
            directionConfig.after = repoListData?.pageInfo.endCursor
        } else if (moveDirection === 'movePrev') {
            directionConfig.last = rowsPerPage
            directionConfig.before = repoListData?.pageInfo.startCursor
        } else if (moveDirection === 'notMove') {
            directionConfig.first = rowsPerPage
        }


    

        newQuery = { searchQuery: makeInput, ...directionConfig }
        return newQuery
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////

    function submitHandler() {
        setCanMakeReq(true)
    }

    function handlerChangeInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCanMakeReq(false)
        setInput(e.target.value)
    }

    function handleChangePage(e: unknown, newPage: number) {
        let isNext = false
        setCurrentPage(prev => {
            if (prev < newPage) {
                isNext = true
            }
            return newPage
        })
        moveDirection.current = isNext ? 'moveNext' : 'movePrev'
    }

    function handleChangeRowsPerPage(value: number) {
        setRowsPerPage(value)
        setOrder(null)
        setOrderBy(null)
        setCurrentPage(0)
        moveDirection.current = 'notMove'
    }

    function handleClickOnColumn(value: OrderBy) {
        if (value === null) {
            return
        }

        if (value !== orderBy) {
            setOrderBy(value)
            setOrder('desc')
        } else {
            if (order === 'desc') {
                setOrder('asc')
            } else {
                setOrder('desc')
            }
        }
        moveDirection.current = 'notMove'
    }





    ///// CONTENT
    const headContentArr: { name: string, value?: OrderBy }[] = [
        { name: 'Название' },
        { name: 'Язык' },
        { name: 'Число форков', value: 'forks' },
        { name: 'Число звёзд', value: 'stars' },
        { name: 'Дата обновления', value: 'updated' }
    ]

    const headTableContent = headContentArr.map(item => {
        return (
            <TableCell key={item.name}
                sortDirection={orderBy === item.value ? (order || undefined) : false}
            >
                <TableSortLabel
                    active={orderBy === item.value}
                    direction={order !== null && orderBy === item.value ? order : 'asc'}
                    onClick={() => handleClickOnColumn(item.value || null)}
                >
                    {item.name}
                </TableSortLabel>
            </TableCell>
        )
    })


    let bodyTableContent: JSX.Element[] = []


    if (repoListData && repoListData.edges) {
        bodyTableContent = repoListData.edges.map(item => {
            const { id, name, primaryLanguage, forkCount, stargazerCount, updatedAt } = item.node
            return (<TableRow
                key={id}
                onClick={() => setChosenID(id)} // Обработчик клика по строке
                hover
                selected={id === chosenID}
                style={{ cursor: 'pointer' }}
            >
                <TableCell>{name}</TableCell>
                <TableCell>{primaryLanguage?.name ?? 'N/A'}</TableCell>
                <TableCell>{forkCount}</TableCell>
                <TableCell>{stargazerCount}</TableCell>
                <TableCell>{new Date(updatedAt).toISOString().slice(0, 10)}</TableCell>
            </TableRow>)
        })
    }

    return (
        <>
            <Box component='div'
                className={classes.mainContainer}
            >
                <Box component='header'
                    className={classes.headerContainer}
                >

                    <Box component='form'
                        className={classes.formContainer}
                        onSubmit={(e) => {
                            e.preventDefault()
                            submitHandler()
                        }}
                    >
                        <TextField
                            label='Введите поисковый запрос'
                            variant='filled'
                            size='small'
                            className={classes.inputContainer}
                            value={input}
                            onChange={handlerChangeInput}
                        />

                        <Button variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Искать
                        </Button>
                    </Box>
                </Box>





                <Box component='div'
                    className={classes.contentContainer}
                >
                    {(isFetchRepoList || isFetchRepoDetails) && (
                        <Box component='div'
                            className={classes.spinnerContainer}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                    {repoListData?.edges.length ? (
                        <Box component='div'
                            className={classes.tableContainer}
                        >
                            <Typography variant='h3'>
                                Результаты поиска
                            </Typography>

                            <CustomTable
                                rowsPerPage={rowsPerPage}
                                itemsAmount={repAmount}
                                currentPage={currentPage}
                                CBhandleChangePage={handleChangePage}
                                CBhandleChangeRowsPerPage={handleChangeRowsPerPage}
                                headTableContent={headTableContent}
                                bodyTableContent={bodyTableContent}
                            />

                        </Box>
                    ) : (<WelcomeScreen />)
                    }

                    <Box component='div'
                        className={classes.repoDetail}
                    >
                        {!chosenID.length ? (
                            <ChooseRepoIDScreen />
                        ) : (repoDetailsData
                            &&
                            (<ShowRepoDetails
                                data={repoDetailsData}
                            />)
                        )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

