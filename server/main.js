import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';
import '../imports/api/database.js';


Accounts.onCreateUser(function (options, user) {
  Roles.addUsersToRoles(user, 'user',null)
  return user
})

// Roles.createRole('user')

Meteor.methods({
  'removeUser': function({user}) {
    console.log(user)      
    Meteor.users.remove(user._id)    
    var role = Meteor.roleAssignment.findOne({'user._id':this.user._id})
    Meteor.roleAssignment.remove(role._id)
  }
})

