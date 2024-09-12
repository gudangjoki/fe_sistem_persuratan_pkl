import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Content from '../components/Content';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useAxiosReload } from '../hooks/useAxiosReload';
import { AxiosContentProvider } from '../contexts/AxiosReloadContext';
import OverlayItem from "../components/OverlayItem";
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { axiosReload } = useAxiosReload();
  const { setUser } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSelfData = async () => {
      try {
        const response = await axiosReload.get('http://localhost:8000/api/me', {
          signal: controller.signal
        });
        if (isMounted) {
          setUser(response?.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getSelfData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosReload, setUser]);

  return (
    <AxiosContentProvider>
      <div className="bg-gray-50 transition-all duration-300 lg:hs-overlay-layout-open:ps-[260px]">
        <main id="content">
          <Header />
          <Sidebar />
          <motion.div className="h-screen bg-gray-100 content-wrapper"
            initial={{ opacity: 0, y: 50 }}  // Starts from below and transparent
            animate={{ opacity: 1, y: 0 }}   // Ends at normal position and fully visible
            transition={{ duration: 0.6 }}
          >
            <Outlet />
          </motion.div>
          <OverlayItem 
            contentId="notification-overlay" 
            title="Notification" 
            content="This is a notification overlay content." 
          />
        </main>
      </div>
    </AxiosContentProvider>
  );
};

export default Dashboard;
