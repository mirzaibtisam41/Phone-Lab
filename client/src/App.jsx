import {Route, Routes, Navigate} from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/orders';
import AdminFeatures from './pages/admin-view/features';
import ShoppingLayout from './components/shopping-view/layout';
import NotFound from './pages/not-found';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {checkAuth} from './store/auth-slice';
import {Skeleton} from '@/components/ui/skeleton';
import PaypalReturnPage from './pages/shopping-view/paypal-return';
import PaymentSuccessPage from './pages/shopping-view/payment-success';
import SearchProducts from './pages/shopping-view/search';
import UnauthPage from './pages/unauth-page';
import CheckAuth from './components/common/check-auth';

function App() {
  const {user, isAuthenticated, isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-full bg-black h-screen" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Redirect "/" to "/shop/home" */}
        <Route path="/" element={<Navigate to="/shop/home" replace />} />

        {/* Login & Register pages - accessible without authentication */}
        {!isAuthenticated ? (
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
        ) : null}

        {user?.role === 'admin' ? (
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
        ) : null}

        {/* Admin pages require authentication */}

        {/* Shopping pages - accessible without authentication */}
        {user?.role === 'user' || !isAuthenticated ? (
          <Route path="/shop" element={<ShoppingLayout />}>
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="paypal-return" element={<PaypalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="search" element={<SearchProducts />} />
          </Route>
        ) : null}

        {/* Unauthorized Page */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
