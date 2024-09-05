import { useEffect } from 'react';
import Sidebar from '../components/SidebarHeader';
// import { axiosReload } from '../utils/axios/axiosReload';
import { useAuth } from '../hooks/useAuth';
import { useAxiosReload } from '../hooks/useAxiosReload';
import { AxiosContentProvider } from '../contexts/AxiosReloadContext';
// import { useEffect } from 'react';
// import useLogin from '../hooks/useLogin';

const Dashboard = () => {

    // const login = useLogin();

    // useEffect(() => {
    //     login();
    // }, [login]);

    const { axiosReload } = useAxiosReload();
    const { setUser } = useAuth();

    // baiknya buatkan komponen untuk profil 
    // agar semua pages bisa menjalankan fungsi axios reload
    useEffect(() => {
        let isMounted = false;
        const controller = new AbortController();

        const getSelfData = async () => {
            try {
                const response = await axiosReload.get('http://localhost:8000/api/me', {
                    signal: controller.signal
                })
                console.log(response?.data);
                isMounted && setUser(response?.data);
            } catch (err) {
                console.error(err);
            }
        };

        getSelfData();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, []);

    return (
        <AxiosContentProvider>
            <Sidebar />
        </AxiosContentProvider>
    );
};

export default Dashboard;

