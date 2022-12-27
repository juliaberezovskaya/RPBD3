import { Template } from 'meteor/templating';
import { Stuff} from '../../api/database.js';
import './stuff.html';

Template.stuff.onCreated(function(){      
  this.checkedTableStuff = new ReactiveVar()
  this.stuff_ = null
});

Template.stuff.helpers({
  checked(car_id){
    return Template.instance().checkedTableStuff.get() == car_id
  },
})

Template.stuff.events({
  'click .delete'() {   
    //console.log(this.elem._id);      
    Stuff.remove(this.elem._id);
  },  
  'click .one_stuff'(event,instance){
    event.preventDefault()
    const target = event.target
    if(instance.checkedTableStuff.get() == target.id)
      instance.checkedTableStuff.set(null)
    else
      instance.checkedTableStuff.set(target.id)
    console.log(instance.checkedTableStuff.get())
  },
  'submit .info_stuff'(event) {
    event.preventDefault();
    const target = event.target;
    const snm = target.snm.value;
    const address = target.address.value;
    const date_of_birth = target.date_of_birth.value;
    const position = target.position.value;
    const salary = target.salary.value;
    Stuff.update({_id:Template.instance().checkedTableStuff.get()},{$set:{'snm':snm}})
    Stuff.update({_id:Template.instance().checkedTableStuff.get()},{$set:{'address':address}})
    Stuff.update({_id:Template.instance().checkedTableStuff.get()},{$set:{'date_of_birth':date_of_birth}})
    Stuff.update({_id:Template.instance().checkedTableStuff.get()},{$set:{'position':position}})
    Stuff.update({_id:Template.instance().checkedTableStuff.get()},{$set:{'salary':salary}})
  },
  'submit .my_form'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const snm = target.snm.value;
    const address = target.address.value;
    const date_of_birth = target.date_of_birth.value;
    const position = target.position.value;
    const salary = target.salary.value;
    // Insert a task into the collection
    Stuff.insert({
      snm: snm,      
      address: address,
      date_of_birth: date_of_birth,
      position: position,
      salary: salary
    });

    // Clear form
    target.snm.value = '';
    target.address.value = '';
    target.date_of_birth.value = '';
    target.position.value = '';
    target.salary.value = '';
  },
});