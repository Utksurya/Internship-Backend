const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const names = ['Rahul', 'Kamal', 'Sanak', 'Pooja', 'Meena', 'Amit', 'Neha', 'Raj', 'Tina', 'Varun'];

  await User.deleteMany({});
  for (let name of names) {
    await new User({ name }).save();
  }

  console.log("Users seeded");
  mongoose.disconnect();
};

seedUsers();
