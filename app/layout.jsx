import '@/assets/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'photoswipe/dist/photoswipe.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/context/GlobalContext';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'ApartmentRental | Find the best apartment for rent in your city',
  description: 'Find the best apartment for rent in your city',
  keywords: 'apartment, rental, rent, city, find, best',
};

const MainLayout = ({ children }) => {
  return (
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
  );
};

export default MainLayout;
