import React, { useState } from "react";
import './Signup.css';
import { toast } from 'react-toastify';
import { signup } from "../../services/fetch/ApiUtils";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function SignupRentaler(props) {

    const history = useNavigate();
    const location = useLocation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role] = useState('ROLE_RENTALER');

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
      }

    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Number", confirmPassword.length);
        if (password === confirmPassword) {
            const signUpRequest = { name, email,phone, address, password, confirmPassword , role };
            signup(signUpRequest)
                .then(response => {
                    toast.success("Tài khoản đăng kí thành công. Vui lòng kiểm tra email đễ xác thực.");
                    history("/login-rentaler");
                })
                .catch(error => {
                    toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
                });
        } else if (validatePhone(phone) === false) {
            toast.error("Số điện thoại không hợp lệ.")
        }
        
        else if (name === '' || email === '' || password === '' || phone === '' || address === '' || confirmPassword === '') {
            toast.error("Vui lòng điền đầy đủ thông tin.")
        }
        else if (password.length <= 8 || confirmPassword.length <= 8) {
            toast.error("Mật khẩu phải đủ 8 kí tự.")
        }
        else {
            toast.error("Mật khẩu không trùng khớp. Vui lòng nhập lại.")
        }
    }

    if (props.authenticated) {
        return <Navigate
            to={{
                pathname: "/",
                state: { from: location }
            }} />;
    }

    return (
        <>
        <div style={{ fontFamily: "Arial, sans-serif" }}>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 order-md-2">
                            <img src="../../assets/img/background.png" alt="Image" className="img-fluid" />
                        </div>
                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4">
                                        <h3>Đăng kí <a href="/" style={{ textDecoration: 'none' }}>Rent<span className="color-b">Mate</span></a></h3>
                                        <p className="mb-4">Bạn đang đăng ký với vai trò </p> <p classname ="mb-4" style={{ fontWeight: 'bold' }}> NGƯỜI CHO THUÊ TRỌ</p> <p className="mb-4">Nếu bạn có tài khoản hãy <a href="/login-rentaler">Đăng nhập</a></p>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group first">
                                            <span>Email</span>
                                            <input type="email" className="form-control" id="username" name="email"
                                                value={email} onChange={(e) => setEmail(e.target.value)} required />

                                        </div>
                                        <div className="form-group first">
                                            <span>Họ và tên</span>
                                            <input type="text" className="form-control" id="username"
                                                name="name"
                                                value={name} onChange={(e) => setName(e.target.value)} required />


                                        </div>
                                        <div className="form-group first">
                                            <span>Số điện thoại</span>
                                            <input type="text" className="form-control" id="phone"
                                                name="name"
                                                value={phone} onChange={(e) => setPhone(e.target.value)} required />


                                        </div>
                                        <div className="form-group first">
                                            <span>Địa chỉ</span>
                                            <input type="text" className="form-control" id="address"
                                                name="name"
                                                value={address} onChange={(e) => setAddress(e.target.value)} required />


                                        </div>
                                        <div className="form-group last mb-4">
                                            <span>Mật khẩu</span>
                                            <input type="password" className="form-control" id="password"
                                                name="password"
                                                value={password} onChange={(e) => setPassword(e.target.value)} required/>

                                        </div>
                                        <div className="form-group last mb-4">
                                            <span>Nhập lại mật khẩu</span>
                                            <input type="password" className="form-control" id="password"
                                                name="confirmPassword"
                                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                                        </div>


                                        <input type="submit" value="Đăng kí" className="btn text-white btn-block btn-primary" />

                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            </div>
        </>
        
    )
}

export default SignupRentaler;