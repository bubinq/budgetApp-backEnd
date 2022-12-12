import Budget from "../models/budget.js";

export const getUserBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ ownerId: req.params.userId });
    res.status(200).json(budget);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const setBudget = async (req, res) => {
  try {
    const newBudget = await Budget.create({
      ownerId: req.user.id,
      amount: req.body.amount,
    });
    const savedBudget = await newBudget.save();
    res.status(200).json(savedBudget);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const editBudget = async (req, res) => {
  const { amount, type } = req.body;
  try {
    const budget = await Budget.findOneAndUpdate(
      { ownerId: req.user.id },
      { $inc: { amount: type === "Increase" ? amount : -amount } },
      { new: true }
    );
    res.status(200).json(budget);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
