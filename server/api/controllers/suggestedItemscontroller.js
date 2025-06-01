
const suggesteditems = require("../model/suggestedItems");
const Carts = require("../model/suggestedItems");

const getitemsByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    // console.log(email);
    const query = { email: email };
    const result = await suggesteditems.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getitemsByEmail,
  
};
