const mongoose = require('mongoose');

const connectDb = async ()=>{
 
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   strictQuery: true
    });
    console.log(`Database connected successfully: ${conn.connection.host}`);

  }catch(err){
    console.log(err.message);
    process.exit(1);

    // // unhandled promise rejection

    // process.on('unhandledRejection', err => {
    //   console.log(`ERROR: ${err.message}`);
    //   console.log('Shutting down due to unhandled promise rejection')
    //   server.close(() => {
    //     process.exit(1);
    //   })
    // })
  }

}

module.exports = connectDb;

