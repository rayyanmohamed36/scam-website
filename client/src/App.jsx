import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stories from './pages/Stories';
import Search from './pages/Search';
import ShareStory from './pages/ShareStory';
import RedFlags from './pages/RedFlags';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/share"
            element={
              <ProtectedRoute>
                <ShareStory />
              </ProtectedRoute>
            }
          />
          <Route path="/red-flags" element={<RedFlags />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
