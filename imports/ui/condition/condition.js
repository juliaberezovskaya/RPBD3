import { Template } from 'meteor/templating';
import { Condition } from '../../api/database.js';
import '../../api/globalHelpers.js'

import './condition.html';

Template.condition.onCreated(function(){
  this.checkedCond = new ReactiveVar()
});

Template.condition.helpers({
  checked(cond_id){
    return Template.instance().checkedCond.get() == cond_id
  }
})

Template.condition.events({
  'click .delete'() {   
    //console.log(this.elem._id);      
    Condition.remove(this.elem._id);
  },
  'click .one_el'(event, instance){
    // instance.checkedCond.set(event.target.id)
    event.preventDefault()
        const target = event.target
        if(instance.checkedCond.get() == target.id)
          instance.checkedCond.set(null)
        else
          instance.checkedCond.set(target.id)
        console.log(instance.checkedCond.get())
  },
  'submit .info_condition'(event) {
    event.preventDefault();
    const target = event.target;
    const condition = target.condition.value;
    Condition.update({_id:Template.instance().checkedCond.get()},{$set:{'condition':condition}})
    },
  'submit .my_form'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const condition = target.condition.value;
    // Insert a task into the collection
    Condition.insert({
      condition: condition
    });

    // Clear form
    target.condition.value = '';
  },
  
});