
import { Button, Flex, NumberInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export default function CartButton(props) {

    const{ cartQuantities, setCartQuantities, product } = props
    
    // Cart States:
    const [cartState, setCartState] = useState([]);
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const handleAddToCart = (e,product) => {
        e.stopPropagation();

        const isAuth = localStorage.getItem("isAuthenticated");
        if(!isAuth || isAuth !== "true") {
            notifications.show({
            title: 'Please Login',
            message: 'You need to login to add products to your Cart!',
            color: 'red',
        })
            navigate("/login");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart"));
        if(!cart){   
            let newCart = [];
            newCart.push(product);
            localStorage.setItem("cart", JSON.stringify(newCart));
            
            // For the initial item, we need to set it to 1
            setCartQuantities((prev) => ({
                ...prev,
                [product.id]: (prev[product.id] || 1)
            }));
            setCartState(product);

            notifications.show({
                title: 'Added to Cart',
                message: `No of Items in Cart: ${storedCart.length+1}`,
                color: 'green',
            })
            return true;
        }
        if(cart.length >= 0){  
            const modifiedCart = [...cart];
            modifiedCart.push(product);
            localStorage.setItem("cart", JSON.stringify(modifiedCart));

            setCartQuantities((prev) => ({
                ...prev,
                [product.id]: (prev[product.id] || 1)
            }));
            setCartState(product);
            
            notifications.show({
                title: 'Added to Cart',
                message: `No of Items in Cart: ${storedCart.length+1}`,
                color: 'green',
            })
            return true; 
        }
    }

    return(
        // We have to create a object to use if-else conditionals
        <>  
            { 
                (() => {
                    if (storedCart?.find(item => item.id === product.id)) {
                        return (
                            <Flex key={product.id} gap= "md" justify="center" align="center" 
                                direction="row" wrap="nowrap" mt='md' radius="md">
                            {/* We are tying the product id to the buttons so that they inc. and dec. correctly */}
                                <Button
                                    style={{backgroundColor: "black"}}
                                    onClick={(e) => {
                                        e.stopPropagation()
            
                                        setCartQuantities(prev => {
                                        const newQty = Math.max((prev[product.id] || 1) - 1, 0);
                                            if (newQty === 0) {
                                                // Remove from storedCart, As the above condition(parent-if) 
                                                // would prevent us, from going back to the Add to Cart Button, 
                                                // so we have to remove the product
                                                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                                                const filtered = cart.filter(item => item.id !== product.id);
                                                localStorage.setItem("cart", JSON.stringify(filtered));
                                            }
                                            return { ...prev, [product.id]: newQty };
                                        });
                                    }}
                                > - </Button>
        
                                <NumberInput
                                    hideControls
                                    style={{border: '2px solid black', width: "200px", borderRadius: '5px' }}
                                    min={0}
                                    value={cartQuantities[product.id] || 1} 
                                    onChange={(val) => setCartQuantities((prev) => ({
                                        ...prev,
                                        [product.id]: val
                                    }))}
                                    onClick={(e) => e.stopPropagation()}
                                />
        
                                <Button
                                    style={{backgroundColor: "black"}}
                                    onClick={(e) => {
                                    e.stopPropagation()
                                    setCartQuantities((prev) => ({
                                        ...prev,
                                        [product.id]: (prev[product.id] || 1) + 1
                                    }));
                                }}
                                > + </Button>  
                            </Flex>
                        );
                    } 
                    // These conditions ensure that even if there is no/undefined/0 quantities 
                    // in the cartQuantities array Add to Cart is displayed
                    else if (cartQuantities[product.id] === undefined || cartQuantities[product.id] === 0) {
                        return (
                            <Button 
                                color="black" 
                                fullWidth mt="md" radius="md"
                                onClick={(e) => {handleAddToCart(e, product)}}
                            >
                                Add to Cart
                            </Button>
                        );
                    }
                })() 
            }
        </>
    )
}