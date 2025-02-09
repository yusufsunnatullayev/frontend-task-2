import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useManageState } from "../hooks/useManageState";
import { useNavigate } from "react-router-dom";

const PaymentConfirmation = ({ smsCode }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const setModal = useManageState((state) => state.setModal);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    alert("You confirmation code is : " + smsCode);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input field if available
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (!newCode[index] && index > 0) {
        // Move to the previous input field if available
        inputRefs.current[index - 1].focus();
      } else {
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .slice(0, 4)
      .replace(/[^0-9]/g, "");
    const newCode = paste.split("");
    setCode(newCode);
    newCode.forEach((num, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = num;
      }
    });
    if (newCode.length < 4) {
      inputRefs.current[newCode.length].focus();
    }
  };

  const hanldeConfirmation = () => {
    const confirmationCode = code.join("");
    if (confirmationCode === smsCode) {
      toast.success("Order completed successfully!");
      setModal(false);
      navigate("/");
    } else {
      toast.error("Invalid confirmation code!");
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-3 mt-10">
      <h1 className="text-sm font-semibold">Enter confirmation code</h1>
      <div className="w-full flex items-center gap-3" onPaste={handlePaste}>
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-1/4 h-14 rounded-xl bg-gray-200 border-none focus:outline-none focus:border focus:border-purple-600 px-7 py-3 text-3xl flex items-center justify-center text-purple-600 font-semibold"
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <button
        onClick={hanldeConfirmation}
        className="w-full mt-4 py-2 px-3 text-white font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 duration-200 cursor-pointer"
      >
        Confirm order
      </button>
    </div>
  );
};

export default PaymentConfirmation;
