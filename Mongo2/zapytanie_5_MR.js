db.people2.find({
    "credit":{"$exists":true}}).forEach(function(data){
     for(var i=0;i<data.credit.length;i++) {
       db.people2.update(
          { 
              "_id": data._id, 
              "credit.number": data.credit[i].number
          },
          {
              "$set": {
                "credit.$.balance":
                    parseFloat(data.credit[i].balance)
              }
          }
       );
   }
})

var map5 = function() {
    for (var idx = 0; idx < this.credit.length; idx++) {
       var key = this.credit[idx].currency;
       var value = {count: 1, totalBalance: this.credit[idx].balance};
       emit(key, value);
    }
};

var reduce5 = function(key, value) {
    reducedValue = {count: 0, totalBalance: 0};
    for (var idx = 0; idx < value.length; idx++) {
        reducedValue.count += value[idx].count;
        reducedValue.totalBalance += value[idx].totalBalance;
    }
    return reducedValue;
};

var finalize5 = function(key, value) {
    value.averageBalance = value.totalBalance/value.count;
    return value;
};

printjson(db.people2.mapReduce(
    map5, reduce5, 
    {query: {nationality: "Poland", sex: "Female"}, 
    out: "balance", 
    finalize: finalize5}
));

printjson(db.balance.find({}, 
    {"value.totalBalance": 1, "value.averageBalance": 1}
).toArray());