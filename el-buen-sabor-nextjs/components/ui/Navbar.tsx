import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';


export const Navbar = () => {
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center' underline='none'>
                    <Typography variant='h6'>El Buen Sabor |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </Link>
            </NextLink>
            
            <Box flex={1}/>

            <Box sx={{ display: {xs: 'none', sm: 'none', md: 'block'}}}>
                <NextLink href='category/bebida' passHref>
                    <Link underline='none'>
                        <Button>Bebidas</Button>
                    </Link>
                </NextLink>
                <NextLink href='category/hamburguesa' passHref>
                    <Link underline='none'>
                        <Button>Hamburguesas</Button>
                    </Link>
                </NextLink>
                <NextLink href='category/pizza' passHref>
                    <Link underline='none'>
                        <Button>Pizzas</Button>
                    </Link>
                </NextLink>
                <NextLink href='category/pancho' passHref>
                    <Link underline='none'>
                        <Button>Panchos</Button>
                    </Link>
                </NextLink>
                <NextLink href='category/guarnicion' passHref>
                    <Link underline='none'>
                        <Button>Guarniciones</Button>
                    </Link>
                </NextLink>
                <NextLink href='category/lomo' passHref>
                    <Link underline='none'>
                        <Button>Lomos</Button>
                    </Link>
                </NextLink>
                <NextLink href='category/otro' passHref>
                    <Link underline='none'>
                        <Button>Otros</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1}/>

            <IconButton>
                <SearchOutlined/>
            </IconButton>

            <NextLink href="/cart" passHref>
                <Link underline='none'>
                    <IconButton>
                        <Badge badgeContent={2} color='secondary'>
                            <ShoppingCartOutlined/>
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button>
                Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}