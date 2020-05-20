
exports.seed = function(knex) {
  // 00-cleanup.js already cleaned out all the tables

 const users = [
  {
    username: "Admin1", 
    password: "Flavortown", 
    department: "Firefighter"
  },
  {
    username: "Admin2", 
    password: "Flavortown", 
    department: "Firefighter"
  },
  {
    username: "User1", 
    password: "Flavortown", 
    department: "Citizen"
  },
  {
    username: "User2", 
    password: "Flavortown", 
    department: "Citizen"
  },
  {
    username: "Salesman1", 
    password: "Flavortown", 
    department: "Trashman"
  },
 ];
   
  return knex('users').insert(users);
};
