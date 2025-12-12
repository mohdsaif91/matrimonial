import React from "react";

const WhatspaaLogin = () => {
  const data = {
    quota: "5079",
    todayUsage: "0",
    quotaValidity: "29 Jun 2026, 05:52 PM",
  };
  return (
    <div className="flex justify-center align-middle h-[75vh] bg-[#f2f4f6]">
      <div className="flex justify-center align-middle bg-[#fff] h-[75%]">
        <div className="p-4 rounded-2xl w-[400px]">
          <div className="flex justify-center items-center">
            <img
              src="https://pps.whatsapp.net/v/t61.24694-24/491876090_2241360429716012_4760838136296858904_n.jpg?ccb=11-4&amp;oh=01_Q5Aa3AHactd-0rf6jZMnLqNd2Q1gqx5QXgvg6e3orsWiAYoDGQ&amp;oe=693E162D&amp;_nc_sid=5e03e0&amp;_nc_cat=110"
              alt="WhatsApp Profile"
              className="rounded-circle mb-3 shadow-sm h-[200px] w-[200px] rounded-[50%] "
            />
          </div>

          <h4 className="fw-bold text-center text-dark mb-2">
            One Unit Solutions
          </h4>

          <div className="text-start" style={{ fontSize: "15px" }}>
            <div className="flex justify-between py-1 border-b-1">
              <div className="text-muted">Quota</div>
              <div className="fw-semibold">{data.quota}</div>
            </div>
            <div className="flex justify-between py-1 border-b-1">
              <div className="text-muted">Today Usage</div>
              <div className="fw-semibold">{data.todayUsage}</div>
            </div>
            <div className="flex justify-between py-1">
              <div className="text-muted">Quota Validity</div>
              <div className="fw-semibold">{data.quotaValidity}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatspaaLogin;
