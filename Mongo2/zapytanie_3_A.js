printjson(db.people.aggregate([
    {
        $group: {
        _id: "$job",
        num_of_jobs: {$sum: 1}}
    },
    {
        $project: {
        "_id": 0, 
        "job_name": "$_id"}
    }
]).toArray()) 