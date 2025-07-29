
import { Stack, Image, Group } from '@mantine/core';
import CartButton from "../components/cartButton";
import useFetchProduct from "../services/product/useFetchProduct";
import PaymentButton from "../components/singlePaymentButton";

export default function productDetails(){

    const { product, cartQuantities, setCartQuantities } = useFetchProduct()

    return (
        <>
            <Group 
                direction="column" 
                position="center" 
                align="center" 
                mt="0.5rem"
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",       
                    margin: "100px auto",    
                    padding: "2rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(3, 2, 2, 0.1)" 
                }}
            >
            <Image style={{
                maxWidth: '100%',
                maxHeight: '500px',
                objectFit: 'contain'
            }}
                radius='md'
                // src={product?.image}
                src={product.images?.[0]}
            />
            <Stack>
                <h1>Product Details</h1>
                <p>{product?.title}</p>
                <h2>Product Description</h2>
                <p>{product?.description}</p>
                <h1>Product Price: </h1>
                <p style={{fontSize: "20px", fontWeight: "bold" }}>${product?.price}</p>
                
            </Stack>

            < CartButton cartQuantities={cartQuantities} setCartQuantities={setCartQuantities} product={product} />
            
            <PaymentButton product={product} cartQuantities={cartQuantities} />

            </Group>
        </>     
    )
}