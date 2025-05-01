
import { Helmet } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import DirectoryDetails from "./pages/DirectoryDetails";
import NotFound from "./pages/NotFound";
import BlogList from "./blog/BlogList"; // Import BlogList
import BlogDetail from "./blog/BlogDetail"; // Import BlogDetail
import StaticPage from "./pages/StaticPage"; // Import StaticPage
import { useState } from "react";

const App = () => {
  // Create a new QueryClient instance inside the component
  // This ensures hooks are only called within the component context
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <title>My Awesome React App</title> {/* TODO: Replace with actual site name */}
        <meta name="description" content="A fantastic application built with React." /> {/* TODO: Replace with actual site description */}
      </Helmet>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/directory/:id" element={<DirectoryDetails />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/blog" element={<BlogList />} /> {/* Blog List Route */}
              <Route path="/blog/:slug" element={<BlogDetail />} /> {/* Blog Detail Route */}
              {/* Dynamic route for static pages */}
              <Route path="/page/:slug" element={<StaticPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
