import React, { useState, useEffect } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from "react-toastify";
// import Pagination from "./Pagnation";
// import { getAllRoomOfCustomer } from "../../services/fetch/ApiUtils";

const mockRooms = [
    {
        id: 1,
        title: "Phòng trọ đẹp quận Hai Bà Trưng",
        description: "Tiện nghi, gần khu Bách Kinh Xây.",
        price: 3000000,
        area: 25, // diện tích phòng
        status: "ROOM_RENT",
        location: { cityName: "Quận Hai Bà Trưng, Hà Nội" },
        category: { name: "Phòng trọ" },
        user: { name: "Nguyễn Mai Phương" },
        roomMedia: [{ files: "assets/img/phongtro1.jpg" }]
    },
    {
        id: 2,
        title: "Căn hộ cao cấp quận Đống Đa",
        description: "Căn hộ đầy đủ tiện nghi.",
        price: 5000000,
        area: 45, // diện tích phòng
        status: "ROOM_RENT",
        location: { cityName: "Quận Đống Đa, Hà Nội" },
        category: { name: "Căn hộ" },
        user: { name: "Doãn Thuỳ Dương" },
        roomMedia: [{ files: "assets/img/phongtro2.jpg" }]
    },
    {
        id: 3,
        title: "Phòng trọ tiện nghi quận Hoàng Mai",
        description: "Phòng thoáng mát, sạch sẽ.",
        price: 2500000,
        area: 20, // diện tích phòng
        status: "ROOM_RENT",
        location: { cityName: "Quận Hoàng Mai, Hà Nội" },
        category: { name: "Phòng trọ" },
        user: { name: "Nguyễn Huyền Trang" },
        roomMedia: [{ files: "assets/img/phongtro3.jpg" }]
    },
];

const RentalHome = (props) => {
    const [rooms, setRooms] = useState(mockRooms);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState(''); // Lọc theo khoảng giá
    const [cateId, setCateId] = useState('');
    const [area, setArea] = useState(''); // Lọc diện tích
    const [locationFilter, setLocationFilter] = useState(''); // Lọc vị trí

    // useEffect(() => {
    //     fetchData();
    // }, [currentPage, searchQuery, price, cateId]);

  
    
        useEffect(() => {
            let filteredRooms = mockRooms;
    
            if (searchQuery) {
                filteredRooms = filteredRooms.filter(room =>
                    room.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
    
            if (priceRange) {
                switch (priceRange) {
                    case "below2":
                        filteredRooms = filteredRooms.filter(room => room.price < 2000000);
                        break;
                    case "between2and4":
                        filteredRooms = filteredRooms.filter(room => room.price >= 2000000 && room.price <= 4000000);
                        break;
                    case "between4and6":
                        filteredRooms = filteredRooms.filter(room => room.price > 4000000 && room.price <= 6000000);
                        break;
                    case "custom":
                        // Custom logic sẽ được bổ sung sau nếu cần
                        break;
                    default:
                        break;
                }
            }
    
            if (cateId) {
                filteredRooms = filteredRooms.filter(room => room.category.name === cateId);
            }
    
            // Lọc theo diện tích
        if (area) {
            filteredRooms = filteredRooms.filter(room => room.area >= parseInt(area));
        }

        // Lọc theo vị trí
        if (locationFilter) {
            filteredRooms = filteredRooms.filter(room =>
                room.location.cityName.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        setRooms(filteredRooms);
    }, [searchQuery, priceRange, cateId, area, locationFilter]);

    // const fetchData = () => {
    //     getAllRoomOfCustomer(currentPage, itemsPerPage, searchQuery, price, cateId).then(response => {
    //         setRooms(response.content);
    //         setTotalItems(response.totalElements);
    //     }).catch(
    //         error => {
    //             toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
    //         }
    //     )
    // }
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePriceRangeChange = (event) => { // Định nghĩa đúng hàm
        setPriceRange(event.target.value) ;
    };

    const handleCategoryChange = (event) => {
        setCateId(event.target.value);
    };

    // const paginate = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };

    return (
        <>
            <Header authenticated={props.authenticated} currentUser={props.currentUser} onLogout={props.onLogout} />
            <main id="main">
                <section className="intro-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-4">
                                <div className="title-single-box">
                                    <h2 className="title-single">PHÒNG TRỌ</h2>
                                    <span className="color-text-a">Tìm phòng trọ như ý tại đây</span>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-8">
                                <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Trang chủ</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="property-grid grid">
    <div className="container">
        {/* Dòng tìm kiếm từ khóa */}
        <div className="row mb-3">
            <div className="col-12">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        name="searchQuery"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        id="inputAddress"
                        placeholder="Tìm theo từ khoá"
                    />
                    <button className="btn btn-primary" type="button">
                        <i className="bi bi-search" ></i>
                    </button>
                </div>
            </div>
        </div>

        {/* Dòng các bộ lọc */}
        <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-sm-3">
                <select
                    className="form-select"
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                >
                    <option value="">Khoảng giá...</option>
                    <option value="below2">Dưới 2 triệu</option>
                    <option value="between2and4">2 - 4 triệu</option>
                    <option value="between4and6">4 - 6 triệu</option>
                    <option value="custom">Tuỳ chỉnh</option>
                </select>
            </div>


                            <div className="col-sm-3">
                                <select className="form-select" id="categoryId" name="categoryId"                                     
                                    value={cateId}
                                    onChange={handleCategoryChange}>
                                    <option value={0}>Loại phòng</option>
                                    <option value={1}>Bất động sản</option>
                                    <option value={2}>Phòng trọ</option>
                                    <option value={3}>Chung cư mini</option>
                                </select>
                            </div>
                            <div className="col-sm-3">
        <input
            type="number"
            className="form-control"
            name="area"
            placeholder="Diện tích (m²)"
            onChange={(e) => setArea(e.target.value)} // Xử lý diện tích
        />
    </div>
    <div className="col-sm-3">
        <input
            type="text"
            className="form-control"
            name="location"
            placeholder="Vị trí"
            onChange={(e) => setLocationFilter(e.target.value)} // Xử lý vị trí
        />
    </div>
                        </div>
                        <div className="row">
                            {rooms.map(room => (

                                <div className="col-md-4">
                                    <div className="card-box-a card-shadow">
                                        <div className="img-box-a">
                                            {room.roomMedia[0] ?
                                                <img src={room.roomMedia[0].files}  alt="" className="img-a img-fluid" style={{ width: "350px", height: "350px" }} />
                                                :
                                                <img src="assets/img/property-1.jpg" alt="" className="img-a img-fluid" style={{ width: "350px", height: "450px" }} />
                                            }
                                        </div>
                                        <div className="card-overlay">
                                            <div className="card-overlay-a-content">
                                                <div className="card-header-a">
                                                    <h2 className="card-title-a">
                                                        <Link to={`/rental-home/${room.id}`}>
                                                            <b>{room.title}</b>
                                                            <br /> <small>{room.description}</small>
                                                        </Link>

                                                    </h2>
                                                </div>
                                                <div className="card-body-a">
                                                    <div className="price-box d-flex">
                                                        <span className="price-a">
                                                            {room.status === "ROOM_RENT" && `Cho thuê |  ${room.price.toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}`}
                                                            {room.status === "HIRED" && `Đã thuê | ${room.price.toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}`}
                                                            {room.status === "CHECKED_OUT" && `Đã trả phòng | ${room.price.toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}`}
                                                        </span>
                                                    </div>
                                                    <Link to={`/rental-home/${room.id}`}>Xem chi tiết
                                                        <span className="bi bi-chevron-right"></span>
                                                    </Link>
                                                </div>
                                                <div className="card-footer-a">
                                                    <ul className="card-info d-flex justify-content-around">
                                                        <li>
                                                            <h4 className="card-info-title">Vị trí</h4>
                                                            <span>{room.location.cityName}
                                                                <sup></sup>
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <h4 className="card-info-title">Loại</h4>
                                                            <span>{room.category.name}</span>
                                                        </li>
                                                        <li>
                                                            <h4 className="card-info-title">Người cho thuê</h4>
                                                            <span>{room.user.name}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        {/* <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={totalItems}
                            currentPage={currentPage}
                            paginate={paginate}
                        /> */}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default RentalHome;