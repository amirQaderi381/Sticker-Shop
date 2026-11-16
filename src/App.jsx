import { useState } from "react";
import MainLayout from "./components/layouts/MainLayout";
import Header from "./components/Header";
import ProductListing from "./components/ProuctListing";

function App() {
   return (
     <MainLayout>
        <div className="mx-auto max-w-6xl">
          <Header/>
         <ProductListing/>
        </div>
     </MainLayout>
   )
}

export default App;
