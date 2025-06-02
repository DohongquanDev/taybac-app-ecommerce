-- ========================================
-- 1. TẠO DATABASE
-- ========================================
IF DB_ID('TayBacDB') IS NOT NULL
    DROP DATABASE TayBacDB;
GO

CREATE DATABASE TayBacDB;
GO

USE TayBacDB;
GO

-- ========================================
-- 2. TẠO CÁC BẢNG VÀ THÊM DỮ LIỆU
-- ========================================

-- Shipping - Giao hàng
CREATE TABLE Shipping (
    ShippingID INT PRIMARY KEY IDENTITY(1,1),
    ShippingMethod NVARCHAR(100),
    TrackingNumber NVARCHAR(100),
    ShippingCost DECIMAL(10,2),
    ShippedDate DATE
);

-- Customers - Khách hàng
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    CustomerName NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20),
    Email NVARCHAR(100),
    Address NVARCHAR(255)
);

-- Employees - Nhân viên
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY IDENTITY(1,1),
    FullName NVARCHAR(100),
    Position NVARCHAR(50),
    Phone NVARCHAR(20),
    Email NVARCHAR(100)
);

-- Categories - Loại sản phẩm
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255)
);

-- Suppliers - Nhà cung cấp
CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY IDENTITY(1,1),
    SupplierName NVARCHAR(100) NOT NULL,
    ContactName NVARCHAR(100),
    Phone NVARCHAR(20),
    Address NVARCHAR(255),
    Region NVARCHAR(100)
);

-- Products - Sản phẩm
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100) NOT NULL,
    CategoryID INT FOREIGN KEY REFERENCES Categories(CategoryID),
    SupplierID INT FOREIGN KEY REFERENCES Suppliers(SupplierID),
    Unit NVARCHAR(50),
    Price DECIMAL(10,2),
    Description NVARCHAR(255)
);

-- Orders - Đơn hàng
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID),
    OrderDate DATE DEFAULT GETDATE(),
    RequiredDate DATE,
    ShippedDate DATE,
    ShippingID INT FOREIGN KEY REFERENCES Shipping(ShippingID),
    Status NVARCHAR(50) DEFAULT 'Pending'
);

-- OrderDetails - Chi tiết đơn hàng
CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    Quantity INT,
    UnitPrice DECIMAL(10,2),
    Discount DECIMAL(5,2) DEFAULT 0
);

CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARBINARY(64) NOT NULL,
    FullName NVARCHAR(100),
    Email NVARCHAR(100),
    Role NVARCHAR(50) DEFAULT 'staff',
    CreatedDate DATETIME DEFAULT GETDATE()
);

-- Inventory - Tồn kho
CREATE TABLE Inventory (
    InventoryID INT PRIMARY KEY IDENTITY(1,1),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    QuantityInStock INT,
    LastUpdated DATETIME DEFAULT GETDATE()
);

-- Payments - Thanh toán
CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID),
    PaymentDate DATE DEFAULT GETDATE(),
    Amount DECIMAL(10,2),
    PaymentMethod NVARCHAR(50)
);

-- ========================================
-- 3. THÊM DỮ LIỆU MẪU
-- ========================================
INSERT INTO Users (Username, PasswordHash, FullName, Email, Role)
VALUES
(N'admin', HASHBYTES('SHA2_256', CONVERT(VARBINARY, 'admin123')), N'Administrator', N'admin@example.com', N'admin'),
(N'user1', HASHBYTES('SHA2_256', CONVERT(VARBINARY, 'user123')), N'User One', N'user1@example.com', N'staff');
-- Categories
INSERT INTO Categories (CategoryName, Description)
VALUES
(N'Đặc sản khô', N'Măng khô, trâu gác bếp, nấm rừng'),
(N'Mật ong', N'Mật ong bạc hà, mật ong rừng'),
(N'Rượu đặc sản', N'Rượu ngô, rượu táo mèo'),
(N'Gia vị núi rừng', N'Mắc khén, hạt dổi'),
(N'Trái cây sấy', N'Chuối sấy, mít sấy');

-- Suppliers
INSERT INTO Suppliers (SupplierName, ContactName, Phone, Address, Region)
VALUES
(N'Hợp tác xã Đồng Văn', N'A Tủa', '0888000111', N'Thị trấn Đồng Văn, Hà Giang', N'Hà Giang'),
(N'HTX Mường La', N'Lò Văn Dũng', '0888000222', N'Huyện Mường La, Sơn La', N'Sơn La'),
(N'Cơ sở Bắc Hà', N'Dương Văn Tài', '0888000333', N'Huyện Bắc Hà, Lào Cai', N'Lào Cai');

-- Products
INSERT INTO Products (ProductName, CategoryID, SupplierID, Unit, Price, Description)
VALUES
(N'Mật ong bạc hà Hà Giang', 2, 1, N'chai 500ml', 180000, N'Mật ong bạc hà nguyên chất'),
(N'Trâu gác bếp 500g', 1, 2, N'túi 500g', 250000, N'Trâu hun khói kiểu Tây Bắc'),
(N'Rượu ngô Bắc Hà', 3, 3, N'chai 700ml', 120000, N'Rượu ngô men lá truyền thống'),
(N'Măng khô rừng', 1, 2, N'túi 500g', 100000, N'Măng rừng phơi khô tự nhiên'),
(N'Hạt mắc khén', 4, 1, N'gói 100g', 45000, N'Gia vị đặc trưng núi rừng');

-- Customers
INSERT INTO Customers (CustomerName, Phone, Email, Address)
VALUES
(N'Nguyễn Văn A', '0912345678', 'a.nguyen@example.com', N'Hà Nội'),
(N'Lê Thị B', '0987654321', 'b.le@example.com', N'TP. Hồ Chí Minh');

-- Employees
INSERT INTO Employees (FullName, Position, Phone, Email)
VALUES
(N'Trần Văn C', N'Bán hàng', '0909090909', 'tranvc@example.com'),
(N'Phạm Thị D', N'CSKH', '0919191919', 'phamd@example.com');

-- Shipping
INSERT INTO Shipping (ShippingMethod, TrackingNumber, ShippingCost, ShippedDate)
VALUES
(N'Giao hàng tiết kiệm', N'GHTK123456', 30000, '2025-06-01'),
(N'VNPost', N'VN123987', 25000, '2025-06-02');

-- Orders
INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, RequiredDate, ShippedDate, ShippingID, Status)
VALUES
(1, 1, '2025-06-01', '2025-06-05', '2025-06-02', 1, 'Shipped'),
(2, 2, '2025-06-01', '2025-06-04', NULL, 2, 'Processing');

-- OrderDetails
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice, Discount)
VALUES
(1, 1, 2, 180000, 0),
(1, 5, 1, 45000, 0),
(2, 2, 1, 250000, 0);

-- Inventory
INSERT INTO Inventory (ProductID, QuantityInStock)
VALUES
(1, 100),
(2, 50),
(3, 80),
(4, 40),
(5, 200);

-- Payments
INSERT INTO Payments (OrderID, PaymentDate, Amount, PaymentMethod)
VALUES
(1, '2025-06-01', 405000, N'Chuyển khoản'),
(2, '2025-06-02', 250000, N'Tiền mặt');
