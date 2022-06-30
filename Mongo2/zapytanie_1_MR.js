db.people.find().forEach( 
    function (x) {
        x.weight = parseFloat(x.weight), 
        x.height = parseFloat(x.height); 
        db.people2.save(x);
    }
);

var mapFunction = function() {
    emit (
        this.sex, {count: 1, weight: this.weight,  height: this.height}
    );
};

var reduceFunction = function(key, values) {
    reducedValues = {count: 0, weight: 0, height: 0};
    for (var idx = 0; idx < values.length; idx++) {
        reducedValues.count += values[idx].count;
        reducedValues.weight += values[idx].weight;
        reducedValues.height += values[idx].height;
    }
    return reducedValues;
 };

 var finalizeFunction = function(key, reducedValues) {
    reducedValues.averageWeight = reducedValues.weight/reducedValues.count;
    reducedValues.averageHeight = reducedValues.height/reducedValues.count;
    return reducedValues;
  };

printjson(db.people2.mapReduce(mapFunction, reduceFunction, {out: "AverageWeightHeight", finalize: finalizeFunction}));
printjson(db.AverageWeightHeight.find({}, {"value.averageWeight": 1, "value.averageHeight": 1}).toArray());