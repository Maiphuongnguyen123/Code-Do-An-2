import React, { Component } from "react";
import './Login.css';

import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


import { useState } from "react";

function LoginAdmin() {
    

    

    
    

    return (
        <>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 order-md-2">
                            <img src="../../assets/img/backgroundnew.png" alt="Image" className="img-fluid" />
                        </div>
                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4">
                                        <h3>Đăng nhập <a href="/" style={{ textDecoration: 'none' }}>Rent<span className="color-b">Mate</span></a></h3>
                                        <p className="mb-4">Bạn đang đăng nhập với vai trò </p> <p classname ="mb-4" style={{ fontWeight: 'bold' }}> ADMIN</p> <p className="mb-4"></p>
                                    </div>
                                    <LoginForm />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}




function LoginForm() {
    const history = useNavigate();
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    // Mock data: Thông tin người dùng giả lập
    const mockUser = {
        email: "admin@gmail.com",
        password: "123456",
        role: "admin" // Vai trò của người dùng
    };

    const handleInputChange = event => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        setFormState(prevState => ({
            ...prevState,
            [inputName]: inputValue
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        // Kiểm tra thông tin đăng nhập với mock data
        if (
            formState.email === mockUser.email &&
            formState.password === mockUser.password
        ) {
            // Lưu thông tin người dùng và điều hướng dựa trên vai trò
            localStorage.setItem("ACCESS_TOKEN", "mockAccessToken");
            toast.success("Bạn đã đăng nhập thành công!");

            // Điều hướng dựa trên vai trò
            if (mockUser.role === "admin") {
                history("/admin"); // Điều hướng đến trang admin
            } else {
                history("/dashboard"); // Điều hướng đến trang user (nếu cần)
            }

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            toast.error("Email hoặc mật khẩu không chính xác!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group first">
                <span>Email</span>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group last mb-4">
                <span>Mật khẩu</span>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formState.password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <input
                type="submit"
                value="Đăng nhập"
                className="btn text-white btn-block btn-primary"
            />
        </form>
    );
}


export default LoginAdmin;