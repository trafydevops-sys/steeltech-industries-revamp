/* Design philosophy: Rugged Industrial Editorial. The app shell stays quiet so each page's hierarchy and product proof lead. */
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductsHub from "./pages/ProductsHub";
import ProductDetail from "./pages/ProductDetail";
import Accessories from "./pages/Accessories";
import Quality from "./pages/Quality";
import Installation from "./pages/Installation";
import Clientele from "./pages/Clientele";
import ClienteleInfo from "./pages/ClienteleInfo";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products" component={ProductsHub} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/accessories" component={Accessories} />
      <Route path="/quality" component={Quality} />
      <Route path="/installation" component={Installation} />
      <Route path="/clientele" component={Clientele} />
      <Route path="/clientele/:slug" component={ClienteleInfo} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <MotionConfig reducedMotion="user">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </MotionConfig>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
