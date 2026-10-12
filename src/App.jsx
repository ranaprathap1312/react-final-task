import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import ServicesPage from './pages/ServicesPage';
import BookingsPage from './pages/BookingsPage';
import ExplorePage from './pages/ExplorePage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Nested Sub-Pages for /services
import SpaSubPage from './pages/services/SpaSubPage';
import DiningSubPage from './pages/services/DiningSubPage';
import AdventuresSubPage from './pages/services/AdventuresSubPage';
import EventsSubPage from './pages/services/EventsSubPage';

import { initialBookings } from './data/initialBookings';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useLocalStorage('aurelia_guest_bookings', initialBookings);

  const handleBookingCreated = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
    navigate('/bookings');
  };

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* 1. Home Page */}
          <Route path="/" element={<HomePage onBookingCreated={handleBookingCreated} />} />

          {/* 2. Suites & Villas Collection (useSearchParams) */}
          <Route path="/rooms" element={<RoomsPage onBookingCreated={handleBookingCreated} />} />

          {/* Dynamic Route: Room Detail (useParams) */}
          <Route path="/rooms/:roomId" element={<RoomDetailPage onBookingCreated={handleBookingCreated} />} />

          {/* 3. NESTED ROUTING: Services & Experiences */}
          <Route path="/services" element={<ServicesPage />}>
            <Route index element={<Navigate to="spa" replace />} />
            <Route path="spa" element={<SpaSubPage />} />
            <Route path="dining" element={<DiningSubPage />} />
            <Route path="adventures" element={<AdventuresSubPage />} />
            <Route path="events" element={<EventsSubPage />} />
          </Route>

          {/* 4. Reservations & Management (FULL CRUD OPERATIONS) */}
          <Route path="/bookings" element={<BookingsPage />} />

          {/* 5. Explore & Local Attractions (API INTEGRATION & useFetch) */}
          <Route path="/explore" element={<ExplorePage />} />

          {/* 6. Guest Wishlist & Itinerary (REDUX TOOLKIT) */}
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* 7. Resort Heritage & Leadership (useRef) */}
          <Route path="/about" element={<AboutPage />} />

          {/* 8. VIP Concierge & Inquiry (FORM VALIDATION & useRef) */}
          <Route path="/contact" element={<ContactPage />} />

          {/* 404 Fallback Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
