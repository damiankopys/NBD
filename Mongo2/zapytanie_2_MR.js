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

var map2 = function() {
    for (var idx = 0; idx < this.credit.length; idx++) {
        var key = this.credit[idx].currency;
        var value = this.credit[idx].balance;
        emit(key, value);
     }
};

var reduce2 = function(key, value) {
    return Array.sum(value);
};

printjson(db.people2.mapReduce(map2, reduce2, {out: "sumOfBallance" }));
printjson(db.sumOfBallance.find().toArray());