import { Template } from 'meteor/templating';
import { Stuff, CargoType, Condition, MovingInfo, Cars, Drivers, Clients, Orders } from './database.js';

//Спросить/посмотреть где и для чего используются, чтоб посмотреть какие нужно определять, а какие нет

var faculty;

Template.registerHelper('stuff_name',function(elem){
  
  var name = Stuff.findOne({_id: elem}); 
  return name["name"];
})

Template.registerHelper('cargo_type_name',function(elem){
  
  var name = CargoType.findOne({_id: elem}); 

  return name["cargo"];
})

Template.registerHelper('condition_name',function(elem){
  
  var name = Condition.findOne({_id: elem}); 

  return name["condition"];
})

Template.registerHelper('stuff_name',function(elem){
  
  var name = Stuff.findOne({_id: elem}); 

  return name["snm"];
})

Template.registerHelper('cars_name',function(elem){
  
  var name = Cars.findOne({_id: elem}); 

  return name["brand"];
})

Template.registerHelper('driver_name',function(elem){
  
  var named = Drivers.findOne({_id: elem}); 
  var name = Stuff.findOne({_id: named["id_stuff"]});
  return name["snm"];
})

Template.registerHelper('client_name',function(elem){
  
  var name = Clients.findOne({_id: elem}); 

  return name["snm"];
})

// Template.registerHelper('moving_info_name',function(elem){
  
//   var entrant = MovingInfo.findOne({_id: elem}); 

//   return entrant["name"] + " " + entrant["surname"];
// })

// Template.registerHelper('cars_name',function(elem){
  
//   var entrant = Cars.findOne({_id: elem}); 
  
//   return entrant["name"] + " " + entrant["surname"];
// })

// Template.registerHelper('drivers_name',function(elem){
  
//   var entrant = Drivers.findOne({_id: elem}); 
 
//   return entrant["name"] + " " + entrant["surname"];
// })



// Template.registerHelper('formatDate', function(date) {
//   return moment(date).format('DD.MM.YYYY');
// });

 Template.registerHelper('cars',function(elem){   
   return Cars.find({});
 })

 Template.registerHelper('cargo_type',function(elem){   
  return CargoType.find({});
})

Template.registerHelper('clients',function(elem){   
  return Clients.find({});
})

Template.registerHelper('condition',function(elem){   
  return Condition.find({});
})

Template.registerHelper('drivers',function(elem){   
  return Drivers.find({});
})

Template.registerHelper('moving_info',function(elem){   
  return MovingInfo.find({});
})

Template.registerHelper('orders',function(elem){   
  return Orders.find({});
})

Template.registerHelper('stuff',function(elem){   
  return Stuff.find({});
})

// Template.registerHelper('specializations',function(elem){   
//   return Specializations.find({});
// })

// Template.registerHelper('entrants',function(elem){   
//   return Entrants.find({});
// })

// Template.registerHelper('institutions',function(elem){   
//   return Institutions.find({});
// })

// Template.registerHelper('subjects',function(elem){   
//   return Subjects.find({});
// })

// Template.registerHelper('parents',function(elem){   
//   return Parents.find({});
// })


// Template.registerHelper('grad_docs',function(elem){   
//   return Grad_docs.find({});
// })

// Template.registerHelper('enter_exams_results',function(elem){   
//   return Enter_exams_results.find({});
// })