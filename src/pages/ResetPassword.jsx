import axios from 'axios';
import TogglePasswordItem from '../components/TogglePasswordItem';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const bg = "/bg.jpg";
const VerifikasiAccount = () => {
  const navigate = useNavigate();
  const { passReset, setPassReset } = useAuth();

  const submitNewPassword = async (e) => {
    e.preventDefault();
    const BASE_URL = 'http://localhost:8000/api/change_password';
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };


    try {
      if (passReset.password !== passReset.confirm_password) {
        console.log("password must match")
        return;
      }
      const response = await axios.put(BASE_URL, JSON.stringify({ "password": passReset.password }), options);
      console.log(response.data);
      setPassReset(null);
      navigate('../login');
    } catch(error) {
      console.log(error);
    }
  }

    return(
    <>
      <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-100">
        <div
          className="absolute top-0 left-0 w-full h-full bg-center bg-cover animate-ambient"
          style={{ backgroundImage: `url(${bg})` }}
        />
        <motion.div
          className="relative w-full max-w-lg pt-6 bg-white border border-gray-200 shadow-sm rounded-xl sm:py-10 sm:px-6"
          initial={{ opacity: 0, y: 50 }}  // Starts from below and transparent
          animate={{ opacity: 1, y: 0 }}   // Ends at normal position and fully visible
          transition={{ duration: 0.6 }}   // Animation duration
        >
          <div className="p-4 sm:p-7">
            <div className="mb-10">
              <div className="">
                <h1 className="block text-2xl font-bold text-gray-800">Reset your password</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Your new password must be differnt to previous passwords.
                </p>
              </div>
              <div className='mt-10 space-y-5'>
                <TogglePasswordItem/>
                <button type="submit" onClick={submitNewPassword} className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Reset Password</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </>
    );
}
export default VerifikasiAccount;