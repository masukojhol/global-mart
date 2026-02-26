import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <HomePage />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
