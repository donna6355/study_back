module.exports = {
  apps: [
    {
      name: "lecture",
      script: "./index.js",
      node_args: "--env-file .env",
      instances: 4,
    },
  ],
};

//connect ec2 by shell
//chmod 400 "study.pem"
//ssh -i "study.pem" ec2-user@ec2-52-195-183-207.ap-northeast-1.compute.amazonaws.com
//ls, ls -al, cat $folder, cd , exit,

//copy local file to ec2
//scp -i study.pem .env ec2-user@ec2-52-195-183-207.ap-northeast-1.compute.amazonaws.com:/home/ec2-user/app87
//scp -i study.pem -r index.js package.json package-lock.json services routers models controllers config ec2-user@ec2-52-195-183-207.ap-northeast-1.compute.amazonaws.com:/home/ec2-user/app

// npm install pm2 -g
//pm2 ls
// pm2 start ecosystem.config.js
// pm2 monit
// pm2 delete all
//killall -9 node
// pm2 log
