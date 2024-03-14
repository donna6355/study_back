const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, //for debugin sql log
    dialectOptions: {
      ssl: {
        require: true,
        // 중간자 공격이 발생할 수 있음. true로 설정하려면 SSL 인증서를 다운로드하여 프로젝트에 추가해야 함.
        // ca: fs.readFileSync(path.join(__dirname, '...crt.pem')).toString(),
        rejectUnauthorized: false,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });

module.exports = sequelize;
