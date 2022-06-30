db.people.find().forEach( 
    function (x) {
        x.weight = parseFloat(x.weight), 
        x.height = parseFloat(x.height); 
        db.people2.save(x);
    }
);

var bmi = {
    $divide: ["$weight", {$pow: [{$divide:["$height",100]}, 2]}]
}

printjson(db.people2.aggregate([
    {
        $group: {
        _id: "$nationality",
        avg_bmi: {$avg: bmi},
        min_bmi: {$min: bmi},
        max_bmi: {$max: bmi}}
    },
    {
        $project: {
        _id: 0, 
        nationality: "$_id",
        avgBMI: "$avg_bmi",
        minBMI: "$min_bmi",
        maxBMI: "$max_bmi"
    }
}]).toArray())