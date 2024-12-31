import AdminPage from "../pages/Admin/AdminPage";
import HomePage from "../pages/Home/HomePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import MyOrdersPage from "../pages/Order/MyOrderPage";
import OrderPage from "../pages/Order/OrderPage";
import ProductPage from "../pages/Product/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import AboutPage from '../pages/About/AboutPage';

export const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader:true
    },
    {
        path: "/Order",
        page: OrderPage,
        isShowHeader:true

    },
    {
        path: "/Product",
        page: ProductPage,
        isShowHeader:true

    },
    // {
    //     path: "/Product/:type",
    //     page: TypeProductPage,
    //     isShowHeader:true

    // },
    {
        path: "/ProductDetail/:id",
        page: ProductDetailPage,
        isShowHeader:true

    },
    {
        path: "/sign-in",
        page: SignInPage,
        isShowHeader:false

    },
    {
        path: "/sign-up",
        page: SignUpPage,
        isShowHeader:false

    },
    {
        path: "/Profile",
        page: ProfilePage,
        isShowHeader:true

    },
    {
        path: "/MyOrders",
        page: MyOrdersPage,
        isShowHeader:true

    },
    {
        path: "/system/admin",
        page: AdminPage,
        isShowHeader:false,
        isPrivate:true,

    },
    {
        path: '/about',
        page: AboutPage,
        isShowHeader:true,

    },
    {
        path: "*",
        page: NotFoundPage
    }
]
