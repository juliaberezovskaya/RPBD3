import { Template } from 'meteor/templating';
import { Clients } from '../../api/database.js';
import '../../api/globalHelpers.js'

import './clients.html';

Template.clients.onCreated(function(){      
    this.checkedTableClient = new ReactiveVar()
    this.client = null
  });
  
  Template.param_clients.helpers({
    elem_selected(elem, elem_id){
      return elem == elem_id ? 'selected' : ''
    }
  })

  Template.clients.helpers({
    checked(client_id){
      return Template.instance().checkedTableClient.get() == client_id
    },
  })

Template.clients.events({
    'click .delete'() {
        //console.log(this.elem._id);      
        Clients.remove(this.elem._id);
    },
    'click .one_client'(event,instance){
        event.preventDefault()
        const target = event.target
        if(instance.checkedTableClient.get() == target.id)
          instance.checkedTableClient.set(null)
        else
          instance.checkedTableClient.set(target.id)
        console.log(instance.checkedTableClient.get())
      },
      'submit .info_clients'(event) {
        event.preventDefault();
        const target = event.target;
        const snm = target.snm.value;
        const phone_number = target.phone_number.value;
        Clients.update({_id:Template.instance().checkedTableClient.get()},{$set:{'snm':snm}})
        Clients.update({_id:Template.instance().checkedTableClient.get()},{$set:{'phone_number':phone_number}})
        },
    'submit .my_form'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const snm = target.snm.value;
        const phone_number = target.phone_number.value;
        Clients.insert({
            snm: snm,
            phone_number: phone_number
        });

        // Clear form
        target.snm.value = '';
        target.phone_number.value = '';
    },
});