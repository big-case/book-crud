import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable,
  usePagination
  } from 'react-table';
import { 
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Toolbar
  } from '@mui/material';
import { 
    Link,
    useLocation,
    useNavigate
  } from 'react-router-dom';

const View = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/books${location.search}`);
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
        await axios.delete(`http://localhost:3003/books/${selectedRow.original.id}`);
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
            <Button variant='outlined' onClick={() => navigate(`/edit/${value}`)}>Edit</Button>
            <Button variant='outlined' color='error' onClick={() => handleOpenDeleteDialog(row)}>Delete</Button>
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
    navigate(`?q=${encodeURIComponent(searchQuery)}`);
  };

  if (loading) {
    return <LinearProgress />
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Link to="/">
            <Button variant='contained' color='success'>
              Home
            </Button>
          </Link>
          <Link to="/view">
            <Button variant='contained' color='success'>
              View
            </Button>
          </Link>
          <Link to="/create">
            <Button variant='contained' color='success'>
              Create
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSearch}>
        <TextField
          label='Search'
          size='small'
          name="search"
          defaultValue={searchQuery || ''}
        />
        <Button type="submit">Search</Button>
      </form>
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
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteRow} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default View;
