import React, { useState } from 'react'
import classes from './CustomTable.module.css'
import { TableContainer, Table, TableHead, TableRow, TableBody, TablePagination } from '@mui/material';



interface ICustomTable {
    rowsPerPage: number,
    itemsAmount: number,
    headTableContent: JSX.Element[],
    bodyTableContent: JSX.Element[],
    currentPage: number,
    CBhandleChangePage: (e: unknown, value: number) => void,
    CBhandleChangeRowsPerPage: (value: number) => void
}

export const CustomTable: React.FC<ICustomTable> = ({
    rowsPerPage,
    itemsAmount,
    headTableContent,
    bodyTableContent,
    currentPage,
    CBhandleChangePage,
    CBhandleChangeRowsPerPage
}) => {



    return (
        <div className={classes.tableContainer}>
            <TableContainer>
                <Table>

                    <TableHead>
                        <TableRow>
                            {headTableContent}
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {bodyTableContent}
                    </TableBody>

                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 15, 20]}
                component="div"
                count={itemsAmount}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={CBhandleChangePage}
                onRowsPerPageChange={(e) => CBhandleChangeRowsPerPage(+e.target.value)}
            />
        </div>
    );
}
