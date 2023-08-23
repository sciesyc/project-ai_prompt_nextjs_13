import Navbar from '@components/navbar';
import Provider from '@components/provider';

import '@styles/globals.css';

export const metadata = {
  title: 'Promptopia',
  descriptions: 'Discover and Share AI prompts',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Navbar />

          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
