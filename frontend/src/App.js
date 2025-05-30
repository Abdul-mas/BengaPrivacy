import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/", element: _jsx(PrivacyForm, {}) }), _jsx(Route, { path: "/request", element: _jsx(RequestServicePage, {}) }), _jsx(Route, { path: "/requester/:id/request", element: _jsx(RequesterRequestPage, {}) }), _jsx(Route, { path: "/provider/service", element: _jsx(ProviderServicePage, {}) }), _jsx(Route, { path: "/register", element: _jsx(SelectionPage, {}) }), _jsx(Route, { path: "/register/requester", element: _jsx(RequesterRegistrationPage, {}) }), _jsx(Route, { path: "/register/provider", element: _jsx(ProviderRegistrationPage, {}) }), _jsx(Route, { path: "/provider/dashboard", element: _jsx(ProviderDashboardPage, {}) }), _jsx(Route, { path: "/match-result", element: _jsx(RequesterMatchResultPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }));
}
