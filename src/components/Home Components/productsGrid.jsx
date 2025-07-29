
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Grid, Card, Image, Text, Badge, Group } from '@mantine/core';
import useFetchProductListing from "../../services/product/useFetchProductListing";
import WishlistButton from './wishlistButton'
import CartButton from '../cartButton'

export default function productsGrid(props) {

    // Product needs to remain as a prop to help with pagination to change the home.jsx
    const { products } = props

    // Constants:
    const navigate = useNavigate(); 

    const { cartQuantities, setCartQuantities } = useFetchProductListing();

    // Wishlist State:
    const [wishlistState, setWishlistState] = useState([]);
    
    return(
        <>
            {/* So with the help of Mantine's Grid component, 
            we can display the products in a grid layout which is responsive
            
            The Column Width -> small screens(base): 12/12, 
            medium screens(md): 6/12, large screens(lg): 3/12 */}

            <Grid>
                {/* We use the '?' as a safety measure , if the product is not defined yet to not throw errors */}
                
                {/* The map function will iterate over each product and display it like a loop */}
                { products?.map((product) => 
                    // The {} indicates that we are returning an object
                    <Grid.Col key={product.id} span={{ base: 12, md: 6, lg: 3 }}>
                    
                        {/* Similarily for the cards inside as well, using mantine UI */}
                        {/* We can use mah: to set max sixe of the card and style={{overflow:'scroll'}} 
                            to give it a scroll */}
                        <Card onClick = {() =>{
                            navigate(`/products/${product.id}`,{  // Navigate to the product details page
                                preventScrollReset: false           
                            });  
                        }} shadow="sm" padding="lg" radius="md" withBorder>
                            
                            <Card.Section>
                            <Image
                                // src={product?.image}
                                src={product.images?.[0]}
                                height={200}
                            />
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>{product.title}</Text>
                            <Badge color="pink">{product.category}</Badge>
                            </Group>

                            <Text fz={20} fw={500}>${product.price}</Text>

                            < WishlistButton setWishlistState={setWishlistState} product={product} />

                            < CartButton cartQuantities={cartQuantities} 
                            setCartQuantities={setCartQuantities} product={product} />

                        </Card>
                    </Grid.Col>
                )}
            </Grid>
        </>
    )
}