import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalPages: 3,
            rooms: [], // Mảng lưu trữ danh sách phòng trọ
            sortingOption: "Thời gian: Mới đến cũ",
            rentaler: [],
        };
    }

    // Thay thế backend bằng mock data
    componentDidMount() {
        this.fetchMockData();
    }

    // Hàm mock data
    fetchMockData = () => {
        // Dữ liệu cứng cho phòng trọ
        const mockRooms = [
            {
                id: 1,
                title: "Phòng trọ đẹp quận Hai Bà Trưng",
                description: "Tiện nghi, gần khu Bách Kinh Xây.",
                price: 3000000,
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
                status: "ROOM_RENT",
                location: { cityName: "Quận Hoàng Mai, Hà Nội" },
                category: { name: "Phòng trọ" },
                user: { name: "Nguyễn Huyền Trang" },
                roomMedia: [{ files: "assets/img/phongtro3.jpg" }]
            },
        ];

        // Dữ liệu cứng cho người cho thuê
        const mockRentaler = [
            {
                id: 1,
                name: "Nguyễn Mai Phương",
                phone: "0365744905",
                email: "maiphuong@gmail.com",
                imageUrl: "assets/img/maiphuong.jpg",
                review: "4,9",
                area: "Hai Bà Trưng",
                roomslot: "2",
            },
            {
                id: 2,
                name: "Doãn Thuỳ Dương",
                phone: "0987654321",
                email: "doanthuyduong@gmail.com",
                imageUrl: "assets/img/thuyduong.jpg",
                review: "4,8",
                area: "Đống Đa",
                roomslot: "1",
            },
            {
                id: 3,
                name: "Nguyễn Huyền Trang",
                phone: "0987654625",
                email: "huyentrang@gmail.com",
                imageUrl: "assets/img/huyentrang.jpg",
                review: "4,7",
                area: "Hoàng Mai",
                roomslot: "5",
            },
        ];

        this.setState({
            rooms: mockRooms,
            rentaler: mockRentaler,
        });

        toast.success("Dữ liệu đã được tải thành công!");
    };

    render() {
        const { rooms, rentaler } = this.state;

        return (
            <div style={{ fontFamily: "Arial, sans-serif" }}>
            <main id="main">
                <section className="section-services section-t8">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="title-wrap d-flex justify-content-between">
                                    <div className="title-box">
                                        <h2 className="title-a">Giới thiệu về RenMate</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                            <div className="card-box-c foo">
                                    <div className="card-header-c d-flex">
                                        
                                            
                                        
                                        <div className="card-title-c align-self-center">
                                            <h3 className="title-a" style={{
                                                border: "4px solid #28a745",
                                                padding: "5px 10px",
                                                display: "inline-block",
                                                borderRadius: "4px",
                                                fontWeight: "bold"
                                            }}>Tầm nhìn</h3>
                                        </div>
                                    </div>
                                    <div className="card-body-c">
                                        <p className="content-c" style={{ color: 'black' }}>
                                        Trở thành nền tảng hàng đầu kết nối giữa người thuê trọ và chủ nhà, cung cấp trải nghiệm tìm kiếm, quản lý phòng trọ và thanh toán trực tuyến dễ dàng, minh bạch và đáng tin cậy.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-box-c foo">
                                    <div className="card-header-c d-flex">
                                        
                                    <div className="card-title-c align-self-center">
                                            <h3 className="title-a" style={{
                                                border: "4px solid #28a745",
                                                padding: "5px 10px",
                                                display: "inline-block",
                                                borderRadius: "4px",
                                                fontWeight: "bold"
                                            }}>Sứ mệnh</h3>
                                        </div>
                                    </div>
                                    <div className="card-body-c">
                                        <p className="content-c" style={{ color: 'black' }}> 
                                        1. Tạo môi trường trực tuyến hiệu quả giúp người thuê trọ tìm kiếm không gian sống phù hợp nhanh chóng.
                                        <br />2. Hỗ trợ chủ nhà quản lý phòng trọ thông minh và chuyên nghiệp.
                                        <br />3. Đảm bảo sự minh bạch và an toàn trong giao dịch giữa các bên.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-box-c foo">
                                    <div className="card-header-c d-flex">
                                        
                                    <div className="card-title-c align-self-center">
                                            <h3 className="title-a" style={{
                                                border: "4px solid #28a745",
                                                padding: "5px 10px",
                                                display: "inline-block",
                                                borderRadius: "4px",
                                                fontWeight: "bold"
                                            }}>Giá trị cốt lõi</h3>
                                        </div>
                                    </div>
                                
                                    <div className="card-body-c">
                                        <p className="content-c" style={{ color: 'black' }}>
                                        1. Minh bạch: Cam kết cung cấp thông tin chính xác và rõ ràng về phòng trọ và giao dịch.
                                        <br />2. Tiện lợi: Tối ưu hóa quy trình tìm kiếm, quản lý và thanh toán trọ.
                                        <br />3. Tin cậy: Xây dựng niềm tin thông qua xác thực thông tin và hỗ trợ kịp thời.
                                        <br />4. Đổi mới: Không ngừng nâng cấp công nghệ để đáp ứng nhu cầu ngày càng cao của người dùng.
                                        <br />5. Kết nối: Tạo nền tảng để người thuê và chủ nhà dễ dàng tương tác và giao dịch.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            
                </section>

                <section className="section-property section-t8">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="title-wrap d-flex justify-content-between">
                                    <div className="title-box">
                                        <h2 className="title-a">Bài đăng mới nhất</h2>
                                    </div>
                                    <div className="title-link">
                                        <a href="/rental-home">Tất cả bài đăng
                                            <span className="bi bi-chevron-right"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="property-grid grid">
                            <div className="row">
                                {rooms.map(room => (
                                    <div className="col-md-4" key={room.id}>
                                        <div className="card-box-a card-shadow">
                                            <div className="img-box-a">
                                                {room.roomMedia[0] ?
                                                    <img src={room.roomMedia[0].files} alt="" className="img-a img-fluid" style={{ width: "350px", height: "350px" }} />
                                                    :
                                                    <img src="assets/img/property-1.jpg" alt="" className="img-a img-fluid" style={{ width: "350px", height: "350px" }} />
                                                }
                                            </div>
                                            <div className="card-overlay">
                                                <div className="card-overlay-a-content">
                                                    <div className="card-header-a">
                                                        <h2 className="card-title-a">
                                                            <Link to={`/rental-home/${room.id}`}>
                                                                <b style={{ fontSize: '25px' }}>{room.title}</b>
                                                                <br /> <small style={{ fontSize: '15px' }}>{room.description}</small>
                                                            </Link>
                                                        </h2>
                                                    </div>
                                                    <div className="card-body-a">
                                                        <div className="price-box d-flex">
                                                            <span className="price-a" >
                                                                {room.status === "ROOM_RENT" && `Cho thuê |  ${room.price.toLocaleString('vi-VN', {
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
                                                                <h4 className="card-info-title" style={{ fontSize: '10px' }}>Vị trí</h4>
                                                                <span style={{ fontSize: '10px' }}>{room.location.cityName}</span>
                                                            </li>
                                                            <li>
                                                                <h4 className="card-info-title" style={{ fontSize: '10px' }}>Loại</h4>
                                                                <span style={{ fontSize: '10px' }}>{room.category.name}</span>
                                                            </li>
                                                            <li>
                                                                <h4 className="card-info-title" style={{ fontSize: '10px' }}>Người cho thuê</h4>
                                                                <span style={{ fontSize: '10px' }}>{room.user.name}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-agents section-t8">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="title-wrap d-flex justify-content-between">
                                    <div className="title-box">
                                        <h2 className="title-a">Người cho thuê</h2>
                                    </div>
                                    <div className="title-link">
                                        <a href="agents-grid.html">Tất cả người cho thuê trọ
                                            <span className="bi bi-chevron-right"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {rentaler.map(rentaler => (
                                <div className="col-md-4" key={rentaler.id}>
                                    <div className="card-box-a card-shadow">
                                        <div className="img-box-a">
                                            {rentaler.imageUrl ? (
                                                <img src={rentaler.imageUrl} alt={rentaler.name} className="img-a img-fluid" style={{ width: "350px", height: "350px",objectFit: "cover" }} />
                                            ) : (
                                                <img src="assets/img/agent-4.jpg" alt={rentaler.name} className="img-a img-fluid" style={{ width: "350px", height: "350px", objectFit: "cover" }} />
                                            )}
                                            <div className="card-overlay">
                                                <div className="card-overlay-a-content">
                                                    <div className="card-header-a">
                                                        <h2 className="card-title-a">
                                                            <Link to={`/angent-single/` + rentaler.id} className="link-two">
                                                                {rentaler.name}
                                                            </Link>
                                                            <br /> <small style={{ fontSize: '15px' }}> Số phòng trống: {rentaler.roomslot}</small>
                                                            <br /> <small style={{ fontSize: '15px' }}> Khu vực cho thuê: {rentaler.area}</small>
                                                        </h2>
                                                    </div>
                                                    <div className="card-body-a">
                                                        <p className="content-a color-text-a" style={{ color: "white" }}>
                                                            {rentaler.address}
                                                        </p>
                                                    </div>
                                                    <div className="card-footer-a">
                                                        <ul className="card-info d-flex justify-content-around">
                                                            <li>
                                                                <h4 className="card-info-title" style={{ fontSize: '10px' }}>Số điện thoại</h4>
                                                                <span style={{ fontSize: '10px' }}>{rentaler?.phone}</span>
                                                            </li>
                                                            <li>
                                                                <h4 className="card-info-title" style={{ fontSize: '10px' }}>Email</h4>
                                                                <span style={{ fontSize: '10px' }}>{rentaler?.email}</span>
                                                            </li>
                                                            <li>
                                                                <h4 className="card-info-title" style={{ fontSize: '10px' }}>Đánh giá</h4>
                                                                <span style={{ fontSize: '10px' }}>{rentaler?.review }</span>
                                                                <span className="bi bi-star"></span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            </div>
        );
    }
}

export default Home;