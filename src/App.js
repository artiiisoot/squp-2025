import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./pages/route/PrivateRoute";
import LoadingUI from "./components/custom/LoadingUI";
import SessionManager from "./pages/Auth/SessionManager";
import ScrollToTop from "./utils/ScrollToTop";
import useDeviceType from "./utils/useDeviceType";
import { setVh } from "./utils/setVh";
// import GoogleTagManager from "./utils/GoogleTagManager";
// import useGtmPageView from "./utils/useGtmPageView";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const HomeLayout = lazy(() => import("@/layouts/HomeLayout"));
const TracksLayout = lazy(() => import("@/layouts/TracksLayout"));
const EventLayout = lazy(() => import("@/layouts/EventLayout"));
const PreviousLayout = lazy(() => import("@/layouts/PreviousLayout"));
const PreviousDetailLayout = lazy(() =>
  import("@/layouts/PreviousDetailLayout")
);
const ReservationLayout = lazy(() => import("@/layouts/ReservationLayout"));
const ReservationListLayout = lazy(() =>
  import("@/layouts/ReservationListLayout")
);

const ApiTest = lazy(() => import("@/pages/ApiTest"));

const SignIn = lazy(() => import("@/pages/Auth/SigninPage"));

const NotFound = lazy(() => import("@/pages/NotFoundPage"));

function App() {
  useDeviceType();
  // useGtmPageView();

  // 개발 버전 분기
  const [isDevMode, setIsDevMode] = useState(true);

  useEffect(() => {
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const mode = searchParams.get("mode");
  //   if (mode !== "dev") {
  //     setIsDevMode(false);
  //   }
  // }, []);

  // if (!isDevMode) {
  //   window.location.href = "/";
  //   return null;
  // }

  const isSamsungBrowser = /SamsungBrowser/i.test(navigator.userAgent);
  if (isSamsungBrowser) {
    alert(
      "삼성 브라우저에서 자동 다크모드가 적용되어 색상이 왜곡될 수 있습니다. \n Chrome 등 다른 브라우저 사용을 권장합니다."
    );
  }

  return (
    <>
      {/* <GoogleTagManager gtmId="GTM-KK24G4XW" /> */}
      <BrowserRouter basename="/2025">
        <ScrollToTop />
        <Suspense fallback={<LoadingUI />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* <Route index element={<Home />} /> */}
              <Route index element={<HomeLayout />} />
              <Route path="/tracks" element={<TracksLayout />} />
              <Route path="/event" element={<EventLayout />} />
              <Route path="/previous" element={<PreviousLayout />} />
              <Route path="/previous/:id" element={<PreviousDetailLayout />} />
              <Route path="/reservation" element={<ReservationLayout />} />
              <Route path="/test" element={<ApiTest />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/mktadmin"
                element={
                  <PrivateRoute>
                    <SessionManager />
                    <ReservationListLayout />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
