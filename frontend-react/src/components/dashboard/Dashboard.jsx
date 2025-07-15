import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const fetchProtectedData = async () => {
  try {
    const response = await axiosInstance.get("/protected-view");
    console.log("Success: ", response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState();
  const [plot, setPlot] = useState();
  const [ma100Plot, setMa100Plot] = useState();
  const [ma200Plot, setMa200Plot] = useState();
  const [prediction, setPrediction] = useState();

  useEffect(() => {
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/prediction/", {
        ticker: ticker,
      });
      console.log(response.data);
      // Set Plots
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      setPlot(backendRoot + response.data.plot_img);
      setMa100Plot(backendRoot + response.data.ma100_plot_img);
      setMa200Plot(backendRoot + response.data.ma200_plot_img);
      setPrediction(backendRoot + response.data.plot_prediction);
      setError(null);
      if (response.data.error) {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Submit Error ==>", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form id="tickerField" name="tickerField" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control "
              placeholder="Enter stock ticker"
              onChange={(e) => {
                setTicker(e.target.value);
              }}
              value={ticker}
              required
            />
            <small>
              {error && <div className="text-warning mt-2">{error}</div>}
            </small>

            <button type="submit" className="btn btn-info mt-3">
              See Prediction
            </button>
          </form>
          {/* print plots */}
          <div className="prediction mt-5">
            <div className="p-3">
              {plot && <img src={plot} style={{ width: "100%" }} />}
            </div>
          </div>
          <div className="prediction mt-5">
            <div className="p-3">
              {ma100Plot && <img src={ma100Plot} style={{ width: "100%" }} />}
            </div>
          </div>
          <div className="prediction mt-5">
            <div className="p-3">
              {ma200Plot && <img src={ma200Plot} style={{ width: "100%" }} />}
            </div>
          </div>
          <div className="prediction mt-5">
            <div className="p-3">
              {prediction && <img src={prediction} style={{ width: "100%" }} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
