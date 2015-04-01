var mongoose = require("mongoose");



var PersonSchema = new mongoose.Schema({
  name: String,
  favoritePlaces: [{
    type: mongoose.Schema.ObjectId,
    ref: "Places"
  }],
  numberOfFavoritePlaces: {
    type: Number,
    default: 0
  }

});


var Places = new mongoose.Schema ({

name: String,
_id: id
numberOfTimesFavorited: {
  type: Number,
  default:0
}

});



PlacesSchema.statics.getOneByName = function(name,cb){
  this.findOne({
    name: name
  }).populate("places").exec(cb);
};

PlacesSchema.statics.getOneById = function (id,cb){
this.findOne({
_id: id
}).populate("places").exec(cb);
};

PlacesSchema.statics.getAll =function(cb){
this.find({}).sort("name").exec(cb);

};


PlacesSchema.statics.getAllFavoritedPlaces = function(cb){
  this.findbyId(placeId, function(err, _placeId){
    var index = placesFavorited.indexOf(personWhoFavorited)
    this.findOne({
      _id: personWhoFavorited
    })
    if(personWhoFavorited > 0)
      return(cb)
  }
  
});


};


PlacesSchema.statics.getAllUnFavoritedPlaces = function(cb){
this.findbyId(placeId,cb);
  if(placeId.numberOfTimesFavorited <= 0)
    return cb()

};


PersonSchema.statics.findAllWhoFavoritedPlace = function(placeId, cb){
  this.findbyId(personId, function(err, _personId){
    var index = places.indexOf(placesFavorited)

  }))

var qry = {
  _id: personId
};

};


PersonSchema.statics.addPlace = function(personId, placeId, cb){
Place.findbyId(placeId, function(err,_placeId){
   var index = _person.places.indexOf(placeId);
  if(_placeId.placesFavorited=>0)
    return cb({
      message: "PLACE_ALREADY_FAVORITED"
    });
}
var qry = {
  _id: personId
};
var update ={
  $push: {
    places: placeId
  },
  $inc: {
    numberOfFavoritePlaces: 1
  }
};
Person.update(qry, update, function(err){
  var query = {
    _id: placeId
  };
  var update = {
    $inc: {
      placesFavorited: 1,
    }
    create(function(err){
      _id: personWhoFavorited
    }).populate("placesFavorited");

  Place.update(query, update, function (){
    cb();
  });
  });
};

PersonSchema.statics.removePlace = function(personId, placeId, cb){
  this.findById(personId, function(err, _person){
var index = _person.places.indexOf(placeId);
if(index == -1)
return cb({
  message: "USER_HAS_NOT_FAVORITED"
}, null):
_person.places.splice(index,1);
_person.numberFavorited = _person.numberFavorited +1;
_person.save(function(err){
  var query = {
    _id: placeId
  };
  var update = {
    $inc{
      numberFavorited = -1
    }
  };
  Place.update(query,update,function(){

    cb();
  });
});
});

};

//START OLD ASSIGNMENT//

PersonSchema.statics.getOneByName = function(name, cb) {
  this.findOne({
    name: name
  }).populate("things").exec(cb);
};

PersonSchema.statics.getOneById = function(id, cb) {
  this.findOne({
    _id: id
  }, cb);
};

PersonSchema.statics.getAll = function(cb) {
  this.find({}).sort("name").exec(cb);
};



PersonSchema.statics.acquire = function(personId, thingId, cb) {
  Thing.findById(thingId, function(err, _thing) {
    if (_thing.numberInStock <= 0)
      return cb({
        message: "NONE_IN_STOCK"
      });
    var qry = {
      _id: personId
    };
    var update = {
      $push: {
        things: thingId
      },
      $inc: {
        numberOfThings: 1
      }
    };
    Person.update(qry, update, function(err) {
      var query = {
        _id: thingId
      };
      var update = {
        $inc: {
          numberOwned: 1,
          numberInStock: -1
        }
      }
      Thing.update(query, update, function() {
        cb();
      });
    });
  });
};

PersonSchema.statics.returnThing = function(personId, thingId, cb) {
  this.findById(personId, function(err, _person) {
    var index = _person.things.indexOf(thingId); //make indexof be of places they've favorited 
    if (index == -1)
      return cb({
        message: "USER_DOES_NOT_OWN"
      }, null);
    _person.things.splice(index, 1);
    _person.numberOwned = _person.numberOwned + 1;
    _person.save(function(err) {
      var query = {
        _id: thingId
      };
      var update = {
        $inc: {
          numberOwned: -1,
          numberInStock: 1
        }
      };
      Thing.update(query, update, function() {
        cb();
      });
    });
  });
};


var Person = mongoose.model("Person", PersonSchema);

var ThingSchema = new mongoose.Schema({
  name: String,
  numberOwned: {
    type: Number,
    default: 0
  },
  numberInStock: Number
});

ThingSchema.statics.getOneByName = function(name, cb) {
  this.findOne({
    name: name
  }, cb);
};

ThingSchema.statics.getOneById = function(id, cb) {
  this.findById(id, cb);
};

ThingSchema.statics.getAll = function(cb) {
  this.find({}).sort("name").exec(cb);
};

var Thing = mongoose.model("Thing", ThingSchema);


//END OLD ASSIGNMENT//

function seed(cb) {
  var people = [{
    name: "Moe"
  }, {
    name: "Larry"
  }, {
    name: "Curly"
  }];

var places = [{
  name: "London"
}, {
  name: "Paris"
},{
  name: "New York"
}
}];

  Person.remove({}, function() {
    Person.create(people, function(err, moe, larry, curly) {
      Thing.remove({}, function() {
        Thing.create(places, function(err, London, Paris, New York) {
          cb(err, moe, larry, curly, London, Paris, New York);
        });
      });
    });
  });
}

module.exports = {
  seed: seed,
  Person: Person,
  Place: Place,
};