## HR chatting system
### ReactJS, ReactRouter4, Redux, Axios, Antd-Mobile, ExpressJS, MongoDB, HTTP cookie, Socket.io

This is a complete mobile web chatting SPA supporting user signup/login and chatting with different identifications (Employer, Employee). Nested react components is organized by ReactRouter4. With Redux used, the complexity of managing ever-changing states such as user and conversation information is significantly decreased. Frontend sends login/signup data by sending GET or POST requests via Axios to server and backend server accesses and modifies the data in MongoDB via Mongoose. Login information is stored in cookie so that frontend can retrieve login status from server with cookie when users refresh or reload the page. The instant messaging is implemented by Socket.io


### How to run
Start MongoDB:

```sh
mongod
```


Start backend server

```sh
npm install
cd ./server
nodemon server.js
```

Start React
```sh
cd ..
npm start
```
