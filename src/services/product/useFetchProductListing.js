
import { useEffect, useState } from "react";

export default function useFetchProductListing() {

    // States:
    const [products, setProducts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loadingState, setLoadingState] = useState(false);
    const [errorState, setErrorState] = useState(null); 

    // Cart States:
    const [cartState, setCartState] = useState(() =>
        JSON.parse(localStorage.getItem('cart')) || []
    );
    // This ensures that the cartQuantities is pulled from the local storage
    const [cartQuantities, setCartQuantities] = useState(() =>
        JSON.parse(localStorage.getItem('cartQuantities')) || {}
    );
    // This ensures that local storage is updated based on the,
    // changed values in cartQuantities after re-rendering(reloading)/mounting
    useEffect(() => {
        localStorage.setItem('cartQuantities', JSON.stringify(cartQuantities));
    }, [cartQuantities]);
    // whenever quantities change (i.e. you removed an item), re‑read localStorage
    useEffect(() => {
        setCartState(JSON.parse(localStorage.getItem('cart')) || []);
    }, [cartQuantities]);

    // We use the useEffect hook to fetch the products from the API when the component mounts:
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }); // Scroll to top when the page changes

        // We need a async function for creating our own loading/error states:
        async function fetchData() {
            // We will use try-catch to create the loading/error states:
            try{
                // We will use the fetch API to get the products from DummyJson/FakestoreApi like this:
                
                //      (For DummyJson the Pagination is:)
                // fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(activePage - 1) * limit}`)
                // .then((res) => res.json())
                // .then((res) => setProducts(res.products))
                
                // We can do the above if we dont use async function, but loading/error states wont work

                // Implementing the loading state:
                setLoadingState(true)
                // If we use async function:
                
                // const data = await fetch(`https://fakestoreapi.in/api/products?page=${activePage}&limit=${limit}`)
                // const dataJson = await data.json()
                const data = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(activePage - 1) * limit}`)
                const dataJson = await data.json()
                setProducts(dataJson.products)
                
                setLoadingState(false)
            }
            catch(error){               // Implementing the error state
                setLoadingState(false)  // The loading state will be false if there is an error
                setErrorState(error)
            }
        }
        fetchData()
        
    }, [activePage, limit]);
    // We pass activePage as a dependency to the useEffect hook 
    // so that it will re-fetch the products when the activePage changes

    // Now we can destructure only the ones we need and in any order
    return {
        products, 
        limit, setLimit, 
        activePage, setActivePage, 
        loadingState, errorState,
        cartState, setCartState,
        cartQuantities, setCartQuantities
    }

}