import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { Template } from 'meteor/templating';
import './users.html'



Template.users_.onCreated(function () {
  this.checkedUser = new ReactiveVar()
  this.user = null
});

Template.user_param.helpers({
  get_role(user_id) {
    console.log(user_id)
    var role
    role = Meteor.roleAssignment.findOne({ 'user._id': user_id })
    console.log(role["role"])
    return role["role"]['_id']
  },
})

Template.users_.helpers({
  users_list() {
    //console.log(Meteor.users.find({}))
    return Meteor.users.find({})
  },
  checked(user_id) {
    return Template.instance().checkedUser.get() == user_id
  }
})

Template.one_user.helpers({
  not_cur_user(user_id) {
    console.log(Meteor.userId())
    return Meteor.userId() != user_id
  }
})

Template.users_.events({
  'click .delete'() {
    Meteor.call('removeUser', { user: this.user })
  },
  'click .one_user'(event, instance) {
    event.preventDefault()
    const target = event.target
    if (instance.checkedUser.get() == target.id)
      instance.checkedUser.set(null)
    else
      instance.checkedUser.set(target.id)
    //console.log(instance.checkedUser.get())
  },
  'submit .user_info'(event, instance) {
    event.preventDefault()
    const target = event.target
    const new_role = target.role.value
    console.log(new_role)
    //console.log(Meteor.roleAssignment.findOne({_id:"admin"}))

    var role = Meteor.roleAssignment.findOne({ 'user._id': instance.checkedUser.get() })
    Meteor.roleAssignment.update({ _id: role._id }, { $set: { 'role._id': new_role } })
    Meteor.roleAssignment.update({ _id: role._id }, { $set: { 'inheritedRoles.0._id': new_role } })
  }
});