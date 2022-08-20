import { PeopleOutline } from '@mui/icons-material'
import { Grid, MenuItem, Select, Table, TablePagination } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/layouts'
import useSWR from 'swr'
import { IRole, IUser } from '../../interfaces'
import { elBuenSaborApi } from '../../api'

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users')

  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

  if (!error && !data) {
    return <></>
  }

  const onRoleUpdated = async (userId: string, newRole: IRole) => {
    const previousUsers = users.map((user) => ({ ...user }))
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }))

    setUsers(updatedUsers)

    try {
      await elBuenSaborApi.put('/admin/users', { userId, role: newRole })
    } catch (error) {
      setUsers(previousUsers)
      alert('No se pudo actualizar el rol')
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID Usuario',
      width: 150,
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Nombre Completo',
      width: 200,
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Rol',
      width: 120,
      flex: 1,
      sortable: false,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label='Rol'
            onChange={({ target }) => {
              onRoleUpdated(row.id, target.value)
            }}
            variant='standard'
          >
            <MenuItem value='Admin'>Admin</MenuItem>
            <MenuItem value='User'>Cliente</MenuItem>
            <MenuItem value='Chef'>Cocinero</MenuItem>
            <MenuItem value='Delivery'>Delivery</MenuItem>
            <MenuItem value='Cashier'>Cajero</MenuItem>
          </Select>
        )
      },
    },
  ]

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }))

  return (
    <AdminLayout
      title='Usuarios'
      subTitle='Mantenimiento de usuarios'
      icon={<PeopleOutline />}
    >
      <Grid container className='fadeIn'>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '650px',
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={50}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 30]}
            sx={{
              display: 'flex',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
              border: 'none',
              borderColor: 'primary.light',
              borderRadius: '10px',
              '& .MuiDataGrid-cll:hover': {
                color: 'primary.main',
              },
            }}
            localeText={{
              noRowsLabel: 'No hay usuarios',
              columnMenuUnsort: 'Sin Ordenar',
              columnMenuSortAsc: 'Ordenar Ascendente',
              columnMenuSortDesc: 'Ordenar Descendente',
              columnMenuShowColumns: 'Mostrar columna',
              columnMenuHideColumn: 'Ocultar columna',
              columnMenuFilter: 'Filtrar',
            }}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default UsersPage
