## NPM Commands

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

## AWS Commands

~~~bash
ssh -i my-blog-key.pem ec2-user@ec2-52-88-58-172.us-west-2.compute.amazonaws.com
sudo yum install git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 14.15.5 # match with local installed node version
npm install -g npm@latest
sudo nano /etc/yum.repos.d/mongodb-org-5.0.repo

# Paste in nano edited file
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc

sudo yum install -y mongodb-org
sudo service mongod start
mongo

# In mongo shell
use my-blog
db.articles.insert([...paste data]);

git clone https://github.com/biswajitpaul01/my-blog.git # use https when 2FA enabled and use Personal access token
cd my-blog
npm install -g forever
forever start -c "npm start" .
forever list # To check if node is running or not
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000 # point port 8000 to 80
# click instance & check "security">"security groups", then "Networks & Security" > "Security Groups" > "Inbound Rules", click edit and add new rule. Select "http" from "Type" dropdown and set "Source" to "Anywhere-IPv4" and then save.
# Open your site from "Instances" > "Public IPv4 DNS"
~~~