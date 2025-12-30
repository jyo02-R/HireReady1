import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import AptitudePage from '@/components/pages/AptitudePage';
import CodingPage from '@/components/pages/CodingPage';
import ResumePage from '@/components/pages/ResumePage';
import InterviewPage from '@/components/pages/InterviewPage';
import CompaniesPage from '@/components/pages/CompaniesPage';
import PerformancePage from '@/components/pages/PerformancePage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "aptitude",
        element: <AptitudePage />,
      },
      {
        path: "coding",
        element: <CodingPage />,
      },
      {
        path: "resume",
        element: <ResumePage />,
      },
      {
        path: "interview",
        element: <InterviewPage />,
      },
      {
        path: "companies",
        element: <CompaniesPage />,
      },
      {
        path: "performance",
        element: <PerformancePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
