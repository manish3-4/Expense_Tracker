const ExpenseSchema = require("../models/ExpenseModel")



exports.addExpense = async (req, res) => {
    const {title, amount, type, category, description, date, userid} = req.body

    const expense = new ExpenseSchema({
        title, amount, type, category, description, date, userid
    })

    try {
        if(!title || !amount || !type || !category || !description || !date || !userid){
            console.log("first");
            return res.status(400).json({message: 'All fields are required'});
        }
        if(amount <=0){
            console.log("second");
            return res.status(400).json({message: 'Amount must be positive number'});
        }

        await expense.save()
        res.status(200).json({message: 'Expense Added'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getExpenses = async (req, res) => {
    try {

        const {userid} = req.query;
        const expenses = await ExpenseSchema.find({ userid: userid }).sort({ createdAt: -1 });
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message :'Server Error'})
    }

}


exports.deleteExpense = async (req, res) => {

    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
        res.status(200).json({message :'Expense deleted.'})
    })
    .catch((err) => {
        res.status(500).json({message :'Server Error'})
    })
    
}