import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./pages/route/PrivateRoute";
import LoadingUI from "./components/custom/LoadingUI";
import SessionManager from "./pages/Auth/SessionManager";
import ScrollToTop from "./utils/ScrollToTop";
import useDeviceType from "./utils/useDeviceType";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const Home = lazy(() => import("@/pages/Home/HomePage"));
const Tracks = lazy(() => import("@/pages/Tracks/TracksPage"));
const Event = lazy(() => import("@/pages/Event/EventPage"));
const Previous = lazy(() => import("@/pages/Previous/PreviousPage"));
const PreviousDetailPage = lazy(() =>
  import("@/pages/Previous/PreviousDetailPage")
);
const Reservation = lazy(() => import("@/pages/Reservation/ReservationPage"));
const ApiTest = lazy(() => import("@/pages/ApiTest"));

const SignIn = lazy(() => import("@/pages/Auth/SigninPage"));
const ReservationList = lazy(() =>
  import("@/pages/Reservation/ReservationListPage")
);

const Privacy = lazy(() => import("@/pages/Home/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFoundPage"));

function App() {
  useDeviceType();

  return (
    <BrowserRouter basename="/2025">
      <ScrollToTop />
      <Suspense fallback={<LoadingUI />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/event" element={<Event />} />
            <Route path="/previous" element={<Previous />}></Route>
            <Route path="/previous/:id" element={<PreviousDetailPage />} />
            <Route path="/reserve" element={<Reservation />} />
            <Route path="/test" element={<ApiTest />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/mktadmin"
              element={
                <PrivateRoute>
                  <SessionManager />
                  <ReservationList />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
