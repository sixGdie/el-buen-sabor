import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { SummaryTile } from '../../components/admin';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import useSWR from 'swr';
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {

    const {data, error} = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30000, // 30 segundos
    });

    const [refreshIn, setRefreshIn] = useState(30)

    useEffect(() => {
      const interval = setInterval(() => {
        setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!error && !data) {
        return <></>
    }

    if (error) {
        <Typography variant='h3'>Error al cargar la información</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;

  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadísticas generales'
        icon={<DashboardOutlined/>}
    >
        <Grid container spacing={2}>
            
            <SummaryTile 
                title={numberOfOrders}
                subTitle='Ordenes totales'
                icon={<CreditCardOutlined color='secondary' sx={{fontsize: 40}}/>}
            />

            <SummaryTile 
                title={paidOrders}
                subTitle='Ordenes pagadas'
                icon={<AttachMoneyOutlined color='success' sx={{fontsize: 40}}/>}
            />

            <SummaryTile 
                title={notPaidOrders}
                subTitle='Ordenes pendientes'
                icon={<CreditCardOffOutlined color='error' sx={{fontsize: 40}}/>}
            />

            <SummaryTile 
                title={numberOfClients}
                subTitle='Clientes'
                icon={<GroupOutlined color='primary' sx={{fontsize: 40}}/>}
            />

            <SummaryTile 
                title={numberOfProducts}
                subTitle='Productos'
                icon={<CategoryOutlined color='warning' sx={{fontsize: 40}}/>}
            />

            <SummaryTile 
                title={productsWithNoInventory}
                subTitle='Sin existencias'
                icon={<CancelPresentationOutlined color='error' sx={{fontsize: 40}}/>}
            />

            <SummaryTile 
                title={lowInventory}
                subTitle='Bajo inventario'
                icon={<ProductionQuantityLimitsOutlined color='warning' sx={{fontsize: 40}}/>}
            />

            <SummaryTile 
                title={refreshIn}
                subTitle='Ectualización en'
                icon={<AccessTimeOutlined color='secondary' sx={{fontsize: 40}}/>}
            />

        </Grid>
    </AdminLayout>
  )
}

export default DashboardPage