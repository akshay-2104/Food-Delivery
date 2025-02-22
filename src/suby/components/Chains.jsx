import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
//Akshay patil
const Chains = () => {
    const [vendorData, setVendorData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await fetch(`${API_URL}/vendor/all-vendors?order=desc`);
                const newData = await response.json();
                setVendorData(newData);
                console.log("Fetched API Data:", newData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data");
                alert("Failed to fetch data");
                setLoading(true);
            }
        };
        fetchVendorData();
    }, []);

    const handleScroll = (direction) => {
        const gallery = document.getElementById("chainGallery");
        const scrollAmount = 500;

        if (direction === "left") {
            gallery.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            gallery.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className='mediaChainSection'>
            {loading && (
                <div className="loaderSection">
                    <div className="loader">Your 🥣 is Loading...</div>
                    <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="magnifying-glass-loading"
                        glassColor="#c0efff"
                        color="#e15b64"
                    />
                </div>
            )}
            <div className="btnSection">
                <button onClick={() => handleScroll("left")}>
                    <FaRegArrowAltCircleLeft className='btnIcons' />
                </button>
                <button onClick={() => handleScroll("right")}>
                    <FaRegArrowAltCircleRight className='btnIcons' />
                </button>
            </div>
            <h3 className='chainTitle'>Top restaurant chains in Hyderabad</h3>
            <section className="chainSection" id="chainGallery">
                {vendorData.vendors?.map((vendor, index) => (
                    <div className="vendorBox" key={index}>
                        {vendor.firm?.map((item) => (
                            <div key={item._id}>
                                <Link to={`/products/${item._id}/${item.firmName}`} className="link">
                                    <div className="firmImage">
                                        <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} className='topimg' />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Chains;
