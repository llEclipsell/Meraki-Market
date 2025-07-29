
// This will be used as a higher order component to wrap the PrivateRoutes component

import { Link, useLocation } from 'react-router';
import { NavLink, Flex } from '@mantine/core';
import { useSelector } from 'react-redux';

export default function AppContainer(props) {
    const location = useLocation();
    
    // Using useSelector to access the user state from Redux store
    const user = useSelector(state => state.user.user); 
    // console.log(user)
    
    return(
        <>
            <header style={{ background: "#f0f0f0" }}>
                    {/* M1: We couldve used: <Link to="/products"> Products </Link> , But styling would be hard */}

                    {/* M2: So we are using Mantine's NavLink component to create a navigation bar */}
                    <Flex gap= "sm" justify="center" align="center" direction="row" wrap="nowrap" 
                        style={{ padding: '1.5rem' }}>
                        <NavLink
                            component={Link}
                            to="/products"
                            label="Products"
                            active={location.pathname === '/products'}
                            variant='filled'
                            color='black'
                        />
                        <NavLink
                            component={Link}
                            to="/wishlist"
                            label="Wishlist"
                            active={location.pathname === '/wishlist'}
                            variant='filled'
                            color='black'
                        />
                        <NavLink
                            component={Link}
                            to="/cart"
                            label="Cart"
                            active={location.pathname === '/cart'}
                            variant='filled'
                            color='black'
                        />
                    </Flex>
            </header>
            {props.children}
        </>
    )
}