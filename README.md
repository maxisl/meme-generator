## ℹ️ About
Meme Generator full-stack web app with a Node.js / MongoDB backend and a React frontend

## 💻 Developing
1. Make sure [Node.js](https://nodejs.org/) version 18+ is installed (LTS recommended), includes npm.
2. Install recommended project extensions for your code editor (see `.vscode/extensions.json`).
3. Install project dependencies locally (for client & server): `npm install`
4. Start a local development server (for client & server): `npm run dev`

## 🏃 Running the Project
1. In order for the code to be able to run `mongorestore mongodb://127.0.0.1:65535 --db omm-ws2223 data` as specified within `./mongoserver/package.json` you need to have a local installation of MongoDB. The community edition suffices. It can be downloaded in the [MongoDB download center](https://www.mongodb.com/try/download/community).
2. Finally you will just need to run `cd mememuc-launcher && npm run installall && npm start`

## 📦 Used Packages (Client)
### Development
| Package | License | Use |
|:--- |:--- |:--- |
| [Vite](https://www.npmjs.com/package/vite) | [MIT](https://github.com/vitejs/vite/blob/main/LICENSE) | Frontend Tooling (Dev Server & Bundling)
| [MIT](https://github.com/postcss/postcss/blob/main/LICENSE) ([MIT](https://github.com/postcss/autoprefixer/blob/main/LICENSE)) | CSS post-processing (for auto browser prefixes)
| [ESLint](https://www.npmjs.com/package/eslint) ([ESLint Plugin Svelte](https://www.npmjs.com/package/eslint-plugin-svelte)) | [MIT](https://github.com/eslint/eslint/blob/main/LICENSE) ([MIT](https://github.com/ota-meshi/eslint-plugin-svelte/blob/main/LICENSE)) | Code Linting (for Svelte)

## Libraries
Production:
| Name & Link | License | Description |
| ----------- | ------- | ----------- |
| [Express](https://expressjs.com/) | [MIT](https://github.com/expressjs/express/blob/master/LICENSE) |Fast, unopinionated, minimalist web framework for Node.js |
| [Mongoose](https://mongoosejs.com/) | MIT | Wrapper library for interaction with MongoDB with a schema-based data modeling approach, with built-in type casting, validation, query building and more | 
| [Multer](https://github.com/expressjs/multer) | [MIT](https://github.com/expressjs/multer/blob/master/LICENSE) | Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. |
| [multer-gridfs-storage](https://github.com/devconcept/multer-gridfs-storage) | [MIT](https://github.com/devconcept/multer-gridfs-storage/blob/master/LICENSE) | GridFS storage engine for Multer to store uploaded files directly to MongoDB.
| [cors](https://www.npmjs.com/package/cors) | MIT | cors is a middleware that can be used to enable CORS with various options. |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | MIT | JsonWebToken implementation for node.js |

During development:
| Name & Link | License | Description |
| ----------- | ------- | ----------- |
| [Nodemon](https://nodemon.io/) | MIT | Monitors for any changes in source code and automatically restarts the node.js server |

---
