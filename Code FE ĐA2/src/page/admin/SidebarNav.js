import React from "react";
import { Link, NavLink } from 'react-router-dom';

const SidebarNav = () => {
  return (
    <ul className="sidebar-nav" style={{ backgroundColor: "#e2e3e5", color: "#fff", padding: "15px" }}>
  <li className="sidebar-header" style={{ color: "#0a0a0a", fontWeight: "bold", fontSize: "16px" }}>
    Quản lí chức năng
  </li>
      <li className="sidebar-item" style={{ color: "#0a0a0a", fontWeight: "bold", fontSize: "14px" }}>
        <NavLink   to="/admin/admin"
  className={({ isActive }) =>
    `sidebar-link ${isActive ? 'active' : ''}`
  }
  >
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Thống kê</span>
        </NavLink>
      </li>
      <li className="sidebar-item" style={{ color: "#0a0a0a", fontWeight: "bold", fontSize: "14px" }}>
        <NavLink to="/admin/account-management"  className={({ isActive }) =>
    `sidebar-link ${isActive ? 'active' : ''}`
  }
        
      >
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý tài khoản</span>
        </NavLink>
      </li>
      <li className="sidebar-item" style={{ color: "#0a0a0a", fontWeight: "bold", fontSize: "14px" }}>
        <NavLink to="/admin/room-management" className={({ isActive }) =>
    `sidebar-link ${isActive ? 'active' : ''}`
  }>
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý phòng trọ</span>
        </NavLink>
      </li>
      <li className="sidebar-item" style={{ color: "#0a0a0a", fontWeight: "bold", fontSize: "14px" }}>
        <NavLink to="/admin/report-management" className={({ isActive }) =>
    `sidebar-link ${isActive ? 'active' : ''}`
  }>
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý báo cáo</span>
        </NavLink>
      </li>
    </ul>
  )
}

export default SidebarNav;