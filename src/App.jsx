import { useState } from "react";
import MainLayout from "./components/layouts/MainLayout";
import Header from "./components/Header";

function App() {
   return (
     <MainLayout>
        <div className="mx-auto max-w-6xl">
          <Header/>
          {/* products list */}
        </div>
     </MainLayout>
   )
}

export default App;
