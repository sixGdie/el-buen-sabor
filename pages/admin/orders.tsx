import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Button, Chip, Grid, MenuItem, Select } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { elBuenSaborApi } from '../../api'
import { AdminLayout } from '../../components/layouts/AdminLayout'
import { IOrder, IUser, IOrderState } from '../../interfaces'
import { useExcelDownloder } from 'react-xls'

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders')
  const [orders, setOrders] = useState<IOrder[]>([])
  const { ExcelDownloder, Type } = useExcelDownloder()

  useEffect(() => {
    if (data) {
      setOrders(data)
    }
  }, [data])

  const onSatusUpdated = async (
    orderId: string,
    newStatus: IOrderState,
    newPayStatus: boolean
  ) => {
    const previousOrders = orders.map((order) => ({ ...order }))
    const updatedOrders = orders.map((order) => ({
      ...order,
      state: orderId === order._id ? newStatus : order.currentState,
      paymentState: orderId === order._id ? newPayStatus : order.isPaid,
    }))

    setOrders(updatedOrders)

    try {
      await elBuenSaborApi.put('/admin/orders', {
        orderId: orderId,
        currentState: newStatus,
        paymentState: newPayStatus,
      })
    } catch (error) {
      setOrders(previousOrders)
      alert('No se pudo actualizar la orden')
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Orden ID', width: 150 },
    { field: 'name', headerName: 'Nombre Cliente', width: 150 },
    { field: 'total', headerName: 'Monto total', width: 100 },
    {
      field: 'role',
      headerName: 'Estado del pedido',
      width: 150,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.currentState}
            label='Estado del pedido'
            onChange={({ target }) => {
              onSatusUpdated(row.id, target.value, row.isPaid)
            }}
            sx={{ widht: '300px' }}
          >
            <MenuItem value='Ingresado'>Ingresado</MenuItem>
            <MenuItem value='En Cocina'>En Cocina</MenuItem>
            <MenuItem value='En delivery'>En delivery</MenuItem>
            <MenuItem value='Entregado'>Entregado</MenuItem>
            <MenuItem value='Cancelado'>Cancelado</MenuItem>
          </Select>
        )
      },
    },
    {
      field: 'isPaid',
      headerName: 'Pagado',
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.isPaid}
            label='Pagado'
            onChange={({ target }) => {
              onSatusUpdated(
                row.id,
                row.currentState,
                target.value === 'true' ? true : false
              )
            }}
            sx={{ widht: '300px' }}
          >
            <MenuItem value='false'>No Pagado</MenuItem>
            <MenuItem value='true'>Pagado</MenuItem>
          </Select>
        )
      },
    },
    {
      field: 'inStock',
      headerName: 'No. Productos',
      align: 'center',
      width: 150,
    },
    {
      field: 'check',
      headerName: 'Ver orden',
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
            Ver orden
          </a>
        )
      },
    },
    { field: 'createdAt', headerName: 'Creada en', width: 300 },
  ]

  if (!data && !error) {
    return <></>
  }

  const rows = (data! || []).map((order) => ({
    id: order._id,
    name: `${order.sendAddress.firstName} ${order.sendAddress.lastName}`,
    total: order.total,
    currentState: order.currentState,
    isPaid: order.isPaid,
    inStock: order.numberOfItems,
    createdAt: new Date(order.createdAt as string).toLocaleDateString(),
  }))

  const dataForExcel: Array<{ [key: string]: any }> = rows.map((row) => ({
    ID: row.id,
    Cliente: row.name,
    Total: row.total,
    'Estado Pedido': row.currentState.toString(),
    'Estado Pago': row.isPaid ? 'Pagado' : 'No Pagado',
    'Cantidad Productos': row.inStock,
    'Fecha Pedido': new Date(row.createdAt as string).toLocaleDateString(),
  }))

  const dataExcel = {
    data: dataForExcel,
  }

  return (
    <AdminLayout
      title='Ordenes'
      subTitle='Mantenimiento de ordenes'
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 450, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            sx={{
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
              border: 'none',
              borderColor: 'primary.light',
              borderRadius: '10px',
              '& .MuiDataGrid-cll:hover': {
                color: 'primary.main',
              },
            }}
          />
        </Grid>
        <Button>
          <ExcelDownloder
            data={dataExcel}
            filename={`Orders_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}`}
            type={Type.Button}
            style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            Descargar Excel
          </ExcelDownloder>
        </Button>
      </Grid>
    </AdminLayout>
  )
}

export default OrdersPage
