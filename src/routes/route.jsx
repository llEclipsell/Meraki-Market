
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router";

import Home from '../pages/home'
import App from '../App'
import LoginPage from '../pages/loginPage'
import PrivateRouting from './privateRoutes'
import ProductDetails from '../pages/productDetails'
import AppContainer from '../pages/appContainer'
import WishlistPage from '../pages/wishlistPage'
import CartPage from '../pages/cartPage'

const routes = createBrowserRouter(
    [
        {
            path: "/login",
            element: <LoginPage />, 
        },
        {
            path: "/",
            element: <AppContainer>
                        <PrivateRouting />
                    </AppContainer>,
            children:[
                {
                    index: true,
                    element: <Navigate to="/products" replace />
                },
                {
                    path: "/products",  
                    element: <App />,
                    children: [
                        {
                            index: true,  
                            element: <Home />
                        },
                        {
                            path: ":id",
                            element: <ProductDetails />
                        }
                    ]
                },
                {
                    path: "/wishlist",
                    element: <WishlistPage />
                },
                {
                    path: "/cart",
                    element: <CartPage />
                },
                {
                    path: "*",
                    element: <Navigate to="/products" replace />    
                }
            ]
        }
        
    ]
)

export default function AppRouter() {
    return <RouterProvider router={routes} />
}