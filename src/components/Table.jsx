import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import BookDataService from '../services/BookDataService';
import { useMemo } from 'react';
import mData from 'db.json'
import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
export default function SimpleTable() {

    const table = useReactTable({data, columns})
    const data = useMemo(() => mData, [])
    /** @type import('@tanstack/react-table').ColumnDef<any>*/
    const columns = [
        {
            header: 'ID',
            accessorKey: 'id'
        },
        {
            header: 'Title',
            accessorKey: 'title'
        },
        {
            header: 'Description',
            accessorKey: 'description'
        },
        {
            header: 'Published',
            accessorKey: 'published'
        }
    ]

    return (
        <TableContainer>
        <Table>
            <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
                <TableCell key = {headerGroup.id}>
                    {headerGroup.headers.map(header => <TableCell key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>)}
                </TableCell>
            ))}
            </TableHead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ) )}
            </tbody>
            <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(header => (
                            <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}               
            </tfoot>
        </Table>
        </TableContainer>
    )
}