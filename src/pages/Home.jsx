import React, { Suspense } from "react";

const ProductList = React.lazy(() => import("../components/ProductList"));

const Home = () => {
  return (
    <div className="home">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
};

export default Home;
