import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import CertificationRequests from './pages/CertificationRequests';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import CertificationRequest from './pages/CertificationRequest';
import Certifications from './pages/Certifications';
import Documents from './pages/Documents';
import History from './pages/History';
import Users from './pages/Users';
import TestParameters from './pages/TestParameters';
import Standards from './pages/Standards';
import Laboratories from './pages/Laboratories';
import Inspections from './pages/Inspections';
import Reports from './pages/Reports';
import FeesCalculation from './pages/FeesCalculation';
import Payments from './pages/Payments';
import Notifications from './pages/Notifications';
import Companies from './pages/Companies';
import Support from './pages/Support';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/certification-request" element={<CertificationRequest />} />
            <Route path="/certification-requests" element={<CertificationRequests />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/history" element={<History />} />
            <Route path="/users" element={<Users />} />
            <Route path="/test-parameters" element={<TestParameters />} />
            <Route path="/standards" element={<Standards />} />
            <Route path="/laboratories" element={<Laboratories />} />
            <Route path="/inspections" element={<Inspections />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/fees-calculation" element={<FeesCalculation />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
