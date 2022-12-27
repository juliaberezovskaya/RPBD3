import { Template } from 'meteor/templating';
import { Cars, CargoType, Condition } from '../../api/database.js';
import '../../api/globalHelpers.js'

import './cars.html';

Template.cars.onCreated(function(){      
    this.checkedTableCars = new ReactiveVar()
    this.car = null
  });
  
//   Template.param_cars.helpers({
  
//     elem_selected(elem, elem_id){
//       return elem == elem_id ? 'selected' : ''
//     }
//   })

  Template.cars.helpers({
    checked(car_id){
      return Template.instance().checkedTableCars.get() == car_id
    },
  })

Template.cars.events({
    'click .delete'() {
        //console.log(this.elem._id);      
        Cars.remove(this.elem._id);
    },
    'click .one_cars'(event,instance){
        event.preventDefault()
        const target = event.target
        if(instance.checkedTableCars.get() == target.id)
          instance.checkedTableCars.set(null)
        else
          instance.checkedTableCars.set(target.id)
        console.log(instance.checkedTableCars.get())
      },
      'submit .info_cars'(event) {
        event.preventDefault();
        const target = event.target;  
        const brand = target.brand.value;
        const number = target.number.value;
        const load_capacity = target.load_capacity.value;
        const id_cargo_type = target.id_cargo_type.value;
        const id_condition = target.id_condition.value;
        Cars.update({_id:Template.instance().checkedTableCars.get()},{$set:{'brand':brand}})
        Cars.update({_id:Template.instance().checkedTableCars.get()},{$set:{'number':number}})
        Cars.update({_id:Template.instance().checkedTableCars.get()},{$set:{'load_capacity':load_capacity}})
        Cars.update({_id:Template.instance().checkedTableCars.get()},{$set:{'id_cargo_type':id_cargo_type}})
        Cars.update({_id:Template.instance().checkedTableCars.get()},{$set:{'id_condition':id_condition}})
      },
    'submit .my_form'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const brand = target.brand.value;
        const number = target.number.value;
        const load_capacity = target.load_capacity.value;
        const id_cargo_type = target.id_cargo_type.value;
        const id_condition = target.id_condition.value;
        // Insert a task into the collection
        Cars.insert({
            brand: brand,
            number: number,
            load_capacity: load_capacity,
            id_cargo_type: id_cargo_type,
            id_condition: id_condition
        });

        // Clear form
        target.brand.value = '';
        target.number.value = '';
        target.load_capacity.value = '';
        //target.id_cargo_type.value = '';
        //target.id_condition.value = '';
    },
});