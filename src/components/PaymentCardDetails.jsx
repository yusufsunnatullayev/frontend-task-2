import React, { useState } from "react";
import click from "../assets/icons/click.png";
import humo from "../assets/icons/humo.png";
import payme from "../assets/icons/payme.png";
import uzcard from "../assets/icons/uzcard.png";
import visa from "../assets/icons/visa.svg";
import mastercard from "../assets/icons/mastercard.svg";

const PaymentCardDetails = ({ isValid, setIsValid }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [expires, setExpires] = useState("");
  const [cvv, setCvv] = useState("");
  const [resText, setResText] = useState("");

  const validateCardNumber = (number) => {
    const cleanedNumber = number.replace(/\D/g, "");

    if (!cleanedNumber || !/^\d+$/.test(cleanedNumber)) {
      return false;
    }

    // Luhn Algorithm
    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanedNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanedNumber.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const getCardType = (number) => {
    const cleanedNumber = number.replace(/\D/g, "");

    if (/^4/.test(cleanedNumber)) {
      return "Visa";
    } else if (/^5[1-5]/.test(cleanedNumber)) {
      return "MasterCard";
    } else if (/^8600/.test(cleanedNumber) || /^5614/.test(cleanedNumber)) {
      return "UzCard";
    } else if (/^9860/.test(cleanedNumber)) {
      return "Humo";
    } else {
      return "Unknown";
    }
  };

  const handleExpiresChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpires(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 16);
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formattedValue);
    if (cardNumber.length === 18) {
      const isValidCard = validateCardNumber(value);
      setIsValid(isValidCard);
      const responseText = isValidCard
        ? "Valid card number!"
        : "Invalid card number, please check again!";
      setResText(responseText);
    } else if (cardNumber.length < 18) {
      setResText("Should be 16 digits");
    } else {
      setResText("");
    }
    const type = getCardType(value);
    setCardType(type);
  };

  let cardIcon =
    cardType === "Visa" ? (
      <img src={visa} alt="visa" className="w-7 h-7" />
    ) : cardType === "MasterCard" ? (
      <img src={mastercard} alt="mastercard" className="w-7 h-7" />
    ) : cardType === "UzCard" ? (
      <img src={uzcard} alt="uzcard" className="w-7 h-7" />
    ) : cardType === "Humo" ? (
      <img src={humo} alt="humo" className="w-7 h-7" />
    ) : cardType === "Payme" ? (
      <img src={payme} alt="payme" className="w-7 h-7" />
    ) : cardType === "Click" ? (
      <img src={click} alt="click" className="w-7 h-7" />
    ) : (
      <p className="text-xs font-medium text-gray-400">Unknow</p>
    );

  return (
    <>
      <div className="w-full flex items-center gap-1">
        <img src={click} alt="click" className="w-14 h-14" />
        <img src={payme} alt="click" className="w-14 h-14" />
        <img src={uzcard} alt="click" className="w-10 h-10" />
        <img src={humo} alt="click" className="w-10 h-10" />
        <img src={mastercard} alt="click" className="w-10 h-10" />
        <img src={visa} alt="click" className="w-10 h-10" />
      </div>
      <div className="w-full flex flex-col items-start gap-1">
        <label className="text-sm font-semibold">Card number</label>
        <input
          className="w-full py-2 px-3 rounded-md duration-200 text-base font-semibold border border-gray-300 focus:outline-none focus:border-purple-600"
          type="text"
          value={cardNumber}
          onChange={handleInputChange}
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={19}
          required
        />
        {cardNumber && (
          <div className="w-full flex items-center justify-between">
            <span
              className={`text-xs font-medium ${
                isValid ? "text-green-600" : "text-red-600"
              }`}
            >
              {resText}
            </span>
            {cardIcon}
          </div>
        )}
      </div>
      <div className="w-full flex items-center gap-3 mt-2">
        <div className="w-1/2 flex flex-col gap-1">
          <label className="text-sm font-semibold">Expires</label>
          <input
            className="w-full py-2 px-3 rounded-md duration-200 text-base font-semibold border border-gray-300 focus:outline-none focus:border-purple-600"
            type="text"
            value={expires}
            onChange={handleExpiresChange}
            placeholder="XX/XX"
            maxLength={5}
            required
          />
        </div>
        <div className="w-1/2 flex flex-col gap-1">
          <label className="text-sm font-semibold">CVV</label>
          <input
            className="w-full py-2 px-3 rounded-md duration-200 text-base font-semibold border border-gray-300 focus:outline-none focus:border-purple-600"
            type="text"
            value={cvv}
            onChange={(e) =>
              setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
            }
            placeholder="XXX"
            maxLength={3}
            required
          />
        </div>
      </div>
      <button className="w-full mt-3 py-2 px-3 rounded-lg cursor-pointer bg-purple-600 text-white font-semibold hover:bg-purple-700 duration-200">
        Enter
      </button>
    </>
  );
};

export default PaymentCardDetails;
