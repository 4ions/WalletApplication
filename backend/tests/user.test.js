'use strict';

const { sequelize } = require('../db/models');
const { User} = require('../db/models');

describe('User Model', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  describe('Create', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'john_doe',
        address: '123 Main St',
        timestamp: Date.now(),
      };
      const user = await User.create(userData);
      //const newUser = await UserModel.create(userData);
      expect(user.username).toEqual(userData.username);
      expect(user.address).toEqual(userData.address);
      
    });
  });

  describe('Update', () => {
    it('should update an existing user', async () => {
      const userData = {
        username: 'jane_doe',
        address: '456 Second St',
        timestamp: Date.now(),
      };
      const user = await User.create(userData);
      const updatedUserData = {
        username: 'jane_smith',
        address: '789 Third St',
        timestamp: Date.now(),
      };
      const updatedUser = await user.update(updatedUserData);
      expect(updatedUser.username).toEqual(updatedUserData.username);
      expect(updatedUser.address).toEqual(updatedUserData.address);
    });
  });

  describe('Delete', () => {
    it('should delete an existing user', async () => {
      const userData = {
        username: 'jim_doe',
        address: '123 Main St',
        timestamp: Date.now(),
      };
      const user = await User.create(userData);
      await user.destroy();
      const deletedUser = await User.findByPk(user.id);
      expect(deletedUser).toEqual(null);
    });
  });
});
