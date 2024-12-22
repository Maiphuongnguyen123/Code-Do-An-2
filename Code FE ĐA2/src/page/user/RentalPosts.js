import React, { useState } from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { Link } from 'react-router-dom';
// import { sendEmailForContact } from '../../services/fetch/ApiUtils';
// import { toast } from 'react-toastify';

const RentalPosts = (props) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Phòng trọ gần trung tâm quận 1',
      likes: 120,
      comments: 15,
      saves: 30,
      slots: 2,
    },
    {
      id: 2,
      title: 'Căn hộ mini đầy đủ tiện nghi',
      likes: 80,
      comments: 10,
      saves: 20,
      slots: 1,
    },
  ]);

  return (
    <>
      <Header
        authenticated={props.authenticated}
        currentUser={props.currentUser}
        onLogout={props.onLogout}
      />
      <main id="main">
        <section className="intro-single">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="title-single-box">
                  <h1 className="title-single">Đăng bài tìm người ở ghép</h1>
                  <span className="color-text-a">
                    Quản lý và xem các bài tìm người ở ghép của bạn.
                  </span>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <nav
                  aria-label="breadcrumb"
                  className="breadcrumb-box d-flex justify-content-lg-end"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Đăng bài
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className="rental-posts">
          <div className="container">
            <div className="row">
              {posts.map((post) => (
                <div className="col-md-6 mb-4" key={post.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">
                        <strong>Lượt thích:</strong> {post.likes} <br />
                        <strong>Bình luận:</strong> {post.comments} <br />
                        <strong>Lượt lưu:</strong> {post.saves} <br />
                        <strong>Slots trống:</strong> {post.slots}
                      </p>
                      <Link to={`/post/${post.id}`} className="btn btn-primary">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};


export default RentalPosts;