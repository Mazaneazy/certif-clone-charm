
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Documents from "./pages/Documents";
import Certifications from "./pages/Certifications";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Pages à créer plus tard
import Inspections from "./pages/Inspections";
import Standards from "./pages/Standards";
import Payments from "./pages/Payments";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Companies from "./pages/Companies";

// Nouvelles pages
import CertificationRequest from "./pages/CertificationRequest";
import CertificationRequests from "./pages/CertificationRequests";
import TestParameters from "./pages/TestParameters";
import FeesCalculation from "./pages/FeesCalculation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/inspections" element={<Inspections />} />
            <Route path="/standards" element={<Standards />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/companies" element={<Companies />} />
            
            {/* Nouvelles routes */}
            <Route path="/certification-request" element={<CertificationRequest />} />
            <Route path="/certification-requests" element={<CertificationRequests />} />
            <Route path="/test-parameters" element={<TestParameters />} />
            <Route path="/fees-calculation" element={<FeesCalculation />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
