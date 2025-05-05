# NSM Document & Folder Manager

A full-stack document management system with folder hierarchy, file upload, real-time progress, and rich UI filtering, built using **React (Vite + TypeScript)**, **Node.js + Express**, **MongoDB**, and **Cloudinary**.

---

##  Architecture Decisions

###  Tech Stack

| Layer        | Tech                                  |
|--------------|----------------------------------------|
| Frontend     | React (Vite) + TypeScript, SCSS        |
| State        | Zustand (lightweight global store)     |
| Backend      | Express.js (RESTful API)               |
| Database     | MongoDB + Mongoose                     |
| File Storage | Cloudinary                             |
| Realtime     | SSE (Server-Sent Events for upload progress) |

### Component Breakdown (Frontend)

- `FolderTree` & `FolderItem`: Recursive tree view in left panel
- `MiddlePanel`: Table view of folders/files
- `DocumentViewer`: Full-screen document preview
- `CreateFolderModal`, `UploadDocumentModal`, `FilterModal`: Modals
- `TopBar`: Breadcrumb, filter, and actions
- Global state: Zustand (with folderTree, filters, current selection, etc.)

### API Overview

| Method | Endpoint                       | Description                    |
|--------|--------------------------------|--------------------------------|
| GET    | `/api/folders`                 | Get full folder+file tree      |
| GET    | `/api/folders/:id/items`       | Get child folders/files        |
| POST   | `/api/folders`                 | Create a folder                |
| DELETE | `/api/folders/:id`             | Delete folder (recursive)      |
| POST   | `/api/files/upload`            | Upload a file to a folder      |
| DELETE | `/api/files/:id`               | Delete file                    |
| GET    | `/api/files/stream-progress`   | SSE for upload progress        |

---

## Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/Prahladk09/next-smart-move-file-drive.git
cd nsm-doc-manager

### 2. Configure Environment Variables

Backend .env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/nsm-doc-manager
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### Cloudinary Setup guide
1. create account on cloudinary
2. go to dashboard and capy cloud name
3. go to setting > Api keys -- create new api key and copy the api key & apy secret.
### by default pdf and docs are seted to be non delivered on cloudenary, will have to enable it with below steps for display pdf's on UI in iframe.
4. Go to setting > security > PDF and ZIP files delivery -- tick the checkbox and save.


Frontend .env
VITE_API_URL=http://localhost:5001/api

### 3. Install Dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

### 4. Run Project
# Backend
cd backend
npm run dev

# Frontend (Vite)
cd ../frontend
npm run dev
