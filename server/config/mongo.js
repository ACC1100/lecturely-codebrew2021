import mongoose from 'mongoose';

/**
 * init database connection
 * to be called once when starting app
 * and use connection for all transactions
 * @returns {Promise<void>}
 */
const mongoConnect = async () => {
  await mongoose.connect('mongodb+srv://admin:codebrew2021@cluster0.1jqux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
}

export default mongoConnect;