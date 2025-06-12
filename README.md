# Tea E-commerce

## 專案架構
- **client**：React + Vite 前端程式碼，包含 pages、components、hooks 等。
- **server**：Node.js + Express 後端程式碼，使用 Sequelize 操作 MySQL。
- **doc**：專案文件與 ER diagram。
- **start.js**：同時啟動前端與後端的開發工具。

## 技術棧
- Frontend：React 19、Vite、React Bootstrap、React Router DOM。
- Backend：Node.js、Express、Sequelize、MySQL。
- 使用 npm workspaces 管理 client 與 server。
- 其他：dotenv、nodemon、axios 等。

## 開發方式
1. 確認本地端已安裝 Node.js 與 npm。
2. 於專案根目錄執行 `npm install` 以安裝 client 與 server 依賴。
3. 執行 `node start.js` 即可同時啟動前端 (`client`) 與後端 (`server`) 開發伺服器。
   - 若需分開啟動，可分別在 `server` 執行 `npm start`，在 `client` 執行 `npm run dev`。
4. 後端啟動時會自動執行 `sequelize.sync({ alter: true })` 並載入 `server/seeders` 的假資料。

## 已實現功能
- 使用者註冊及登入，依角色導向不同介面。
- 商品列表、搜尋與篩選。
- 購物車管理，可加入商品、調整數量或移除。
- 建立訂單並追蹤訂單狀態。
- 店員工作台：即時訂單管理、更新狀態、庫存監控與叫貨。
- 基礎 RESTful API：產品、訂單、庫存及帳號相關操作。

## 其他
- 詳細資料庫結構可參考 [`doc/er_diagram.md`](doc/er_diagram.md) 內的 mermaid 圖表。
