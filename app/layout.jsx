import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Apartment Rental | Find the best apartment for rent in your city',
  description: 'Find the best apartment for rent in your city',
  keywords: 'apartment, rental, rent, city, find, best',
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div id="app">
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
};

export default MainLayout;