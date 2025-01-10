import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Deviation() {
  const [stdDev, setStdDev] = useState(null);
  const location = useLocation();

  const getCoinFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("coin") || "bitcoin";
  };

  useEffect(() => {
    const coin = getCoinFromUrl();

    const fetchDeviation = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/crypto/deviation?coin=${coin}`);
        setStdDev(response.data.std);
      } catch (error) {
        console.error("Error fetching standard deviation data");
      }
    };

    fetchDeviation();

    const interval = setInterval(fetchDeviation, 7200000); // Refresh every 2 hours

    return () => clearInterval(interval);
  }, [location.search]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Standard Deviation for {getCoinFromUrl()}</h5>
            </div>
            <div className="card-body">
              {stdDev !== null ? (
                <div>
                  <h4 className="text-center">Standard Deviation: {stdDev}</h4>
                </div>
              ) : (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Fetching latest data...</p>
                </div>
              )}
            </div>
            <div className="card-footer text-muted">
              <p className="mb-0 text-center">
                Data updated every 2 hours from backend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deviation;
