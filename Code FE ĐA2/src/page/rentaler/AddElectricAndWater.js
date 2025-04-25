import { useState } from "react";
import Nav from "./Nav";
import SidebarNav from "./SidebarNav";
import { toast } from "react-toastify";

const AddElectric = (props) => {
  const { currentUser, onLogout } = props;

  // Mock data for rooms and their services
  const mockRoomData = [
    {
      id: 1,
      title: "Phòng 101",
      contractRent: 5000000, // Rent from the contract
      services: ["Tiền điện", "Tiền nước", "Internet", "Vệ sinh"],
    },
    {
      id: 2,
      title: "Phòng 102",
      contractRent: 4500000,
      services: ["Tiền điện", "Tiền nước", "Internet"],
    },
    {
      id: 3,
      title: "Phòng 103",
      contractRent: 4000000,
      services: ["Tiền điện", "Tiền nước", "Vệ sinh"],
    },
  ];

  const [roomOptions] = useState(mockRoomData);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [serviceDetails, setServiceDetails] = useState({});
  const [discount, setDiscount] = useState(0);

  const handleRoomChange = (event) => {
    const roomId = event.target.value;
    const room = roomOptions.find((room) => room.id === parseInt(roomId, 10));
    setSelectedRoom(room);
    // Initialize service details for the selected room
    setServiceDetails(
      room
        ? Object.fromEntries(
            room.services.map((service) => [service, { unitPrice: 0, quantity: 0, note: "" }])
          )
        : {}
    );
  };

  const handleServiceChange = (service, field, value) => {
    setServiceDetails((prevDetails) => ({
      ...prevDetails,
      [service]: {
        ...prevDetails[service],
        [field]: field === "quantity" || field === "unitPrice" ? parseFloat(value) || 0 : value,
      },
    }));
  };

  const calculateServiceTotal = (service) => {
    const { quantity, unitPrice } = serviceDetails[service] || {};
    return (quantity || 0) * (unitPrice || 0);
  };

  const calculateTotal = () => {
    const servicesTotal = Object.keys(serviceDetails).reduce(
      (sum, service) => sum + calculateServiceTotal(service),
      0
    );
    return (selectedRoom?.contractRent || 0) + servicesTotal - discount;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedRoom) {
      toast.error("Vui lòng chọn phòng.");
      return;
    }

    console.log("Dữ liệu chi phí gửi lên:", {
      roomId: selectedRoom.id,
      contractRent: selectedRoom.contractRent,
      discount,
      serviceDetails,
      total: calculateTotal(),
    });

    toast.success("Thêm chi phí thành công!");
  };

  return (
    <div>
      <div className="wrapper" style={{ fontFamily: "Arial, sans-serif" }}>
        <nav id="sidebar" className="sidebar js-sidebar">
          <div className="sidebar-content js-simplebar">
            <a className="sidebar-brand" href="/">
              <img
                src="/assets/img/logo.png"
                alt="Logo"
                style={{ height: "30px", marginRight: "10px" }}
              />
              <span style={{ color: "#fff" }}>Rent</span>
              <span style={{ color: "#28a745" }}>Mate</span>
            </a>
            <SidebarNav />
          </div>
        </nav>

        <div className="main">
          <Nav onLogout={onLogout} currentUser={currentUser} />

          <div className="container-fluid p-0">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Thêm tiền trọ</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="roomSelect">
                      Chọn phòng
                    </label>
                    <select
                      id="roomSelect"
                      className="form-select"
                      onChange={handleRoomChange}
                    >
                      <option value="">Chọn...</option>
                      {roomOptions.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedRoom && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Tiền trọ (theo hợp đồng)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedRoom.contractRent}
                          disabled
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Giảm giá (nếu có)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={discount}
                          onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        />
                      </div>

                      <h6>Các dịch vụ:</h6>
                      {selectedRoom.services.map((service) => (
                        <div className="mb-3" key={service}>
                          <label className="form-label">{service}</label>
                          <div className="row">
                            <div className="col">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Số lượng"
                                value={serviceDetails[service]?.quantity || ""}
                                onChange={(e) =>
                                  handleServiceChange(service, "quantity", e.target.value)
                                }
                              />
                            </div>
                            <div className="col">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Đơn giá"
                                value={serviceDetails[service]?.unitPrice || ""}
                                onChange={(e) =>
                                  handleServiceChange(service, "unitPrice", e.target.value)
                                }
                              />
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Ghi chú"
                                value={serviceDetails[service]?.note || ""}
                                onChange={(e) =>
                                  handleServiceChange(service, "note", e.target.value)
                                }
                              />
                            </div>
                            <div className="col">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Tổng cộng"
                                value={calculateServiceTotal(service)}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="mb-3">
                        <label className="form-label">Tổng chi phí</label>
                        <input
                          type="text"
                          className="form-control"
                          value={calculateTotal()}
                          disabled
                        />
                      </div>
                    </>
                  )}

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddElectric;
