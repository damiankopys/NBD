printjson(db.people.insert(
    {
        "sex" : "Male",
        "first_name" : "Damian",
        "last_name" : "Kopys",
        "job" : "Developer",
        "email" : "damian.kopys@gmail.com",
        "location" : {
            "city" : "Warszawa",
            "address" : {
                "streetname" : "Wynalazek",
                "streetnumber" : "2"
            }
        },
        "description" : "condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque",
        "height" : "177.91",
        "weight" : "67.03",
        "birth_date" : "1997-05-23T18:22:07Z",
        "nationality" : "Poland",
        "credit" : [
            {
                "type" : "jcb",
                "number" : "3529195112892553",
                "currency" : "PLN",
                "balance" : "123.17"
            }
        ]
    }
))
