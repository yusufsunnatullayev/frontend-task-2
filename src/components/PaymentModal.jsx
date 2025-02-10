import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useManageState } from "../hooks/useManageState";
import { toast } from "react-toastify";
import PaymentCardDetails from "./PaymentCardDetails";
import PaymentConfirmation from "./PaymentConfirmation";

const PaymentModal = () => {
  const setModal = useManageState((state) => state.setModal);
  const [isValid, setIsValid] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [smsCode, setSmsCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      if (!isSent) {
        toast.success("SMS code sent to connected phone number.");
        const sms = Math.floor(1000 + Math.random() * 9000).toString();
        setSmsCode(sms);
      }
      setIsSent(true);
    } else {
      toast.error("Please check your card number again!");
    }
  };

  return (
    <div
      onClick={() => setModal(false)}
      className="w-full h-screen bg-black/40 fixed top-0 left-0 flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-9/10 md:w-1/4 bg-white shadow p-5 rounded-xl flex flex-col gap-1 items-start"
      >
        <IoClose
          className="text-lg self-end cursor-pointer hover:text-gray-400 duration-200"
          onClick={() => setModal(false)}
        />
        {!isSent ? (
          <PaymentCardDetails isValid={isValid} setIsValid={setIsValid} />
        ) : (
          <PaymentConfirmation smsCode={smsCode} />
        )}
      </form>
    </div>
  );
};

export default PaymentModal;
