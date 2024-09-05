import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function PinInputItem() {
  // const [otp, setOtp] = useState(new Array(6).fill(""));
  // const [indexPin, setIndexPin] = useState(0);
  const { otp, setOtp, indexPin, setIndexPin } = useAuth();
  
  const handleChange = (e) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[indexPin] = value;
      setOtp(newOtp);

      if (value !== "" && indexPin < 5) {
        document.getElementById(`otp-${indexPin + 1}`).focus();
        setIndexPin(indexPin + 1);
      }

      if (value === "" && indexPin > 0) {
        document.getElementById(`otp-${indexPin - 1}`).focus();
        setIndexPin(indexPin - 1);
      }
    }
  };

  useEffect(() => {
    console.log(otp);
  }, [otp]);

  const handleClick = (e) => {
    const index = parseInt(e.target.name);
    setIndexPin(index);
    console.log(`click on input ${index + 1}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && document.getElementById(`otp-${indexPin}`).value === "") {
      if (indexPin > 0) {
        document.getElementById(`otp-${indexPin - 1}`).focus();
        setIndexPin(indexPin - 1);
      }
    }

    // if (e.key === "ArrowRight" && indexPin < 5) {
    //   document.getElementById(`otp-${indexPin + 1}`).focus();
    //   setIndexPin(indexPin + 1);
    // }

    // if (e.key === "ArrowLeft" && indexPin > 0) {
    //   document.getElementById(`otp-${indexPin - 1}`).focus();
    //   setIndexPin(indexPin - 1);
    // }
  };

  return (
    <div className="flex space-x-3" data-hs-pin-input>
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength="1"
          className="block w-[45px] h-[45px] border text-center border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder=""
          value={digit}
          onChange={handleChange}
          name={`${index}`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        />
      ))}
    </div>
  );
}
