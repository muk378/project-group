module.exports = {
  DB_URL : process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ReportOnline',
  PORT : process.env.PORT || '3000'
};