import '@/assets/styles/globals.css';
import { ToastContainer } from 'react-toastify';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import AuthProvider from '@/components/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Apartment Rental | Find the best apartment for rent in your city',
  description: 'Find the best apartment for rent in your city',
  keywords: 'apartment, rental, rent, city, find, best',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="#" />
        </head>
        <body>
          <div id="app">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
