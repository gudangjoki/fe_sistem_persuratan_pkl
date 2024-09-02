import { useEffect } from 'react';
import useLogin from '../hooks/useLogin';

const Dashboard = () => {
    const login = useLogin();

    useEffect(() => {
        login();
    }, [login]);

    return (
        <div>Dashboard</div>
    );
};

export default Dashboard;
