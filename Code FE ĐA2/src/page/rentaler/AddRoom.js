import { Navigate } from 'react-router-dom';
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { useState } from 'react';
import RoomService from "../../services/axios/RoomService";
import { toast } from 'react-toastify';
import PlacesWithStandaloneSearchBox from './map/StandaloneSearchBox';

function AddRoom(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;

const [roomData, setRoomData] = useState({
  title: '',
  description: '',
  price: 0,
  locationId: 0,
  categoryId: 0,
//   assets: [],
  services: [],
  equipments: []
});

const [roomLocation, setRoomLocation] = useState({
    city: "",
    district: "",
    ward: "",
    street: "",
    detail: ""
  });
  
  
  

      
      

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRoomData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // const handleRemoveAsset = (indexToRemove) => {
    //     setRoomData(prevState => ({
    //         ...prevState,
    //         assets: prevState.assets.filter((asset, index) => index !== indexToRemove)
    //     }));
    // }

    // const handleAssetChange = (event, index) => {
    //     const { name, value } = event.target;
    //     setRoomData(prevState => ({
    //         ...prevState,
    //         assets: prevState.assets.map((asset, i) =>
    //             i === index ? { ...asset, [name]: value } : asset
    //         )
    //     }));
    // };

    const handleFileChange = (event) => {
        setRoomData(prevState => ({
            ...prevState,
            files: [...prevState.files, ...event.target.files]
        }));
    };

    const setLatLong = (lat, long, address) => {
        setRoomData((prevRoomData) => ({
            ...prevRoomData,
            latitude: lat,
            longitude: long,
            address: address,
          }));
      };
      const handleServiceChange = (e, index, field) => {
        const updatedServices = [...roomData.services];
        updatedServices[index][field] = e.target.value;
        setRoomData(prevState => ({ ...prevState, services: updatedServices }));
      };
      
      const handleAddService = () => {
        setRoomData(prevState => ({
          ...prevState,
          services: [...prevState.services, { name: '', price: '' }]
        }));
      };
      
      const handleRemoveService = (index) => {
        const updatedServices = roomData.services.filter((_, i) => i !== index);
        setRoomData(prevState => ({ ...prevState, services: updatedServices }));
      };
      
      const handleEquipmentChange = (e, index) => {
        const updatedEquipments = [...roomData.equipments];
        updatedEquipments[index] = e.target.value;
        setRoomData(prevState => ({ ...prevState, equipments: updatedEquipments }));
      };
      
      const handleAddEquipment = () => {
        setRoomData(prevState => ({
          ...prevState,
          equipments: [...prevState.equipments, '']
        }));
      };
      
      const handleRemoveEquipment = (index) => {
        const updatedEquipments = roomData.equipments.filter((_, i) => i !== index);
        setRoomData(prevState => ({ ...prevState, equipments: updatedEquipments }));
      };
      const handleLocationChange = (e, field) => {
        setRoomLocation({
          ...roomLocation,
          [field]: e.target.value,
        });
      };
      
      
      

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', roomData.title);
        formData.append('description', roomData.description);
        formData.append('price', roomData.price);
        formData.append('latitude', roomData.latitude);
        formData.append('longitude', roomData.longitude);
        formData.append('address', roomData.address);
        formData.append('locationId', roomData.locationId);
        formData.append('categoryId', roomData.categoryId);
        formData.append('asset', roomData.assets.length);
        formData.append('waterCost', roomData.waterCost);
        formData.append('publicElectricCost', roomData.publicElectricCost);
        formData.append('internetCost', roomData.internetCost);
        roomData.assets.forEach((asset, index) => {
            formData.append(`assets[${index}][name]`, asset.name);
            formData.append(`assets[${index}][number]`, asset.number);
        });
        debugger
        roomData.files.forEach((file, index) => {
            formData.append(`files`, file);
        });
    //     console.log(formData.getAll)
    //     RoomService.addNewRoom(formData)
    //         .then(response => {
    //             toast.success(response.message);
    //             toast.success("Đăng tin thành công!!")

    //         })
    //         .then(data => {
    //             console.log(data);
    //             // Do something with the response data here
    //             setRoomData({
    //                 title: '',
    //                 description: '',
    //                 price: 0,
    //                 latitude: 0.0,
    //                 longitude: 0.0,
    //                 address: '',
    //                 locationId: 0,
    //                 categoryId: 0,
    //                 assets: [
    //                     { name: '', number: '' }
    //                 ],
    //                 files: []
    //             });
    //         })
    //         .catch(error => {
    //             toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
    //         });

    //     console.log(roomData);
    // };
    // console.log("Add room", authenticated);
    // if (!authenticated) {
    //     return <Navigate
    //         to={{
    //             pathname: "/login-rentaler",
    //             state: { from: location }
    //         }} />;
    
}
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
                    <div className="container-fluid p-0">
                        <div className="card">
                            <div className="card-header">
                                <h1 className="card-title">Thêm phòng</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label" htmlFor="title">Tiêu đề phòng</label>
                                            <input type="text" className="form-control" id="title" name="title" value={roomData.title} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="price">Giá/ tháng (đơn vị VND)</label>
                                        <input type="number" className="form-control" id="price" name="price" value={roomData.price} onChange={handleInputChange} />
                                    </div>
                                        
                                        
                                    </div>
                                    <div className="mb-3">
                                            <label className="form-label" htmlFor="description">Mô tả</label>
                                            <input type="text" className="form-control" id="description" name="description" value={roomData.description} onChange={handleInputChange} />
                                        </div>
                                    
                                    {/* Dịch vụ */}
    <div className="card-header">
      <h5 className="card-title">Dịch vụ</h5>
    </div>
    <div className="mb-3">
      {roomData.services.map((service, index) => (
        <div key={index} className="row align-items-center mb-3">
          <div className="col-md-6">
            <label className="form-label">Tên dịch vụ</label>
            <input type="text" className="form-control" value={service.name} onChange={(e) => handleServiceChange(e, index, 'name')} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Giá dịch vụ</label>
            <input type="number" className="form-control" value={service.price} onChange={(e) => handleServiceChange(e, index, 'price')} />
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-danger" onClick={() => handleRemoveService(index)}>Xóa</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-primary" slyte = {{color: '#28a745'}} onClick={handleAddService}>Thêm dịch vụ</button>
    </div>
    <div className="card-header">
      <h5 className="card-title">Thiết bị trong phòng</h5>
    </div>
    <div className="mb-3">
      {roomData.equipments.map((equipment, index) => (
        <div key={index} className="row align-items-center mb-3">
          <div className="col-md-6">
            <label className="form-label">Tên thiết bị</label>
            <input type="text" className="form-control" value={equipment} onChange={(e) => handleEquipmentChange(e, index, 'name')} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Số lượng</label>
            <input type="number" className="form-control" value={equipment.qty} onChange={(e) => handleEquipmentChange(e, index, 'price')} />
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-danger" onClick={() => handleRemoveEquipment(index)}>Xóa</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-primary" onClick={handleAddEquipment}>Thêm thiết bị</button>
    </div>
                                    {/* <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label" htmlFor="locationId">Thành phố</label>
                                            <select className="form-select" id="locationId" name="locationId" value={roomData.locationId} onChange={handleInputChange}>
                                                <option value={0}>Chọn...</option>
                                                <option value={1}>Hà Nội</option>
                                            </select>
                                        </div> */}
                                        


                                        {/* Vị trí trọ */}
                                        <div className="card-header">
  <h5 className="card-title">Vị trí trọ</h5>
</div>

{/* Các trường vị trí */}
<div className="mb-3">
  <div className="row align-items-center mb-3">
    <div className="col-md-3">
      <label className="form-label">Thành phố/ Tỉnh</label>
      <select
        className="form-select"
        value={roomLocation?.city || ""}
        onChange={(e) => handleLocationChange(e, "city")}
      >
        <option value="">Chọn Thành phố / Tỉnh</option>
        <option value="Hanoi">Hà Nội</option>
        <option value="HCMC">TP. Hồ Chí Minh</option>
        <option value="Danang">Đà Nẵng</option>
      </select>
    </div>

    <div className="col-md-3">
      <label className="form-label">Quận / Huyện</label>
      <select
        className="form-select"
        value={roomLocation?.district || ""}
        onChange={(e) => handleLocationChange(e, "district")}
      >
        <option value="">Chọn Quận / Huyện</option>
        <option value="dongda">Đống Đa</option>
        <option value="caugiay">Cầu Giấy</option>
      </select>
    </div>

    <div className="col-md-3">
      <label className="form-label">Phường/ Xã</label>
      <select
        className="form-select"
        value={roomLocation?.ward || ""}
        onChange={(e) => handleLocationChange(e, "ward")}
      >
        <option value="">Chọn Phường/ Xã</option>
        <option value="phuong1">Phường Cầu Dền</option>
        <option value="phuong2">Phường Trúc Bạch</option>
      </select>
    </div>

    <div className="col-md-3">
      <label className="form-label">Đường</label>
      <input
        type="text"
        className="form-control"
        placeholder="Đường"
        value={roomLocation?.street || ""}
        onChange={(e) => handleLocationChange(e, "street")}
      />
    </div>
  </div>

  {/* Địa chỉ chi tiết (Ngõ / Ngách) */}
  <div className="row align-items-center mb-3">
    <div className="col-md-12">
      <label className="form-label">Địa chỉ chi tiết</label>
      <input type="text" className="form-control" value={roomLocation?.detail || ""}  onChange={(e) => handleLocationChange(e, "detail")} placeholder="Ngõ, ngách, số nhà" />
    </div>
  </div>
</div>

                                    {/* </div> */}
                                    <div className="row">
                                        <div className="mb-3">
                                            <label className="form-label">Tải Hình Ảnh</label>
                                            <input className="form-control" type="file" name="files" multiple onChange={handleFileChange} />
                                        </div>
                                    </div>
                                    
                                    
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        </>
    )
}

export default AddRoom;