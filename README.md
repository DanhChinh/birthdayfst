thuhuyen_birthday/
├── frontend/                     # React app
│   ├── public/                  # Assets tĩnh
│   ├── src/
│   │   ├── pages/              # Home, About, Admin, Login...
│   │   ├── components/         # Header, Gallery, MusicToggle...
│   │   ├── api/                # Gọi axios đến backend
│   │   │   └── auth.js         # login(), logout()
│   │   │   └── image.js        # getImages(), uploadImage(), deleteImage()
│   │   └── context/            # AuthContext (giữ trạng thái user)
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   ├── authRoutes.js       # POST /login, /logout
│   │   ├── imageRoutes.js      # GET/POST/DELETE ảnh
│   ├── controllers/            # Xử lý logic từng loại
│   │   ├── authController.js
│   │   └── imageController.js
│   ├── middleware/
│   │   └── authMiddleware.js   # Kiểm tra đăng nhập (token/session)
│   ├── uploads/                # Ảnh được lưu tại đây
│   ├── db.js                   # Kết nối MySQL
│   ├── server.js               # Entry point backend
│   └── package.json
