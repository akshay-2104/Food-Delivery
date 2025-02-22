import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchFirmData = async () => {
      try {
        const response = await fetch(`${API_URL}/vendor/all-vendors`);
        const data = await response.json();
        setFirmData(data.vendors);
      } catch (error) {
        alert("Failed to fetch firm data");
        console.error("Error fetching firm data:", error);
      }
    };

    fetchFirmData();
  }, []);

  const filterHandler = (region, category) => {
    setSelectedRegion(region);
    setActiveCategory(category);
  };

  return (
    <>
      <h3>Restaurants with Online Food Delivery in Hyderabad</h3>
      <div className="filterButtons">
        {["All", "South-Indian", "North-Indian", "Chinese", "Bakery"].map(
          (category, index) => (
            <button
              key={index}
              onClick={() => filterHandler(category, category.toLowerCase())}
              className={activeCategory === category.toLowerCase() ? "activeButton" : ""}
            >
              {category}
            </button>
          )
        )}
      </div>

      <section className="firmSection">
        {firmData.map((vendor) =>
          vendor.firm.map((item) =>
            selectedRegion === "All" || item.region.includes(selectedRegion.toLowerCase()) ? (
              <Link
                to={`/products/${item._id}/${item.firmName}`}
                className="link"
                key={item._id}
              >
                <div className="zoomEffect">
                  <div className="firmGroupBox">
                    <div className="firmGroup">
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.firmName}
                      />
                      <div className="firmOffer">{item.offer}</div>
                    </div>
                    <div className="firmDetails">
                      <strong>{item.firmName}</strong>
                      <div className="firmArea">{item.region.join(", ")}</div>
                      <div className="firmArea">{item.area}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : null
          )
        )}
      </section>
    </>
  );
};

export default FirmCollections;
