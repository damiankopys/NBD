printjson(db.people.aggregate([
    {$unwind: "$credit"},
    {
        $group: {
        _id: "$credit.currency",
        sum_of_ballance: {$sum: {$toDecimal:"$credit.balance"}}}
    },
    {
        $project: {
        "_id": 0, 
        "currency": "$_id", 
        "sum_of_ballance": "$sum_of_ballance"}
    }
]).toArray())