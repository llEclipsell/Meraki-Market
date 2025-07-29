
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import './wishlistBtn.css'

export default function WishlistButton(props){

    // Wishlist States (We need them to passed as props to update the home page):
    const { setWishlistState, product } = props
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const handleAddToWishlist = (e,product) => {
        e.stopPropagation(); // Prevent the card click(parent) event from triggering

        const isAuth = localStorage.getItem("isAuthenticated");
        if(!isAuth || isAuth !== "true") {
            notifications.show({
                title: 'Please Login',
                message: 'You need to login to add products to your wishlist!',
                color: 'red',
            })
            navigate("/login");
            return;
        }

        // Note: This can only accept a single product at a time,
        // localStorage.setItem("wishlist", JSON.stringify(product));
        // So, we will do this:

        const wishlist = JSON.parse(localStorage.getItem("wishlist"));
        
        // If wishlist is not defined, we will create a new one (The first element)
        if(!wishlist){        
            let newWishlist = [];
            newWishlist.push(product);
            localStorage.setItem("wishlist", JSON.stringify(newWishlist));

            // We will update the wishlist state to re-render the UI and disable the button below
            // (I just need it to re-trigger so dont need to store evrything) 
            setWishlistState(product);

            notifications.show({
                title: 'Added to Wishlist',
                message: `Wishlisted ${storedWishlist.length+1} items`,
                color: 'blue',
            })
            return true;        // We return true to indicate that the product was added to the wishlist
        }
        // If wishlist is defined, we will add the product to it(The next elements)
        if(wishlist.length >= 0){  
            const modifiedWishlist = [...wishlist];
            modifiedWishlist.push(product);
            localStorage.setItem("wishlist", JSON.stringify(modifiedWishlist));
            setWishlistState(product);
        
            notifications.show({
                title: 'Added to Wishlist',
                message: `Wishlisted ${storedWishlist.length+1} items`,
                color: 'blue',
            })
            return true; 
        }
    }   

    return(
            <Button
            className= 'button' 
            color="white" 
            fullWidth mt="xs" radius="md"
            style={{color: 'black', border: '2px solid black'}}
            onClick={(e) => handleAddToWishlist(e, product)}
            disabled={storedWishlist?.find((item) => item.id === product.id)}
        >       
            {storedWishlist?.find((item) => item.id === product.id) ? "Wishlisted" : "Add to Wishlist"}
        </Button>
    )
}