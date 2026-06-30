import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ServicesOverview from "./pages/ServicesOverview";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Policy from "./pages/Policy";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter basename="/pet-plus">
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="loja" element={<Shop />} />
                <Route path="loja/:slug" element={<ProductDetail />} />
                <Route path="carrinho" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="servicos" element={<ServicesOverview />} />
                <Route path="servicos/:slug" element={<ServiceDetail />} />
                <Route path="sobre" element={<About />} />
                <Route path="conta" element={<Account />} />
                <Route path="contato" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="politicas/:type" element={<Policy />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
