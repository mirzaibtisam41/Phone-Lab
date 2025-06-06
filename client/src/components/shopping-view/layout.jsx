import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "../common/footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ShoppingHeader />

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default ShoppingLayout;
