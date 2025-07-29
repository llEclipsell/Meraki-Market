
import { Grid, Card, Image, Text, Badge, Group, Space, LoadingOverlay } from "@mantine/core";
import { useNavigate } from "react-router";
import useFetchProductListing from "../services/product/useFetchProductListing";
import CartButton from "../components/cartButton";
import PaymentButton from "../components/singlePaymentButton";
import BuyAll from "../components/multiPayButton"

export default function CartPage(){

    const navigate = useNavigate();
    
    const { loadingState, errorState, cartState, cartQuantities, setCartQuantities } = useFetchProductListing();

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

    // Cart's Page:
    if (cartState === "null" || cartState.length === 0) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>No products in your cart</h1>
            </div>
        );
    }
    return(
        <>
            <Grid justify="center" align="center" wrap="nowrap" style={{ padding: '1.5rem'}} >
                { cartState?.map((product) => 

                    <Grid.Col key={product.id} span={{ base: 12, md: 6, lg: 3 }}>

                        <Card onClick = {() =>{
                            navigate(`/products/${product.id}`,{  
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

                            < CartButton cartQuantities={cartQuantities} 
                                setCartQuantities={setCartQuantities} 
                                product={product} />

                            <Space h="md" />            
                            
                            <PaymentButton product={product} cartQuantities={cartQuantities} />

                        </Card>
                    </Grid.Col>
                )}
            </Grid>
            <BuyAll cart={cartState} cartQuantities={cartQuantities} />
        </>
    )
}