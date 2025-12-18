import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Layouts
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";

// Client Pages
import ClientTicketsList from "./pages/client/ClientTicketsList";
import ClientTicketDetail from "./pages/client/ClientTicketDetail";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTicketsList from "./pages/admin/AdminTicketsList";
import AdminTicketDetail from "./pages/admin/AdminTicketDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Client Routes */}
          <Route path="/support" element={<ClientLayout />}>
            <Route path="tickets" element={<ClientTicketsList />} />
            <Route path="tickets/:id" element={<ClientTicketDetail />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/support" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="tickets" element={<AdminTicketsList />} />
            <Route path="tickets/:id" element={<AdminTicketDetail />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
