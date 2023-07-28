import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <AppBar position='static' className='navbar' color='transparent'>
        <Toolbar>
          <Link to="/">
            <Button style={{ marginInline: '8px', color: 'black' }} variant='text' color='inherit'>
              without React Query
            </Button>
          </Link>
          <Link to="/view">
            <Button style={{ marginInline: '8px', color: 'black' }} variant='text' color='inherit'>
              using React Query
            </Button>
          </Link>
          <Link to="/create">
            <Button style={{ marginInline: '8px', color: 'black' }} variant='text' color='inherit'>
              Create &nbsp; <AddIcon/>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar