const mongoose = require("mongoose")
const transactionModel = require("./transaction.model")

const ledgerSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Ledger must be associated with an account"]
        , index: true, immutable: true
    },
    amount: {
        type: Number,
        required: [true, "Account is requires for creating a ledger entry"],
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction ",
        required: [true, "Ledger must be associated with a transaction"],
        index: true,
        immutable: true
    },
    type: {
        type: String,
        enum: {
            type: ["CREDIT", "DEBIT"],
            message: "Type can be either CREDIT or DEBIT",
        },
        required: [true, "Ledger type is required"],
        immutable: true
    }
},{timestamps:true})


function preventLedgerModification(){
    throw new Error("Ledger entries are immutable and cannot be modification or deleted")
}
