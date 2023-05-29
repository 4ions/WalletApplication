const controller = require('../controllers/userCoins/userCoins.controller');

describe('User Controller', () => {
  describe('getUser', () => {
    it('should return user coins for a valid user ID', async () => {
      const mockUserId = 1;
      const mockUser = { id: mockUserId };
      const mockUserCoins = [
        { id: 1, userId: mockUserId, amount: 0.5, timestamp: new Date() },
        { id: 2, userId: mockUserId, amount: 1.2, timestamp: new Date() },
      ];

      // Mocking the necessary functions
      const User = {
        findByPk: jest.fn().mockResolvedValue(mockUser),
      };
      const UserCoin = {
        findAll: jest.fn().mockResolvedValue(mockUserCoins),
      };

      const req = { params: { userId: mockUserId } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await controller.getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUserCoins);
    });

    it('should return a 400 status if no user ID is provided', async () => {
      const req = { params: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await controller.getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'No se ha enviado el id' });
    });

    it('should return a 404 status if the user is not found', async () => {
      const mockUserId = 1;

      // Mocking the necessary function
      const User = {
        findByPk: jest.fn().mockResolvedValue(null),
      };

      const req = { params: { userId: mockUserId } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await controller.getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No se ha encontrado el usuario' });
    });
  });

  describe('getUserCoins', () => {
    it('should return all user coins', async () => {
      const mockUserCoins = [
        { id: 1, userId: 1, amount: 0.5, timestamp: new Date() },
        { id: 2, userId: 2, amount: 1.2, timestamp: new Date() },
      ];

      // Mocking the necessary function
      const UserCoin = {
        findAll: jest.fn().mockResolvedValue(mockUserCoins),
      };

      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await controller.getUserCoins(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return a 500 status if an error occurs', async () => {
      const errorMessage = 'Error al obtener las monedas del usuario';

      // Mocking the necessary function
      const UserCoin = {
        findAll: jest.fn().mockRejectedValue(new Error(errorMessage)),
      };

      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await controller.getUserCoins(req, res);

      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
