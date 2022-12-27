import { Template } from 'meteor/templating';
import { Orders } from '../../api/database.js';
import '../../api/globalHelpers.js'

import './orders.html';

Template.orders.onCreated(function(){      
    this.checkedTableOrders = new ReactiveVar()
    this.order = null
  });

  Template.orders.helpers({
    checked(car_id){
      return Template.instance().checkedTableOrders.get() == car_id
    },
  })

Template.orders.events({
    'click .delete'() {
        //console.log(this.elem._id);      
        Orders.remove(this.elem._id);
    },
    'click .one_order'(event,instance){
        event.preventDefault()
        const target = event.target
        if(instance.checkedTableOrders.get() == target.id)
          instance.checkedTableOrders.set(null)
        else
          instance.checkedTableOrders.set(target.id)
        console.log(instance.checkedTableOrders.get())
      },
      'submit .info_orders'(event) {
        event.preventDefault();
        const target = event.target;  
        const date = target.date.value;
        const sub_address = target.sub_address.value;
        const dest_address = target.dest_address.value;
        const exec_date = target.exec_date.value;
        const price = target.price.value;
        const id_driver = target.id_driver.value;
        const id_client = target.id_client.value;
        Cars.update({_id:Template.instance().checkedTableOrders.get()},{$set:{'date':date}})
        Cars.update({_id:Template.instance().checkedTableOrders.get()},{$set:{'price':price}})
        Cars.update({_id:Template.instance().checkedTableOrders.get()},{$set:{'sub_address':sub_address}})
        Cars.update({_id:Template.instance().checkedTableOrders.get()},{$set:{'dest_address':dest_address}})
        Cars.update({_id:Template.instance().checkedTableOrders.get()},{$set:{'exec_date':exec_date}})
        Cars.update({_id:Template.instance().checkedTableOrders.get()},{$set:{'id_driver':id_driver}})
        Cars.update({_id:Template.instance().checkedTableOrders.get()},{$set:{'id_client':id_client}})
      },
    'submit .my_form'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const date = target.date.value;
        const sub_address = target.sub_address.value;
        const dest_address = target.dest_address.value;
        const exec_date = target.exec_date.value;
        const price = target.price.value;
        const id_driver = target.id_driver.value;
        const id_client = target.id_client.value;
        // Insert a task into the collection
        Orders.insert({
            date: date,
            sub_address: sub_address,
            dest_address: dest_address,
            exec_date: exec_date,
            price: price,
            id_driver: id_driver,
            id_client: id_client
        });

        // Clear form
        target.date.value = '';
        target.sub_address.value = '';
        target.dest_address.value = '';
        target.exec_date.value = '';
        target.price.value = '';
        //target.id_driver.value = '';
        //target.id_client.value = '';
    },
});