import React, { useState, useEffect } from "react";
import axios from "axios";

const BankList = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/api/banks");
      setBanks(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Bank List</h1>
      <ul>
        {banks.map((bank) => (
          <li key={bank._id}>{bank.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BankList;
