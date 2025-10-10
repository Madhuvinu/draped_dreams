import { defineStore } from 'pinia'

export const usersStore = defineStore('users', {
  state: () => ({
    users: [],
    promise: null,
  }),
  actions: {
    async fetchUsers() {
      if (!this.promise) {
        this.promise = Promise.resolve([
          { name: 'admin', full_name: 'Administrator', email: 'admin@example.com', enabled: 1 },
          { name: 'guest', full_name: 'Guest User', email: 'guest@example.com', enabled: 1 }
        ]).then(response => {
          this.users = response
          return this.users
        })
      }
      return this.promise
    },
    
    getUserById(userId) {
      return this.users.find(user => user.name === userId)
    },
    
    getUserName(userId) {
      const user = this.getUserById(userId)
      return user ? user.full_name || user.name : userId
    }
  }
})
