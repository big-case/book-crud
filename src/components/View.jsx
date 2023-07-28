import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import BookDataService from '../services/BookDataService';
import Typography from '@mui/material/Typography';

const View = () => {
  const qs = require('qs');
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // not required while using react-query
  useEffect(() => {
    fetchData();
  }, [location.search]);

  const fetchData = async () => {
    try {
      const response = await BookDataService.get(`${location.search}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleOpenDeleteDialog = (row) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedRow(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteRow = async () => {
    try {
      if (selectedRow) {
        await BookDataService.remove(`${selectedRow.original.id}`);
        fetchData();
        handleCloseDeleteDialog();
      }
    } catch (error) {
      console.log('Error deleting row:', error);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Description', accessor: 'description' },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value, row }) => (
          <div>
            <Button variant='text' onClick={() => navigate(`/edit/${value}`)}>
              Edit
            </Button>
            <Button variant='text' color='error' onClick={() => handleOpenDeleteDialog(row)}>
              Delete
            </Button>
          </div>
        ),
      },
    ],
  [navigate]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get('search');
    const queryString = qs.stringify({ q: searchQuery});
    navigate(`?${queryString}`);
  };

  if (loading) {
    return <LinearProgress />
  }

  return (
    <div>
      <Typography mt={2}>
      <div style={{ marginTop: '12px' }}>
      <form onSubmit={handleSearch}>
        <TextField
          label='Search'
          size='small'
          name="search"
          defaultValue={searchQuery || ''}
        />
        <Button type="submit">Search</Button>
      </form>
      </div>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div>
        
        <Button size='small' onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button size='small' onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
        <div>
          Page {pageIndex + 1} of {pageOptions.length}
        </div>
        <div>
          Go to page:
          <TextField
            size='small'
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
          />
        </div>
        <div>
          Show{' '}
          <Select
            size='small'
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>{' '}
          entries
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button onClick={handleDeleteRow} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Typography>
    </div>

  );
};

export default View;
