
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function useFetchProduct(){
    
    const { id } = useParams();     // Get the product ID from the URL parameters
    const [product, setProduct] = useState({});

    // Cart Quantity States:
    const [cartQuantities, setCartQuantities] = useState(() =>
        JSON.parse(localStorage.getItem('cartQuantities')) || {}
    );
    useEffect(() => {
        localStorage.setItem('cartQuantities', JSON.stringify(cartQuantities));
    }, [cartQuantities]);

    useEffect(() => {
        // Fetch the product details from the API using the product ID
        fetch(`https://dummyjson.com/products/${id}`)

        // fetch(`https://fakestoreapi.in/api/products/${id}`)
            .then((res) => res.json())
            .then((res) => setProduct(res))
            // .then((res) => setProduct(res.product))
            .catch((error) => console.error("Error fetching product details:", error));
    },[id])

    return{
        product,
        cartQuantities, 
        setCartQuantities
    }
}