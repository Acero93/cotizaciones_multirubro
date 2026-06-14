import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { QuotationProvider } from './context/QuotationContext';
import Home from './pages/Home';
import Builder from './pages/Builder';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <QuotationProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Builder />} />
          </Routes>
        </QuotationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
