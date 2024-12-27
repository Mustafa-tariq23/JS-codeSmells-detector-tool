function getUserData(userId, callback) {
  fetch(`https://api.example.com/user/${userId}`, (userErr, userData) => {
      if (userErr) {
          callback(userErr, null);
          return;
      }
      fetch(`https://api.example.com/user/${userId}/posts`, (postsErr, postsData) => {
          if (postsErr) {
              callback(postsErr, null);
              return;
          }
          fetch(`https://api.example.com/user/${userId}/friends`, (friendsErr, friendsData) => {
              if (friendsErr) {
                  callback(friendsErr, null);
                  return;
              }
              callback(null, { userData, postsData, friendsData });
          });
      });
  });
}
