import { Button, Divider, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/Styles/Sidebar.css";
import { useAtom } from "jotai";
import {
  PrimeryColorSeclectorAtom,
  SecondryColorSeclectorAtom,
} from "./LandingPage";

const Sidebar = ({ sidehandleChangeTitle, sideMenus }) => {
  return (
    <div className="Sidemenu">
      {sideMenus.map((data, index) => {
        return (
          <>
            {data.visible ||
            localStorage.getItem("SelectedMenuItem") == data.name ? (
              <div
                className="col-md-12 d-md-flex flex-md-row p-2 mt-0 mt-sm-3 clicked gap-2"
                onClick={() => sidehandleChangeTitle(data)}
              >
                <div className="col-md-2 d-grid  d-md-flex flex-md-row justify-content-center sidebarcontent">
                  <img src={data.img} width={"25px"} />
                </div>
                <div className="col-md-10 mt-1 d-none d-md-block ">
                  {data.name}
                </div>
              </div>
            ) : (
              <div
                className="col-md-12 d-md-flex flex-md-row p-2 mt-0 mt-sm-3 unclicked gap-2"
                onClick={() => sidehandleChangeTitle(data)}
              >
        

                <div className="col-md-2 d-grid  d-md-flex flex-md-row justify-content-center sidebarcontent">
                  <img src={data.img} width={"25px"} />
                </div>

                <div className="col-md-10 mt-1 d-none d-md-block">
                  {data.name}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
export default Sidebar;
