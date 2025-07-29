
// We can use the products and other things given to us by the fakestore API
// using the useState and useEffect hooks
import { LoadingOverlay } from '@mantine/core';
import useFetchProductListing from "../services/product/useFetchProductListing";
import ProductsGrid from "../components/Home Components/productsGrid";
import Pagination_Component from "../components/Home Components/paginationComp";

export default function home(){
  
  // This hook will return/handle the API calls
  const {products, limit, setLimit, activePage, 
    setActivePage, loadingState, errorState} = useFetchProductListing(); 
 
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

  return (
    <>
      {/* Products Grid Component: */}
      <ProductsGrid products={products} />

      {/* Pagination & Select Component:  */}
      <Pagination_Component limit={limit} setLimit={setLimit} 
        activePage={activePage} setActivePage={setActivePage} />

    </> 
  );
}

// Left to Do:
// 1. Cart's Page
// 2. Wishlist Page
// 3. Adding Buy Now Button in the product details page
// 4. Experiment with additional query
