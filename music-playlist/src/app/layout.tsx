import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/app/components/nav/nav';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Music Playlist App',
  description: 'Listen to music!',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen max-h-screen">
          <Nav />
          <div className="flex-grow overflow-y-auto bg-page text-default-text">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;