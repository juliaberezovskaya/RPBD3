import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './table.js'
import './users/user.js'
import './body.html'
import '../api/globalHelpers.js'


// Template.loginButtons.rendered = function()
// {
//     Accounts._loginButtonsSession.set('dropdownVisible', true);
// };

Template.body.helpers({ 
  table_name_list(){
    return ["stuff","cargo_type", "condition", "moving_info", "cars",  "drivers", "clients", "orders"];
  },
  isDashboard(){
    return Template.instance().admin_dashboard.get()
  }
});


Template.body.onCreated(function(){      
  this.cur_table = new ReactiveVar("stuff");
  this.admin_dashboard = new ReactiveVar(false)
});

Template.body.events({  
  'change #table_in_list'(event, instance){
    event.preventDefault();
    const target = event.target;
    const text = target.value;
    instance.cur_table.set(text);
    //console.log(target.value)
  },
  'click #admin_dash'(event,instance){
    event.preventDefault()
    const target = event.target
    instance.admin_dashboard.set(!(instance.admin_dashboard.get()))
  }
});