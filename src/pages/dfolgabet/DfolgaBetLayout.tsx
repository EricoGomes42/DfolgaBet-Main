import { Outlet } from 'react-router-dom';
import DfolgaBetTopBar from './components/DfolgaBetTopBar';
import DfolgaBetHeader from './components/DfolgaBetHeader';
import DfolgaBetNavbar from './components/DfolgaBetNavbar';
import DfolgaBetFooter from './components/DfolgaBetFooter';
import AgeVerificationModal from './components/AgeVerificationModal';
import CookieConsentModal from './components/CookieConsentModal';
import AdBlockWarningModal from './components/AdBlockWarningModal';

export default function DfolgaBetLayout() {
  return (
    <div className="min-h-screen bg-[#0D021F] text-white font-sans flex flex-col">
      <DfolgaBetTopBar />
      <DfolgaBetHeader />
      <DfolgaBetNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <DfolgaBetFooter />
      <CookieConsentModal />
      <AgeVerificationModal />
    </div>
  );
}
