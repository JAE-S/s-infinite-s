// React Core Imports
import React from 'react';
// Internal Component Imports
import HomeHeader from './components/home-header';
import ProductList from './components/product-list';
import HomeFooter from './components/home-footer';

const HomeDashboardView: React.FC = () => {
  return (
    <section className="h-full">
      <HomeHeader />
      <ProductList />
      <HomeFooter />
    </section>
  );
};

export default HomeDashboardView;
