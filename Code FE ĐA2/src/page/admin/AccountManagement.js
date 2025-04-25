import React, { useState } from 'react';
import SidebarNav from './SidebarNav';
import Nav from './Nav';
import Pagination from './Pagnation';
import { useNavigate } from 'react-router-dom';

function AccountManagement(props) {
    const { onLogout, currentUser } = props;
    const history = useNavigate();

    const [tableData, setTableData] = useState([
        { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@example.com", phone: "0912345678", role: "Người thuê trọ", isLocked: false },
        { id: 2, name: "Trần Thị B", email: "tranthib@example.com", phone: "0987654321", role: "Chủ trọ", isLocked: true },
        { id: 3, name: "Phạm Minh C", email: "phamminhc@example.com", phone: "0934567890", role: "Admin", isLocked: false },
        { id: 4, name: "Lê Hoàng D", email: "lehoangd@example.com", phone: "0923456789", role: "Người thuê trọ", isLocked: true },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleAuthorization = (userId) => {
        history(`/admin/authorization/${userId}`);
    };

    const handleLockedAccount = (userId) => {
        setTableData((prevData) =>
            prevData.map((item) =>
                item.id === userId ? { ...item, isLocked: !item.isLocked } : item
            )
        );
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredData = tableData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery)
    );

    return (
        <>
            <div className="wrapper" style={{ fontFamily: "Arial, sans-serif" }}>
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <a className="sidebar-brand" href="index.html">
                            <a className="navbar-brand text-brand d-flex align-items-center" href="/">
                                <img src="/assets/img/logo.png" alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
                                <span className="color-b" style={{ color: '#fff' }}>Rent</span>
                                <span className="color-b" style={{ color: '#28a745' }}>Mate</span>
                            </a>
                            <span className="align-middle">QUẢN TRỊ VIÊN</span>
                        </a>
                        <SidebarNav />
                    </div>
                </nav>

                <div className="main">
                    <Nav onLogout={onLogout} currentUser={currentUser} />
                    <div className="container-fluid p-0">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Quản lý tài khoản</h5>
                                <h6 className="card-subtitle text-muted"> Quản lý tài khoản có các chức năng phân quyền và khóa tài khoản.</h6>
                            </div>
                            <div className="card-body">
                                <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6"></div>
                                        <div className="col-sm-12 col-md-6">
                                            <div id="datatables-buttons_filter" className="dataTables_filter">
                                                <label>
                                                    Search:
                                                    <input
                                                        type="search"
                                                        className="form-control form-control-sm"
                                                        value={searchQuery}
                                                        onChange={handleSearch}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row dt-row">
                                        <div className="col-sm-12">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr style={{ textAlign: 'center' }}>
                                                        <th>Họ và tên</th>
                                                        <th>Email</th>
                                                        <th>Số điện thoại</th>
                                                        <th>Phân quyền</th>
                                                        <th>Trạng thái</th>
                                                        <th>Chế độ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredData.map((item) => (
                                                        <tr key={item.id}>
                                                            <td style={{ textAlign: 'center' }}>{item.name}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.email}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.phone}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.role}</td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button
                                                                    type="button"
                                                                    className={`btn ${item.isLocked ? 'btn-outline-danger' : 'btn-outline-success'}`}
                                                                    onClick={() => handleLockedAccount(item.id)}
                                                                >
                                                                    {item.isLocked ? 'Mở khóa' : 'Khóa'}
                                                                </button>
                                                            </td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success"
                                                                    onClick={() => handleAuthorization(item.id)}
                                                                >
                                                                    Chi tiết
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <Pagination
                                        itemsPerPage={itemsPerPage}
                                        totalItems={filteredData.length}
                                        currentPage={currentPage}
                                        paginate={paginate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountManagement;
