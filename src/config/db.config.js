const DBConfig = {
    HOST: process.env.DB_RAILWAY_HOST,
    USER: process.env.DB_RAILWAY_USERNAME,
    PASSWORD: process.env.DB_RAILWAY_PASSWORD,
    PORT: process.env.DB_RAILWAY_PORT,
    DB_RAILWAY_NAME: process.env.DB_RAILWAY_NAME
};
// const DBConfig = {
//     HOST: process.env.DB_HOST,
//     USER: process.env.DB_USERNAME,
//     PASSWORD: process.env.DB_PASSWORD,
//     DB_NAME: process.env.DB_NAME
// };


module.exports = DBConfig;
