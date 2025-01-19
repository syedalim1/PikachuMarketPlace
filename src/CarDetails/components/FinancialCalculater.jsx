import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const FinancialCalculater = () => {
  const [carPrice, setCarPrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMonthlyPayments = () => {
    const principal = parseFloat(carPrice) - parseFloat(downPayment); // Principal loan amount
    const monthlyInterestRate = parseFloat(interestRate) / 1200; // Convert annual interest rate to monthly
    const numberOfPayments = parseFloat(loanTerm) * 12; // Total number of payments (months)

    if (principal > 0 && monthlyInterestRate >= 0 && numberOfPayments > 0) {
      const payment =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      setMonthlyPayment(payment.toFixed(2)); // Set the calculated value
    } else {
      setMonthlyPayment("Invalid Input");
    }
  };

  return (
    <div className="sm:p-8 p-2 w-full   ">
      <h2 className="font-bold text-[15px] sm:text-3xl text-purple-700 mb-6">
        Financial Calculator
      </h2>

      <div className="flex gap-2">
        <div className="flex flex-col w-full">
          <label
            htmlFor="price"
            className="font-medium text-[10px] sm:text-lg text-gray-700 mb-2"
          >
            Price ($)
          </label>
          <Input
            id="price"
            placeholder="Enter the car price"
            value={carPrice}
            onChange={(e) => setCarPrice(e.target.value)}
            className="rounded-full text-[10px] border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="interest"
            className="font-medium text-[10px] sm:text-lg text-gray-700 mb-2"
          >
            Interest Rate (%)
          </label>
          <Input
            id="interest"
            placeholder="Enter the interest rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="rounded-full text-[10px] border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <div className="flex flex-col w-full">
          <label
            htmlFor="months"
            className="font-medium text-[10px] sm:text-lg text-gray-700 mb-2"
          >
            Loan Terms (Years)
          </label>
          <Input
            id="loanTerm"
            placeholder="Enter loan term in years"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="rounded-full text-[10px] border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="downPayment"
            className="font-medium text-[10px] sm:text-lg text-gray-700 mb-2"
          >
            Down Payment ($)
          </label>
          <Input
            id="downPayment"
            placeholder="Enter the down payment"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="rounded-full text-[10px] border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
          />
        </div>
      </div>

      <Button
        className="mt-8  w-full rounded-full bg-gradient-to-r  from-purple-500 to-blue-500 text-white  p-3 text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
        onClick={calculateMonthlyPayments}
      >
        <p className="text-[12px] sm:text-lg "> Calculate Monthly Payment</p>
      </Button>

      {monthlyPayment && (
        <div className="mt-6 text-center bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800">Monthly Payment</h3>
          <p className="text-2xl font-bold text-blue-600">${monthlyPayment}</p>
        </div>
      )}
    </div>
  );
};

export default FinancialCalculater;
