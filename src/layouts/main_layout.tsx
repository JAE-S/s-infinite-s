// React Core Imports
import React, { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main
      data-testid="main-container"
      className="h-screen max-h-screen grow bg-gray-100 px-20 py-12"
    >
      {children}
    </main>
  );
};

export default MainLayout;
