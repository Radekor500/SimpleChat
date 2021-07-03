const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

function removeUser(id) {
  let i = users.findIndex((user) => user.id === id)
  if (i !== -1) {
    users.splice(i,1);

  }
  
}


module.exports = {
    userJoin,
    getCurrentUser,
    users,
    removeUser,
    getRoomUsers
  };