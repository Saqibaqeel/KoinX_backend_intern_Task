import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Stats() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const getCoinFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('coin') || 'bitcoin'; // Default to 'bitcoin' if no coin is provided
  };

  const handleDeviationClick = () => {
    const coin = getCoinFromUrl();
    navigate(`/deviation?coin=${coin}`); // Navigate to the Deviation component with the selected coin
  };

  useEffect(() => {
    const coin = getCoinFromUrl();
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/crypto/stat?coin=${coin}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 7200000); // Refresh every 2 hours

    return () => clearInterval(interval);
  }, [location.search]);

  return (
    <div className="container">
      <h3>Latest Stats for {getCoinFromUrl()}</h3>
      <button onClick={handleDeviationClick} className="btn btn-primary fs-0.5">
        Show Deviation Data
      </button>
      <div className="row mt-4">
        {data.length === 0 ? (
          <div>Loading...</div>
        ) : (
          data.slice(0, 5).map((item) => (
            <div key={item._id} className="col-12 col-md-4 mb-3">
              <div className="card">
                <img src={item.img} className="card-img-top" alt={item.coin} />
                <div className="card-body">
                  <h5 className="card-title">{item.coin}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ${item.price.toFixed(2)}
                  </p>
                  <p className="card-text">
                    <strong>Market Cap:</strong> ${item.marketCap.toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>24h Change:</strong> {item.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Stats;
