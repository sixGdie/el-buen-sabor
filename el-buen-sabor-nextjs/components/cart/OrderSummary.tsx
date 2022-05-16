import { Grid, Typography } from "@mui/material"


export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>3</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{`$${ 105.36 }`}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{`$${ 15.36 }`}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Costo de envío</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{`$${ 100 }`}</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt:2 }}>
            <Typography variant="subtitle1">{`$${ 1025.36 }`}</Typography>
        </Grid>

    </Grid>
  )
}
