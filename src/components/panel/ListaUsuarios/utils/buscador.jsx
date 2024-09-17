export function filterUsers(users, searchTerm) {
    return users.filter(user => 
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  