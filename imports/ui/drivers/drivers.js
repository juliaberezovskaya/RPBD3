import { Template } from 'meteor/templating';
import { Drivers } from '../../api/database.js';
import '../../api/globalHelpers.js'

import './drivers.html';

Template.drivers.onCreated(function(){      
    this.checkedTableDrivers = new ReactiveVar()
    this.car = null
  });
  

  Template.drivers.helpers({
    checked(car_id){
      return Template.instance().checkedTableDrivers.get() == car_id
    },
  })

Template.drivers.events({
    'click .delete'() {
        //console.log(this.elem._id);      
        Drivers.remove(this.elem._id);
    },
    'click .one_driver'(event,instance){
        event.preventDefault()
        const target = event.target
        if(instance.checkedTableDrivers.get() == target.id)
          instance.checkedTableDrivers.set(null)
        else
          instance.checkedTableDrivers.set(target.id)
        console.log(instance.checkedTableDrivers.get())
      },
      'submit .info_drivers'(event) {
        event.preventDefault();
        const target = event.target;
        const category = target.category.value;
        const expirience = target.expirience.value;
        const id_car = target.id_car.value;
        const id_stuff = target.id_stuff.value;
        Drivers.update({_id:Template.instance().checkedTableDrivers.get()},{$set:{'category':category}})
        Drivers.update({_id:Template.instance().checkedTableDrivers.get()},{$set:{'expirience':expirience}})
        Drivers.update({_id:Template.instance().checkedTableDrivers.get()},{$set:{'id_car':id_car}})
        Drivers.update({_id:Template.instance().checkedTableDrivers.get()},{$set:{'id_stuff':id_stuff}})
      },
    'submit .my_form'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const category = target.category.value;
        const expirience = target.expirience.value;
        const id_car = target.id_car.value;
        const id_stuff = target.id_stuff.value;
        // Insert a task into the collection
        Drivers.insert({
            category: category,
            expirience: expirience,
            id_car: id_car,
            id_stuff: id_stuff
        });

        // Clear form
        target.category.value = '';
        target.expirience.value = '';
        //target.id_car.value = '';
        //target.id_stuff.value = '';
    },
});