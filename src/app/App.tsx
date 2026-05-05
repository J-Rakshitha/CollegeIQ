import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import ComparePage from './pages/ComparePage';
import PersonalizePage from './pages/PersonalizePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/college/:id" element={<CollegeDetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/personalize" element={<PersonalizePage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
