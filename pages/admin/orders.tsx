import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { elBuenSaborApi } from '../../api';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { IOrder, IUser, IOrderState } from '../../interfaces';



const OrdersPage = () => {

    const {data, error} = useSWR<IOrder[]>('/api/admin/orders');
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
      if (data) {
        setOrders(data);
      }
    }, [data])

    const onSatusUpdated = async (orderId: string, newStatus: IOrderState, newPayStatus: boolean) => {
        
        const previousOrders = orders.map( order => ({...order}));
        const updatedOrders = orders.map(order => ({
            ...order,
            state: orderId === order._id ? newStatus : order.currentState,
            paymentState: orderId === order._id ? newPayStatus : order.isPaid
        }));

        setOrders(updatedOrders);

        try {
            await elBuenSaborApi.put('/admin/orders', { orderId: orderId, currentState: newStatus, paymentState: newPayStatus });
        } catch (error) {
            setOrders(previousOrders);
            alert('No se pudo actualizar la orden');
        }
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Orden ID', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'name', headerName: 'Nombre completo', width: 150 },
    { field: 'total', headerName: 'Monto total', width: 100 },
    {
        field: 'role', 
        headerName: 'Estado del pedido', 
        width: 150,
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <Select
                    value={row.currentState}
                    label="Estado del pedido"
                    onChange={ ({target}) => {onSatusUpdated(row.id, target.value, row.isPaid)}}
                    sx={{widht: '300px'}}
                >
                    <MenuItem value='Ingresado'>Ingresado</MenuItem>
                    <MenuItem value='En Cocina'>En Cocina</MenuItem>
                    <MenuItem value='En delivery'>En delivery</MenuItem>
                    <MenuItem value='Entregado'>Entregado</MenuItem>
                    <MenuItem value='Cancelado'>Cancelado</MenuItem>
                </Select>
            )
    }},
    {
        field: 'isPaid',
        headerName: 'Pagado',
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <Select
                    value={row.isPaid}
                    label="Pagado"
                    onChange={ ({target}) => {onSatusUpdated(row.id, row.currentState,
                                              target.value === 'true' ? true : false)}}
                    sx={{widht: '300px'}}
                >
                    <MenuItem value='false'>No Pagado</MenuItem>
                    <MenuItem value='true'>Pagado</MenuItem>
                </Select>
            )
        }
    },
    { field: 'inStock', headerName: 'No. Productos', align: 'center', width: 150 },
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <a href={`/admin/orders/${row.id}`} target="_blank" rel='noreferrer'>
                    Ver orden
                </a>
            )
        }
    },
    { field: 'createdAt', headerName: 'Creada en', width: 300 },
];

    //const {data, error} = useSWR<IOrder[]>('/api/admin/orders');

    if(!data && !error) {
        return <></>
    }

    const rows = (data! || []).map(order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: order.total,
        currentState: order.currentState,
        isPaid: order.isPaid,
        inStock: order.numberOfItems,
        createdAt: order.createdAt,
    }));

    return (
        <AdminLayout
            title='Ordenes'
            subTitle='Mantenimiento de ordenes'
            icon={<ConfirmationNumberOutlined/>}
        >
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx ={{ height:450, width:'100%'}}>
                    <DataGrid
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={ [10] }
                    />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default OrdersPage