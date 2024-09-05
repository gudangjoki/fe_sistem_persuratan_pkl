import PinInputItem from '../components/PinInputItem';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const bg = "/bg.jpg";
const VerifikasiOTP = () => {
  const navigate = useNavigate();
  const { otp } = useAuth();

  const [errMsg, setErrMsg] = useState("");

  const emailCookie = Cookies.get("email");
  const [timer, setTimer] = useState(120);
  // const [stop, setStop] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);


    return () => {
      clearInterval(timerInterval);
    }
  }, [])

  const BASE_URL = 'http://localhost:8000/api/check_otp';
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const submitOTP = async () => {
    let otpReconstruction = "";
    try {
      const otpCombined = (otpReconstruction) => {
        otp.map((val) => {
          otpReconstruction += val;
        });

        return otpReconstruction
      }
      const otpData = otpCombined(otpReconstruction);

      const response = await axios.post(BASE_URL, JSON.stringify({ "otp" : otpData }), options);
      console.log(response.data)
      if (response.data?.success) {
        navigate('../reset-password');
      }
    } catch (error) {
      console.log(error.message);
      setErrMsg(error.response.data?.message);
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
          {errMsg !== "" && <div className="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert" tabIndex="-1" aria-labelledby="hs-soft-color-danger-label">
            <span id="hs-soft-color-danger-label" className="font-bold">Danger</span> {errMsg}
          </div>}
          <div className="p-4 sm:p-7">
            <div className="mb-10">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800">OTP Verification</h1>
                <p className="mt-2 text-sm text-gray-600">
                  An Authentication code has been sent to <span className='font-bold text-blue-700'>{emailCookie !== "" && emailCookie}</span>
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Otp expired or cant found otp. <span className='font-bold text-blue-700'>Resend code? {timer}</span>
                </p>
              </div>
              <div className='mt-10 space-y-5'>
                <div className="flex justify-center">
                  <PinInputItem/>
                </div>
                <button type="submit" onClick={submitOTP} className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Submit</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </>
    );
}
export default VerifikasiOTP;