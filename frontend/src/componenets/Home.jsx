import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/crypto/getAll");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 7200000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={item.img}
                  className="card-img-top"
                  alt={item.coin}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.coin}</h5>
                  <p className="card-text">
                    Price: ${item.price.toFixed(2)}
                    <br />
                    Market Cap: ${item.marketCap}
                    <br />
                    Change (24h): {item.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
