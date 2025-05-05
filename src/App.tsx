
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
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
import InspectionMissions from './pages/InspectionMissions';
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
              <ProtectedRoute element={<Index />} />
            } />
            <Route path="/profile" element={
              <ProtectedRoute element={<Profile />} />
            } />
            <Route path="/settings" element={
              <ProtectedRoute element={<Settings />} requiredPermission="manage_settings" />
            } />
            <Route path="/certification-request" element={
              <ProtectedRoute element={<CertificationRequest />} requiredPermission="register_requests" />
            } />
            <Route path="/certification-requests" element={
              <ProtectedRoute element={<CertificationRequests />} requiredPermission="view_all_requests" />
            } />
            <Route path="/certifications" element={
              <ProtectedRoute element={<Certifications />} />
            } />
            <Route path="/documents" element={
              <ProtectedRoute element={<Documents />} />
            } />
            <Route path="/history" element={
              <ProtectedRoute element={<History />} />
            } />
            <Route path="/users" element={
              <ProtectedRoute element={<Users />} requiredPermission="manage_users" />
            } />
            <Route path="/test-parameters" element={
              <ProtectedRoute element={<TestParameters />} requiredPermission="manage_test_parameters" />
            } />
            <Route path="/standards" element={
              <ProtectedRoute element={<Standards />} />
            } />
            <Route path="/laboratories" element={
              <ProtectedRoute element={<Laboratories />} requiredPermission="assign_laboratories" />
            } />
            <Route path="/inspections" element={
              <ProtectedRoute element={<Inspections />} requiredPermission="plan_inspections" />
            } />
            <Route path="/inspection-missions" element={
              <ProtectedRoute element={<InspectionMissions />} requiredPermission="perform_inspection" />
            } />
            <Route path="/reports" element={
              <ProtectedRoute element={<Reports />} requiredPermission="view_reports" />
            } />
            <Route path="/fees-calculation" element={
              <ProtectedRoute element={<FeesCalculation />} requiredPermission="manage_fees" />
            } />
            <Route path="/payments" element={
              <ProtectedRoute element={<Payments />} requiredPermission="manage_payments" />
            } />
            <Route path="/notifications" element={
              <ProtectedRoute element={<Notifications />} />
            } />
            <Route path="/companies" element={
              <ProtectedRoute element={<Companies />} requiredPermission="view_companies" />
            } />
            <Route path="/support" element={
              <ProtectedRoute element={<Support />} />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
