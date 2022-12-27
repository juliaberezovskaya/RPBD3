import { Mongo } from 'meteor/mongo';
 
export const Stuff = new Mongo.Collection('stuff');
export const CargoType = new Mongo.Collection('cargo_type');
export const Condition = new Mongo.Collection('condition');
export const MovingInfo = new Mongo.Collection('moving_info');
export const Cars = new Mongo.Collection('cars');
export const Drivers = new Mongo.Collection('drivers');
export const Clients = new Mongo.Collection('clients');
export const Orders = new Mongo.Collection('orders');