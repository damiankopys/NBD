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

printjson(db.people2.aggregate([
    {$match: {nationality: "Poland", sex: "Female"}},
    {$unwind: "$credit"},
    {
        $group: {
        _id: "$credit.currency",
        avg_credit: {$avg: "$credit.balance"},
        sum_credit: {$sum: "$credit.balance"}}
    },
    {
        $project: {
        _id: 0, 
        currency: "$_id",
        avg_credit: "$avg_credit",
        sum_of_credit: "$sum_credit"
}}]).toArray())