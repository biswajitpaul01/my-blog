## Installed packages

~~~bash
npm init -y
npm install express
npm install @babel/core @babel/node @babel/preset-env
npx babel-node src/server.js # run server
npm install body-parser
npm install nodemon
npx nodemon --exec npx babel-node src/server.js # run server with nodemon
npm install mongodb
~~~