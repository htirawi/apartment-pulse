// Styles
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import ErrorBoundary from '@/components/ErrorBoundary';
import { GlobalProvider } from '@/context/GlobalContext';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'ApartmentRental | Find the best apartment for rent in your city',
  description: 'Find the best apartment for rent in your city',
  keywords: 'apartment, rental, rent, city, find, best',
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ErrorBoundary>
      <GlobalProvider>
        <AuthProvider>
          <html lang="en">
            <body>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ToastContainer />
            </body>
          </html>
        </AuthProvider>
      </GlobalProvider>
    </ErrorBoundary>
  );
};

export default MainLayout;
