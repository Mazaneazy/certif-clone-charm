
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import AppLayout from './components/layout/AppLayout';

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
            <Route path="/" element={
              <AppLayout>
                <Index />
              </AppLayout>
            } />
            <Route path="/profile" element={
              <AppLayout>
                <Profile />
              </AppLayout>
            } />
            <Route path="/settings" element={
              <AppLayout>
                <Settings />
              </AppLayout>
            } />
            <Route path="/certification-request" element={
              <AppLayout>
                <CertificationRequest />
              </AppLayout>
            } />
            <Route path="/certification-requests" element={
              <AppLayout>
                <CertificationRequests />
              </AppLayout>
            } />
            <Route path="/certifications" element={
              <AppLayout>
                <Certifications />
              </AppLayout>
            } />
            <Route path="/documents" element={
              <AppLayout>
                <Documents />
              </AppLayout>
            } />
            <Route path="/history" element={
              <AppLayout>
                <History />
              </AppLayout>
            } />
            <Route path="/users" element={
              <AppLayout>
                <Users />
              </AppLayout>
            } />
            <Route path="/test-parameters" element={
              <AppLayout>
                <TestParameters />
              </AppLayout>
            } />
            <Route path="/standards" element={
              <AppLayout>
                <Standards />
              </AppLayout>
            } />
            <Route path="/laboratories" element={
              <AppLayout>
                <Laboratories />
              </AppLayout>
            } />
            <Route path="/inspections" element={
              <AppLayout>
                <Inspections />
              </AppLayout>
            } />
            <Route path="/reports" element={
              <AppLayout>
                <Reports />
              </AppLayout>
            } />
            <Route path="/fees-calculation" element={
              <AppLayout>
                <FeesCalculation />
              </AppLayout>
            } />
            <Route path="/payments" element={
              <AppLayout>
                <Payments />
              </AppLayout>
            } />
            <Route path="/notifications" element={
              <AppLayout>
                <Notifications />
              </AppLayout>
            } />
            <Route path="/companies" element={
              <AppLayout>
                <Companies />
              </AppLayout>
            } />
            <Route path="/support" element={
              <AppLayout>
                <Support />
              </AppLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
