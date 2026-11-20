import ScrollManager from './ScrollManager.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import ScrollToTop from './ScrollToTop.jsx';

export default function Layout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
