import React, { useState } from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { Link } from 'react-router-dom';
// import { sendEmailForContact } from '../../services/fetch/ApiUtils';
// import { toast } from 'react-toastify';

const RentalPosts = (props) => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Tìm 2 bạn trọ cho phòng ở gần khu BKX, ưu tiên người đã đi làm', likes: 120, comments: 15, saves: 30, slots: 2, location: 'Hai Bà Trưng, Hà Nội', sex: 'Nam', image:"assets/img/phongtro1.jpg" },
    { id: 2, title: 'Qua tết bạn cùng phòng chuyển vào Nam nên muốn tìm 1 bạn nữ vào ở cùng', likes: 80, comments: 10, saves: 20, slots: 1, location: 'Nam Từ Liêm, Hà Nội', sex: 'Nữ' , image:"assets/img/phongtro2.jpg" },
    { id: 3, title: 'Tìm 2 bạn nam vào ở cùng nhà nguyên căn, còn 1 phòng trống', likes: 50, comments: 5, saves: 10, slots: 3, location: 'Đống Đa, Hà Nội', sex: 'Nam', image:"assets/img/phongtro3.jpg"  },
  ]);

  // State cho bộ lọc
  const [filters, setFilters] = useState({ keyword: '', slots: '', location: '' });

  // Hàm xử lý khi người dùng thay đổi bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Áp dụng bộ lọc lên danh sách posts
  const filteredPosts = posts.filter((post) => {
    const keywordMatch = post.title.toLowerCase().includes(filters.keyword.toLowerCase());
    const slotsMatch = filters.slots === '' || post.slots >= parseInt(filters.slots);
    const locationMatch = filters.location === '' || post.location.toLowerCase().includes(filters.location.toLowerCase());

    return keywordMatch && slotsMatch && locationMatch;
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Header authenticated={props.authenticated} currentUser={props.currentUser} onLogout={props.onLogout} />
      <main id="main">
        <section className="intro-single">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="title-single-box">
                  <h1 className="title-single">TÌM Ở GHÉP</h1>
                  <span className="color-text-a">Quản lý và xem các bài tìm người ở ghép ở đây.</span>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                    <li className="breadcrumb-item "><Link to="/">Đăng bài</Link></li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Bộ lọc tìm kiếm */}
        <section className="filter-section">
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm theo từ khóa"
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Số slots trống"
                  name="slots"
                  value={filters.slots}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vị trí"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        </section>

        
        {/* Hiển thị các bài viết */}
        <section className="rental-posts">
          <div className="container">
            <div className="row">
              {posts.map((post) => (
                <div className="col-md-6 mb-4" key={post.id}>
                  <div className="card" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="card-body" style={{ flex: 1 }}>
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">
                        <strong>Lượt thích:</strong> {post.likes} <br />
                        <strong>Bình luận:</strong> {post.comments} <br />
                        <strong>Lượt lưu:</strong> {post.saves} <br />
                        <strong>Slots trống:</strong> {post.slots} <br />
                        <strong>Vị trí:</strong> {post.location}
                      </p>
                      <Link to={`/post/${post.id}`} className="btn btn-primary">Xem chi tiết</Link>
                    </div>
                    <div style={{ width: '150px' }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="img-fluid rounded"
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};


export default RentalPosts;