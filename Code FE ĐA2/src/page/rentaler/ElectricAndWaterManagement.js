import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import Pagination from "./Pagnation"; // Sửa lỗi tên import từ Pagnation thành Pagination
// import { toast } from "react-toastify";
// import { getAllElectricAndWaterOfRentaler } from "../../services/fetch/ApiUtils";

const ElectricAndWaterManagement = (props) => {
  const { authenticated, role, currentUser, location, onLogout } = props;
  const history = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    // Mock data for room rent management
    const mockData = [
      {
        id: 1,
        name: "Phòng A1",
        month: "12/2024",
        contractRent: 5000000,
        serviceFee: 500000,
        repairFee: 100000,
        discount: 200000,
        totalRent: 5300000,
        status: "Đã thanh toán",
      },
      {
        id: 2,
        name: "Phòng B2",
        month: "12/2024",
        contractRent: 4500000,
        serviceFee: 400000,
        repairFee: 150000,
        discount: 0,
        totalRent: 5050000,
        status: "Chưa thanh toán",
      },
      {
        id: 3,
        name: "Phòng C3",
        month: "11/2024",
        contractRent: 6000000,
        serviceFee: 600000,
        repairFee: 200000,
        discount: 300000,
        totalRent: 6500000,
        status: "Đã thanh toán",
      },
    ];

    setTableData(mockData);
    setTotalItems(mockData.length);
  }, []);
  function calculateRemainingMonths(deadlineContract) {
    const currentDate = new Date();
    const contractDate = new Date(deadlineContract);

    const remainingMonths = (contractDate.getFullYear() - currentDate.getFullYear()) * 12 +
      (contractDate.getMonth() - currentDate.getMonth());

    return remainingMonths;
  }

  // Tất cả các hooks phải được gọi ở đây

  // const fetchData = () => {
  //   getAllElectricAndWaterOfRentaler(currentPage, itemsPerPage, searchQuery)
  //     .then((response) => {
  //       console.log("dataTable", response);

  //       if (response && response.content) {
  //         setTableData(response.content);
  //         setTotalItems(response.totalElements);
  //       } else {
  //         setTableData([]);
  //         setTotalItems(0);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error(
  //         (error && error.message) ||
  //           "Oops! Có điều gì đó xảy ra. Vui lòng thử lại!"
  //       );
  //       setTableData([]);
  //       setTotalItems(0);
  //     });
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [currentPage, searchQuery]);
  console.log("tableData", tableData);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditElectric = (id) => {
    history(`/rentaler/electric_water/edit/${id}`);
  };

  const handleRedirectAddElectric = () => {
    history(`/rentaler/electric_water/add`);
  };

  const handleExportBill = (id) => {
    history(`/rentaler/electric_water-management/export-bill/${id}`);
  };

  // if (!authenticated) {
  //   return <Navigate to="/login-rentaler" state={{ from: location }} />;
  // }

  return (
    <div>
      <div className="wrapper" style={{ fontFamily: "Arial, sans-serif" }}>
        <nav id="sidebar" className="sidebar js-sidebar">
          <div className="sidebar-content js-simplebar">
            <a className="sidebar-brand" href="index.html">
            <a className="navbar-brand text-brand d-flex align-items-center" href="/">
<img src="/assets/img/logo.png" alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
<span className="color-b" style={{ color: '#fff' }}>Rent</span><span className="color-b" style={{ color: '#28a745' }}>Mate</span>
</a>
                        <span className="align-middle">NGƯỜI CHO THUÊ TRỌ</span>
            </a>
            <SidebarNav />
          </div>
        </nav>

        <div className="main">
          <Nav onLogout={onLogout} currentUser={currentUser} />
          <br />
          <div className="container-fluid p-0"></div>
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Quản lý tiền thuê trọ</h5>
              <h6 className="card-subtitle text-muted">
                Quản lý tiền dịch vụ, tiền nhà của những người thuê trọ.
              </h6>
            </div>
            <div className="card-body">
              <div
                id="datatables-buttons_wrapper"
                className="dataTables_wrapper dt-bootstrap5 no-footer"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="dt-buttons btn-group flex-wrap">
                      <button
                        className="btn btn-secondary buttons-copy buttons-html5"
                        type="button"
                        onClick={handleRedirectAddElectric}
                      >
                        Thêm tiền trọ
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div
                      id="datatables-buttons_filter"
                      className="dataTables_filter"
                    >
                      <label>
                        Search:
                        <input
                          type="search"
                          className="form-control form-control-sm"
                          placeholder=""
                          aria-controls="datatables-buttons"
                          value={searchQuery}
                          onChange={handleSearch}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row dt-row">
                  <div className="col-sm-12">
                    <table
                      id="datatables-buttons"
                      className="table table-striped dataTable no-footer dtr-inline"
                      style={{ width: "100%" }}
                      aria-describedby="datatables-buttons_info"
                    >
                      <thead>
                        <tr>
                          <th>Tên phòng</th>
                         
                          <th>Tháng sử dụng</th>
                          <th>Tiền trọ (theo hợp đồng)</th>
                          <th>Phí dịch vụ</th>
                          <th>Phí sửa chữa</th>
                         
                          <th>Tổng tiền trọ</th>
                          <th>Phí sửa chữa</th>
                          <th>Trạng Thái</th>
                          <th>Chế độ</th>
                        </tr>
                      </thead>
                      <tbody>
                      {tableData.map((item) => (
                          <tr key={item.id} className="odd">
                            <td>{item.name}</td>
                            <td>Tháng {item.month}</td>
                            <td>{item.contractRent.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{item.serviceFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{item.repairFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{item.totalRent.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{item.discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{item.status}</td>
                            <td>
                              <a
                                href=""
                                onClick={() => handleEditElectric(item.id)}
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Sửa thông tin tiền điện nước"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-edit-2 align-middle"
                                >
                                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                </svg>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricAndWaterManagement;
