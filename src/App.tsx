import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ScrollToAnchor } from './components/ScrollToAnchor';
// Hidden until the aftercare copy is written; see the nav entry in content.ts.
// import { Aftercare } from './pages/Aftercare';
import { ClientResults } from './pages/ClientResults';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Treatments } from './pages/Treatments';

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToAnchor />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/client-results" element={<ClientResults />} />
          {/* <Route path="/aftercare" element={<Aftercare />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
