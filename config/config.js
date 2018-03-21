dbConfig = {
  //dbConnection: process.env.DB_CONNECTION || "mongodb://localhost:27017/surveyApp"
  //dbConnection: process.env.DB_CONNECTION || `mongodb://dbforharsha2803:dbforharsha2803@ds151450.mlab.com:51450/my_db`
  dbConnection: process.env.DB_CONNECTION || `mongodb://dbforharsha2803:dbforharsha2803@ds119059.mlab.com:19059/cos-x`
};

module.exports = {dbConfig};
