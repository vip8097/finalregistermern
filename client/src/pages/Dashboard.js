import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../services/LocalStorageService';

import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unsetUserToken } from '../features/authSlice';

import { datatable } from '../components/api';
import Table from '../components/Table';

const Dashboard = () => {
  const [dataTable, setDataTable] = useState(datatable);

  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(unsetUserToken({ token: null }))
    dispatch(unsetUserInfo({ name: "", email: "" }))
    removeToken('token')
    navigate('/login')
  }

  const token = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(token)

  const [userData, setUserData] = useState({
    email: "",
    name: ""
  })

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.user.email,
        name: data.user.name,
      })
    }
  }, [data, isSuccess])

  // Store User Data in Redux Store
  const dispatch = useDispatch()


  const column = [
    { heading: ' Id', value: 'id' },
    { heading: ' Name', value: 'name' },
    { heading: 'Email', value: 'email' },
    { heading: 'Phone', value: 'phone' },
    { heading: 'City', value: 'city' },
  ]

  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Dashboard</h1>
        <Typography variant='h5'><Table data={dataTable} column={column} /></Typography>

        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
      </Grid>
      <Grid item sm={8}>

      </Grid>
    </Grid>
  </>;
};

export default Dashboard;
