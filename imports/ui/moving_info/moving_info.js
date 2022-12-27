import { Template } from 'meteor/templating';
import { MovingInfo} from '../../api/database.js';
import '../../api/globalHelpers.js'

import './moving_info.html';

Template.moving_info.onCreated(function(){      
  this.checkedTableMovingInfo = new ReactiveVar()
  this.moving_info_ = null
});

Template.moving_info.helpers({
  checked(car_id){
    return Template.instance().checkedTableMovingInfo.get() == car_id
  },
})

Template.moving_info.events({
  'click .delete'() {   
    //console.log(this.elem._id);      
    MovingInfo.remove(this.elem._id);
  },  
  'click .one_moving_info'(event,instance){
    event.preventDefault()
    const target = event.target
    if(instance.checkedTableMovingInfo.get() == target.id)
      instance.checkedTableMovingInfo.set(null)
    else
      instance.checkedTableMovingInfo.set(target.id)
    console.log(instance.checkedTableMovingInfo.get())
  },
  'submit .info_moving_info'(event) {
    event.preventDefault();
    const target = event.target;  
    const position = target.position.value;
    const reasons_for_transfer = target.reasons_for_transfer.value;
    const order_number = target.order_number.value;
    const order_date = target.order_date.value;
    const id_stuff = target.id_stuff.value;
    MovingInfo.update({_id:Template.instance().checkedTableMovingInfo.get()},{$set:{'position':position}})
    MovingInfo.update({_id:Template.instance().checkedTableMovingInfo.get()},{$set:{'reasons_for_transfer':reasons_for_transfer}})
    MovingInfo.update({_id:Template.instance().checkedTableMovingInfo.get()},{$set:{'order_number':order_number}})
    MovingInfo.update({_id:Template.instance().checkedTableMovingInfo.get()},{$set:{'order_date':order_date}})
    MovingInfo.update({_id:Template.instance().checkedTableMovingInfo.get()},{$set:{'id_stuff':id_stuff}})
  },
  'submit .my_form'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const position = target.position.value;
    const reasons_for_transfer = target.reasons_for_transfer.value;
    const order_number = target.order_number.value;
    const order_date = target.order_date.value;
    const id_stuff = target.id_stuff.value;
    // Insert a task into the collection
    MovingInfo.insert({
        position: position,      
        reasons_for_transfer: reasons_for_transfer,
        order_number: order_number,
        order_date: order_date,
        id_stuff: id_stuff
    });

    // Clear form
    target.position.value = '';
    target.reasons_for_transfer.value = '';
    target.date_of_birth.value = '';
    target.order_number.value = '';
    target.order_date.value = '';
  },
});