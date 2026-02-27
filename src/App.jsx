import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <NotificationProvider>
              <HomePage />
            </NotificationProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
