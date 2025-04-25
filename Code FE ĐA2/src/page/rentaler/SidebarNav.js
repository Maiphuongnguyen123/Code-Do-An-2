import React from "react";
import { Link, NavLink } from 'react-router-dom';

const SidebarNav = () => {
  return (
    <ul className="sidebar-nav" style={{ backgroundColor: "#e2e3e5", color: "#fff", padding: "15px" ,fontFamily: "Arial, sans-serif" }}>
      <li className="sidebar-header" style={{ color: "#0a0a0a", fontWeight: "bold", fontSize: "16px" }}>
        Quản lí chức năng
      </li>
      <li className="sidebar-item">
        <NavLink to="/rentaler/rentaler" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Thống kê</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/rentaler/room-management" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý phòng trọ</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/rentaler/add-room" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý phòng trọ</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/rentaler/contract-management" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý hợp đồng</span>
        </NavLink>
      </li>
     
      <li className="sidebar-item">
        <NavLink to="/rentaler/request-management" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý yêu cầu</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/rentaler/electric_water-management" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý tiền trọ</span>
        </NavLink>
      </li>
      
    </ul>
  )
}

export default SidebarNav;