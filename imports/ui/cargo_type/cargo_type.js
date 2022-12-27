import { Template } from 'meteor/templating';
import { CargoType } from '../../api/database.js';
import '../../api/globalHelpers.js'

import './cargo_type.html';

Template.cargo_type.onCreated(function(){      
  this.checkedTable = new ReactiveVar()
  this.cargo = null
});

Template.cargo_type.helpers({
  checked(spec_id){
    return Template.instance().checkedTable.get() == spec_id
  },
})

Template.cargo_type.events({
  'click .delete'() {   
    //console.log(this.elem._id);      
    CargoType.remove(this.elem._id);
  },
  'click .one'(event,instance){
    event.preventDefault()
    const target = event.target
    if(instance.checkedTable.get() == target.id)
      instance.checkedTable.set(null)
    else
      instance.checkedTable.set(target.id)
    //console.log(instance.checkedParent.get())
  },
  'submit .info'(event) {
    event.preventDefault();
    const target = event.target;  
    const cargo = target.cargo.value;
    CargoType.update({_id:Template.instance().checkedTable.get()},{$set:{'cargo':cargo}})
  },
  'submit .my_form'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const cargo = target.cargo.value;
    //console.log(name);
    // Insert a task into the collection
    CargoType.insert({
      cargo
    });

    // Clear form
    target.text.value = '';
  },
  
});