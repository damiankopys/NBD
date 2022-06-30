printjson(db.people.aggregate([
    {$group: {
        _id: "$sex",
        average_weight: {$avg: {$toDecimal:"$weight"}},
        average_height: {$avg: {$toDecimal:"$weight"}}
    }
},
{$project: {
    _id: 0, 
    sex: "$_id", 
    average_weight: "$average_weight", 
    average_weight: "$average_height"}
}]).toArray())