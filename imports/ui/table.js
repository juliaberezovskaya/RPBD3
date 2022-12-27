import { Template } from 'meteor/templating';
import '../api/globalHelpers.js'

 
import './table.html';
import './cargo_type/cargo_type.js';
import './cars/cars.js';
import './clients/clients.js';
import './condition/condition.js';
import './drivers/drivers.js';
import './moving_info/moving_info.js';
import './orders/orders.js';
import './stuff/stuff.js';

Template.table.onCreated(function(){
  const instance = this;
  console.log(this.view.parentView.parentView);
  instance.cur_table = this.view.parentView.parentView.parentView.templateInstance().cur_table;
  
});

 


Template.table.helpers({  
  check_cur_table(table){
    //console.log(table);
    //console.log(Template.instance().cur_table.get());
    return table == Template.instance().cur_table.get();
  }
})