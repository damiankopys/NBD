db.people.find().forEach( 
    function (x) {
        x.weight = parseFloat(x.weight), 
        x.height = parseFloat(x.height); 
        db.people2.save(x);
    }
);

var map4  = function() {
    var bmi = (this.weight/Math.pow(this.height/100, 2));
    emit (this.nationality, {sumBMI: bmi, minBMI: bmi, maxBMI: bmi, count: 1});
};

var reduce4 = function(key, values) {
    var a = values[0];
    for (var i=1; i < values.length; i++){
        var b = values[i];
        a.sumBMI += b.sumBMI;
        a.count += b.count;
        a.minBMI = Math.min(a.minBMI, b.minBMI);
        a.maxBMI = Math.max(a.maxBMI, b.maxBMI);
    }
    return a;
};

var finalize4 = function(key, value) {
    value.avgBMI = value.sumBMI/value.count;
    return value;
};

printjson(db.people2.mapReduce(map4, reduce4, {out: "mapBMI", finalize: finalize4}));
printjson(db.mapBMI.find({}, 
    {"value.avgBMI": 1, "value.minBMI": 1, "value.maxBMI": 1}
).toArray());