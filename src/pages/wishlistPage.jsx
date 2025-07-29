
import { useState, useEffect } from "react";
import { Grid, Card, Image, Text, Badge, Group, 
    Space, LoadingOverlay, CloseButton, Flex } from "@mantine/core";
import { useNavigate } from "react-router";
import useFetchProductListing from "../services/product/useFetchProductListing";
import CartButton from "../components/cartButton";
import PaymentButton from "../components/singlePaymentButton";

export default function WishlistPage(){

    const navigate = useNavigate();
    
    const { loadingState, errorState, cartQuantities, setCartQuantities } = useFetchProductListing();

    // Wishlist States:
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const [wishlistState, setWishlistState] = useState(() => 
        JSON.parse(localStorage.getItem('wishlist')) || []
    );
    const removeFromWishlist = (e, id) => {
        e.stopPropagation();
        const newWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
        const filtered = newWishlist.filter(item => item.id !== id);
        localStorage.setItem("wishlist", JSON.stringify(filtered));
        setWishlistState(newWishlist);
    }

    // Loading / Error Handling:
    if(loadingState) {
        return(
            <LoadingOverlay 
            visible={true} 
            zIndex={1000} 
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: 'black', type: 'bars' }} />
        )
    }
    if(errorState) {
        return <h1>Error!!</h1>
    }

    // Wishlist's Page:
    if (wishlist === "null" || wishlist.length === 0) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>No products in your wishlist</h1>
            </div>
        );
    }
    return(
        <>
            <Grid justify="center" align="center" wrap="nowrap" style={{ padding: '1.5rem'}} >
                { wishlist?.map((product) => 

                    <Grid.Col key={product.id} span={{ base: 12, md: 6, lg: 3 }}>

                        <Card onClick = {() =>{
                            navigate(`/products/${product.id}`,{  
                                preventScrollReset: false           
                            });  
                        }} shadow="sm" padding="lg" radius="md" withBorder>
                            
                            <Card.Section>
                                <Flex justify="flex-end"> 
                                    <CloseButton onClick={(e) => removeFromWishlist(e,product.id)} /> 
                                </Flex>
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

                            < CartButton cartQuantities={cartQuantities} 
                                setCartQuantities={setCartQuantities} 
                                product={product} />

                            <Space h="md" />            
                            
                            <PaymentButton product={product} cartQuantities={cartQuantities} />

                        </Card>
                    </Grid.Col>
                )}
            </Grid>
        </>
    )
}