// --- frontend/src/App.tsx ---

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivacyForm from './components/PrivacyForm';
import RequestServicePage from './pages/RequesterServicePage';
import ProviderServicePage from './pages/ProviderServicePage';

import RequesterRequestPage from './pages/RequesterServicePage';

import HomePage from './pages/HomePage';

import RequesterRegistrationPage from './pages/RequesterRegistrationPage';
import ProviderRegistrationPage from './pages/ProviderRegistrationPage';
import SelectionPage from './pages/SelectionPage';

import ProviderDashboardPage from './pages/ProviderDashboardPage';
import RequesterMatchResultPage from './pages/RequesterMatchResultPage';

import NotFound from './pages/NotFound';




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/" element={<PrivacyForm />} />
        <Route path="/request" element={<RequestServicePage />} />
        <Route path="/requester/:id/request" element={<RequesterRequestPage />} />
        <Route path="/provider/service" element={<ProviderServicePage />} />

        <Route path="/register" element={<SelectionPage />} />
        <Route path="/register/requester" element={<RequesterRegistrationPage />} />
        <Route path="/register/provider" element={<ProviderRegistrationPage />} />
        <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
        <Route path="/match-result" element={<RequesterMatchResultPage />} />

        <Route path="*" element={<NotFound />} />
        



        {/* Placeholder for future requester request page */}
      </Routes>
    </Router>
  );
}
