// Mock data for users, rooms, and other resources
const mockUsers = [
    {
        id: 1,
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
        name: "Admin User",
    },
    {
        id: 2,
        email: "rentaler@gmail.com",
        role: "rentaler",
        name: "Rentaler User",
    },
    {
        id: 3,
        email: "user@gmail.com",
        role: "user",
        name: "Regular User",
    },
];

const mockRooms = [
    { id: 1, title: "Phòng trọ 1", price: 3000000, categoryId: 1 },
    { id: 2, title: "Phòng trọ 2", price: 4000000, categoryId: 2 },
    { id: 3, title: "Phòng trọ 3", price: 5000000, categoryId: 1 },
];

const mockMaintenance = [
    { id: 1, description: "Sửa đèn", status: "Pending" },
    { id: 2, description: "Sửa nước", status: "Completed" },
];

const mockContracts = [
    { id: 1, details: "Contract 1 details" },
    { id: 2, details: "Contract 2 details" },
];

const mockElectricAndWater = [
    { id: 1, details: "Electric and water record 1" },
    { id: 2, details: "Electric and water record 2" },
];

// Mock functions
export function getCurrentUser() {
    return Promise.resolve(mockUsers[2]); // Return the regular user mock data
}
export function getCurrentRentaler() {
    return Promise.resolve(mockUsers[1]); // Return the rentaler mock data
}

export function getCurrentAdmin() {
    return Promise.resolve(mockUsers[0]); // Return the admin mock data
}

export function getAllRoomOfCustomer(pageNo, pageSize, title, price, categoryId) {
    const filteredRooms = mockRooms.filter(
        (room) =>
            (!title || room.title.includes(title)) &&
            (!price || room.price === price) &&
            (!categoryId || room.categoryId === categoryId)
    );
    return Promise.resolve(filteredRooms.slice((pageNo - 1) * pageSize, pageNo * pageSize));
}

export function getAllAccountRentalerForCustomer(pageNo, pageSize) {
    const rentalers = mockUsers.filter((user) => user.role === "rentaler");
    return Promise.resolve(rentalers.slice((pageNo - 1) * pageSize, pageNo * pageSize));
}

export function login(loginRequest) {
    const user = mockUsers.find(
        (u) => u.email === loginRequest.email && loginRequest.password === "123456"
    );
    if (user) {
        return Promise.resolve({ accessToken: "mockAccessToken", user });
    } else {
        return Promise.reject({ message: "Invalid email or password" });
    }
}

export function signup(signupRequest) {
    return Promise.resolve({ message: "User signed up successfully" });
}

export function forgotPassword(emailRequest) {
    return Promise.resolve({ message: "Password reset email sent" });
}

export function getAllRoomOfAdmin(pageNo, pageSize, name) {
    const filteredRooms = mockRooms.filter((room) => !name || room.title.includes(name));
    return Promise.resolve(filteredRooms.slice((pageNo - 1) * pageSize, pageNo * pageSize));
}

export function getAllRoomApprovingOfAdmin(pageNo, pageSize, approve) {
    return Promise.resolve(mockRooms.slice((pageNo - 1) * pageSize, pageNo * pageSize));
}

export function getAllMaintenceOfRentaler(pageNo, pageSize, name) {
    return Promise.resolve(mockMaintenance.slice((pageNo - 1) * pageSize, pageNo * pageSize));
}

export function getAllMaintence(pageNo, pageSize, name) {
    return Promise.resolve(mockMaintenance.slice((pageNo - 1) * pageSize, pageNo * pageSize));
}

export function getAllRoom(pageNo, pageSize, title, price, categoryId) {
    const filteredRooms = mockRooms.filter(
        (room) =>
            (!title || room.title.includes(title)) &&
            (!price || room.price === price) &&
            (!categoryId || room.categoryId === categoryId)
    );
    return Promise.resolve(filteredRooms.slice((pageNo - 1) * pageSize, pageNo * pageSize));
}

export function getRoomDetails(roomId) {
    const room = mockRooms.find((room) => room.id === roomId);
    if (room) {
        return Promise.resolve(room);
    } else {
        return Promise.reject({ message: "Room not found" });
    }
}

export function getRoom(roomId) {
    return getRoomDetails(roomId);
}

export function getRentalerDetails(rentalerId) {
    const rentaler = mockUsers.find((user) => user.id === rentalerId && user.role === "rentaler");
    if (rentaler) {
        return Promise.resolve(rentaler);
    } else {
        return Promise.reject({ message: "Rentaler not found" });
    }
}

export function getAllAccpuntOfAdmin() {
    return Promise.resolve(mockUsers.filter(user => user.role === 'admin'));
}

export function lockedAccount(accountId) {
    return Promise.resolve({ message: `Account with ID ${accountId} locked.` });
}

export function setAuthorization(accountId, role) {
    return Promise.resolve({ message: `Authorization set for account ID ${accountId} to role ${role}.` });
}

export function getAccountById(accountId) {
    const account = mockUsers.find(user => user.id === accountId);
    return account ? Promise.resolve(account) : Promise.reject({ message: 'Account not found' });
}

export function approveRoomOfAdmin(roomId) {
    return Promise.resolve({ message: `Room with ID ${roomId} approved.` });
}

export function removeRoomOfAdmin(roomId) {
    return Promise.resolve({ message: `Room with ID ${roomId} removed.` });
}

export function getNumberOfAdmin() {
    return Promise.resolve({ count: mockUsers.filter(user => user.role === 'admin').length });
}

export function getNumber() {
    return Promise.resolve({ count: 42 }); // Mocked count value
}

export function getAllRoomOfRentaler(rentalerId) {
    return Promise.resolve(mockRooms.filter(room => room.categoryId === rentalerId));
}

export function getRentOfHome(homeId) {
    return Promise.resolve({ rent: 1000000, homeId });
}

export function getMaintenance(maintenanceId) {
    const maintenance = mockMaintenance.find(item => item.id === maintenanceId);
    return maintenance ? Promise.resolve(maintenance) : Promise.reject({ message: 'Maintenance not found' });
}

export function deleteMaintenance(maintenanceId) {
    return Promise.resolve({ message: `Maintenance with ID ${maintenanceId} deleted.` });
}

export function changePassword(accountId, newPassword) {
    return Promise.resolve({ message: `Password for account ID ${accountId} changed.` });
}

export function sendEmailForRentaler(rentalerId, emailContent) {
    return Promise.resolve({ message: `Email sent to rentaler ID ${rentalerId}.` });
}

export function sendRequestForRentaler(rentalerId, requestDetails) {
    return Promise.resolve({ message: `Request sent to rentaler ID ${rentalerId}.` });
}

export function followAgents(agentId) {
    return Promise.resolve({ message: `Following agent ID ${agentId}.` });
}

export function getByMonth(month) {
    return Promise.resolve({ data: `Data for month ${month}.` });
}

export function getAllRequireOfRentaler(rentalerId) {
    return Promise.resolve({ requirements: [`Requirement 1 for rentaler ID ${rentalerId}`, `Requirement 2 for rentaler ID ${rentalerId}`] });
}

export function changeStatusOfRequest(requestId, status) {
    return Promise.resolve({ message: `Request ID ${requestId} status changed to ${status}.` });
}

export function disableRoom(roomId) {
    return Promise.resolve({ message: `Room ID ${roomId} disabled.` });
}

export function saveBlog(blogDetails) {
    return Promise.resolve({ message: `Blog saved.` });
}

export function checkoutRoom(roomId) {
    return Promise.resolve({ message: `Checked out room ID ${roomId}.` });
}

export function getAllBlogStore() {
    return Promise.resolve({ blogs: [`Blog 1`, `Blog 2`] });
}

export function getRequestById(requestId) {
    return Promise.resolve({ request: `Details of request ID ${requestId}` });
}

export function resetPassword(userId, newPassword) {
    return Promise.resolve({ message: `Password reset for user ID ${userId}.` });
}

export function changeConfirmedStatus(accountId, status) {
    return Promise.resolve({ message: `Confirmed status for account ID ${accountId} changed to ${status}.` });
}

export function getAllContractOfRentaler(rentalerId) {
    return Promise.resolve(mockContracts);
}

export function getElectricAndWater(electricAndWaterId) {
    const record = mockElectricAndWater.find(item => item.id === electricAndWaterId);
    return record ? Promise.resolve(record) : Promise.reject({ message: 'Record not found' });
}

export function getAllElectricAndWaterOfRentaler(rentalerId) {
    return Promise.resolve(mockElectricAndWater);
}

export function getContract(contractId) {
    const contract = mockContracts.find(item => item.id === contractId);
    return contract ? Promise.resolve(contract) : Promise.reject({ message: 'Contract not found' });
}

export function getAllRoomHired(userId) {
    return Promise.resolve(mockRooms);
}

export function getAllFollow(userId) {
    return Promise.resolve({ follows: [`Follow 1 for user ID ${userId}`, `Follow 2 for user ID ${userId}`] });
}

export function sendEmailForContact(contactDetails) {
    return Promise.resolve({ message: `Contact email sent.` });
}

export function getAllRequireOfCustomer(customerId) {
    return Promise.resolve({ requirements: [`Requirement 1 for customer ID ${customerId}`, `Requirement 2 for customer ID ${customerId}`] });
}

export function getAllrRoomByUserId(userId) {
    return Promise.resolve(mockRooms);
}
