# 🌿 Organic Store

An **e-commerce platform** for organic products, built with **Angular** and **Firebase** for secure authentication, real-time database management, and a smooth shopping experience.

## 🚀 Features

- **User Authentication**: Firebase Authentication for secure login and role-based access.
- **Product Management**: Admin panel to add, edit, and delete products.
- **Shopping Cart**: Users can add products to the cart and proceed to checkout.
- **Order Tracking**: Real-time order updates using Firebase Realtime Database.
- **Responsive UI**: Built with Bootstrap 5 and ngx-datatable for a smooth experience.

## 🛠️ Tech Stack

- **Frontend**: Angular, TypeScript, Bootstrap 5, SCSS
- **Backend**: Firebase (Authentication & Realtime Database)
- **Other Dependencies**: ngx-datatable, Bootstrap Icons, @ng-bootstrap/ng-bootstrap

## 📂 Project Structure

```
src/
│── app/
│   ├── admin/            # Admin-related components
│   ├── core/             # Core services and authentication
│   ├── order/            # Order tracking and management
│   ├── shopping/         # Products and shopping cart
│── assets/               # Images and other assets
```

## 📜 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/organic-store.git
   cd organic-store
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the project:
   ```sh
   npm start
   ```

4. Open in browser:  
   ```
   http://localhost:4200
   ```

## 🔑 Authentication & Role-Based Access

- **Users**: Can browse products, add items to cart, and place orders.
- **Admins**: Can manage products and view all orders.

## 📌 Routes Overview

| Route                     | Access  | Description                           |
|---------------------------|---------|---------------------------------------|
| `/products`               | Public  | View available products               |
| `/shopping-cart`          | Public  | View and manage shopping cart         |
| `/login`                  | Public  | User login                            |
| `/check-out`              | User    | Place an order                        |
| `/order-success/:id`      | User    | Order confirmation                    |
| `/my/orders`              | User    | View user's orders                    |
| `/admin/products`         | Admin   | Manage products                       |
| `/admin/orders`           | Admin   | View all customer orders              |

## 🌍 Live Demo

🔗 [Organic Store Live](https://ahmad-ben.github.io/organic-shop/)

## 🌐 Connect With Me  

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/ahmedbenchakhter/) to discuss this project or any other topics related to development!  

## 💬 Feedback  

Feedback is always welcome! Feel free to open an issue or contribute to the repository.
