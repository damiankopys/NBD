var map3 = function() {
    emit (this.job, 1);
};

var reduce3 = function(key, value){
    return key, Array.sum(value);
};

printjson(db.people.mapReduce(
    map3,
    reduce3,
    {out: "jobs"}
));

printjson(db.jobs.find().toArray().map((value) => value._id));