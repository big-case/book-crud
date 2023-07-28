import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTable } from 'react-table';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { deleteData, fetchAllData } from '../services/api';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom/';
import LinearProgress from '@mui/material/LinearProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  }) => {
  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()} align='center'>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return(
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <TableCell {...cell.getCellProps()} align='center'>{cell.render('Cell')}</TableCell>
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const TableInstance = ({ tableData }) => {
  const [columns, data] = useMemo(
    () => {
      const columns = [
        {
          Header: 'Title',
          accessor: 'title'
        },
        {
          Header: 'Description',
          accessor: 'description'
        },
        {
          Header: 'Actions',
          accessor: 'id',
          Cell: ({ value, row }) => (
            <div>
            <Button style={{ marginInline: '4px' }} onClick={() => navigate(`/edit/${value}`)}>
              <EditIcon/>
            </Button>
            <Button style={{ marginInline: '4px' }} color='error' onClick={() => handleOpenDeleteDialog(row)}>
              <DeleteForeverIcon/>
            </Button>
          </div>
          )
        }
      ];
      return [columns, tableData];
    },
    [tableData]
  );

  const tableInstance = useTable({ columns, data });
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleOpenDeleteDialog = (row) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedRow(null);
    setDeleteDialogOpen(false);
    setButtonDisabled(false);
  };

  const handleDelete = async () => {
    try {
      await handleDeleteRow.mutateAsync();
    } catch (error) {
      console.log(error);
    }
    setButtonDisabled(true);
  };

  const handleDeleteRow = useMutation(
    () => deleteData(selectedRow.original.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['books']);
        handleCloseDeleteDialog();
        navigate('/view');
      },
    }
  );

  return (
    <div>
    <TableLayout {...tableInstance} />
    <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
    <DialogTitle>Delete Item</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to delete this item?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDeleteDialog} disabled={buttonDisabled}>
        Cancel
      </Button>
      <Button onClick={handleDelete} disabled={buttonDisabled} color="error">
        Delete
      </Button>
    </DialogActions>
    </Dialog>
    </div>
  );
}

const RQView = () => {
  const [tableData, setTableData] = useState(null);

  const { isLoading, data: apiResponse, isError, error } = useQuery(['books'], fetchAllData);

  useEffect(() => {
    setTableData(apiResponse?.data);
  }, [apiResponse]);

  if(isLoading || !tableData) {
    return <h2><LinearProgress/></h2>
  };

  if(isError) {
    return <h2>{error}</h2>
  };

  return (
    <>
      <h2>Using React Query</h2>
      <TableInstance tableData={tableData}/>
    </>
  )
}

export default RQView