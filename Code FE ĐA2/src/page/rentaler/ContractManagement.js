import React, { useEffect, useState } from "react";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import {
  disableRoom,
  getAllContractOfRentaler,
} from "../../services/fetch/ApiUtils";
import Pagination from "./Pagnation";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const mockContracts = [
  {
    id: 1,
    name: "Hợp đồng thuê Phòng trọ Quận Hai Bà Trưng",
    room: { title: "Phòng trọ Quận Hai Bà Trưng", price: 3000000, status: "ROOM_RENT" },
    nameOfRent: "Nguyễn Văn A",
    phone: "0905123456",
    files: null,
    deadlineContract: "2025-02-01",
    room: {
      waterCost: 100000,
      publicElectricCost: 150000,
      internetCost: 80000,
    },
  },
  {
    id: 2,
    name: "Hợp đồng thuê Căn hộ mini khu Bách Kinh Xây",
    room: { title: "Căn hộ mini khu Bách Kinh Xây", price: 5000000, status: "HIRED" },
    nameOfRent: "Trần Thị B",
    phone: "0987123456",
    files: null,
    deadlineContract: "2025-05-15",
    room: {
      waterCost: 120000,
      publicElectricCost: 180000,
      internetCost: 100000,
    },
  },
  {
    id: 3,
    name: "Hợp đồng thuê Phòng trọ Đống Đa",
    room: { title: "Phòng trọ Đống Đa", price: 4000000, status: "CHECKED_OUT" },
    nameOfRent: "Lê Minh C",
    phone: "0938123456",
    files: null,
    deadlineContract: "2024-12-20",
    room: {
      waterCost: 90000,
      publicElectricCost: 120000,
      internetCost: 75000,
    },
  },
];

function ContractManagement(props) {
  const { authenticated, role, currentUser, location, onLogout } = props;
  const history = useNavigate();

  const [tableData, setTableData] = useState(mockContracts);
  const [expiredContracts, setExpiredContracts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // // Fetch data from the API

  // const fetchData = () => {
  //   getAllContractOfRentaler(currentPage, itemsPerPage, searchQuery)
  //     .then((response) => {
  //       setTableData(response.content);
  //       setTotalItems(response.totalElements);
  //     })
  //     .catch((error) => {
  //       toast.error(
  //         (error && error.message) ||
  //           "Oops! Có điều gì đó xảy ra. Vui lòng thử lại!"
  //       );
  //     });
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [currentPage, searchQuery]);
  useEffect(() => {
    // Xử lý hợp đồng hết hạn/sắp hết hạn
    const now = new Date();
    const expiredOrAlmostExpired = tableData.filter((contract) => {
      const deadline = new Date(contract.deadlineContract);
      const remainingDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24)); // Tính số ngày còn lại
      return remainingDays <= 30; // Hết hạn hoặc sắp hết hạn (dưới 30 ngày)
    });

    setExpiredContracts(expiredOrAlmostExpired);
  }, [tableData]);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  const handleRedirectAddRoom = () => {
    history("/rentaler/add-contract");
  };

  const handleEditContract = (id) => {
    history("/rentaler/edit-contract/" + id);
  };

  const handleExportBill = (id) => {
    history("/rentaler/export-contract/" + id);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateRemainingMonths = (deadlineContract) => {
    const currentDate = new Date();
    const contractDate = new Date(deadlineContract);

    const remainingMonths =
      (contractDate.getFullYear() - currentDate.getFullYear()) * 12 +
      (contractDate.getMonth() - currentDate.getMonth());

    return remainingMonths;
  };

  // if (!props.authenticated) {
  //   return (
  //     <Navigate
  //       to={{
  //         pathname: "/login-rentaler",
  //         state: { from: location },
  //       }}
  //     />
  //   );
  // }

  return (
    <>
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
              <h5 className="card-title">Quản lý hợp đồng</h5>
              <h6 className="card-subtitle text-muted">
                {" "}
                Quản lý hợp đồng của những người thuê trọ.
              </h6>
            </div>
            <div className="card-body">
                {/* Thông báo hợp đồng hết hạn/sắp hết hạn */}
                {expiredContracts.length > 0 && (
                  <div className="alert alert-warning" role="alert">
                    <strong>Thông báo:</strong> Có{" "}
                    {expiredContracts.length} hợp đồng sắp hết hạn hoặc đã
                    hết hạn.
                  </div>
                )}
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
                        tabindex="0"
                        aria-controls="datatables-buttons"
                        type="button"
                      >
                        <a onClick={handleRedirectAddRoom}>Thêm Hợp Đồng</a>
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
                          <th
                            className="sorting sorting_asc"
                            tabindex="0"
                            aria-controls="datatables-buttons"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "224px" }}
                          >
                            Tên Hợp Đồng
                          </th>
                          <th
                            className="sorting sorting_asc"
                            tabindex="0"
                            aria-controls="datatables-buttons"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "224px" }}
                          >
                            Tên Phòng
                          </th>
                          <th
                            className="sorting"
                            tabindex="0"
                            aria-controls="datatables-buttons"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "180px" }}
                          >
                            Người thuê
                          </th>
                          <th
                            className="sorting"
                            tabindex="0"
                            aria-controls="datatables-buttons"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "180px" }}
                          >
                            Số điện thoại
                          </th>
                          <th
                            className="sorting"
                            tabindex="0"
                            aria-controls="datatables-buttons"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "166px" }}
                          >
                            Hợp Đồng
                          </th>
                          <th
                            className="sorting"
                            tabindex="0"
                            aria-controls="datatables-buttons"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "75px" }}
                          >
                            Giá phòng
                          </th>
                          <th
                            className="sorting"
                            tabindex="0"
                            aria-controls="datatables-buttons"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "75px" }}
                          >
                            Phụ phí{" "}
                          </th>
                          <th
                            className="sorting"
                            tabindex="0"
                            aria-controls="datatables-buttons"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "100px" }}
                          >
                            Thời hạn
                          </th>
                          <th
                            className="sorting"
                            tabindex="0"
                            aria-controls="datatables-buttons"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "142px" }}
                          >
                            Trạng Thái
                          </th>
                          <th
                            className="sorting"
                            tabindex="0"
                            aria-controls="datatables-buttons"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "134px" }}
                          >
                            Chế độ
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((item) => (
                          <tr className="odd">
                            <td className="dtr-control sorting_1" tabindex="0">
                              {item.name}
                            </td>
                            <td>{item.room.title}</td>
                            <td>{item.nameOfRent}</td>
                            <td>{item.phone}</td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-outline-success"
                              >
                                <a
                                  href={
                                    item.files === null
                                      ? ""
                                      : `http://localhost:8080/document/` +
                                        item.files.replace(
                                          "photographer/files/",
                                          ""
                                        )
                                  }
                                  target="_blank"
                                >
                                  Xem
                                </a>
                              </button>
                            </td>
                            <td>
                              {item.room.price &&
                                item.room.price.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </td>
                            <td>
                              {(() => {
                                const subFee =
                                  item.room.waterCost +
                                  item.room.publicElectricCost +
                                  item.room.internetCost;
                                return (
                                  subFee &&
                                  subFee.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })
                                );
                              })()}
                            </td>
                            <td>
                              {calculateRemainingMonths(
                                new Date(item.deadlineContract)
                              )}{" "}
                              tháng
                            </td>
                            <td style={{ color: "green" }}>
                              {item.room.status === "ROOM_RENT" ||
                              item.room.status === "CHECKED_OUT"
                                ? "Đã trả phòng"
                                : "Đã thuê"}
                            </td>
                            <td>
                              <a
                                href="#"
                                onClick={() => handleEditContract(item.id)}
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Sửa hợp đồng"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-edit-2 align-middle"
                                >
                                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                </svg>
                              </a>
                              &nbsp;&nbsp;
                              <a
                                data-toggle="tooltip"
                                onClick={() => handleExportBill(item.id)}
                                data-placement="bottom"
                                title="Trả phòng và xuất hóa đơn"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  viewBox="0 0 384 512"
                                >
                                  <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
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
    </>
  );
}

export default ContractManagement;
