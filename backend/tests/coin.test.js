'use strict';
const { sequelize } = require('../db/models');
const { Coin } = require('../db/models'); // Assuming the model file is located in ./models folder
const controller = require('../controllers/coin/coin.controller');

describe("Coin Controller Tests", () => {
    describe("getCoin", () => {
      it("should return error 400 when id is not provided", async () => {
        const req = { params: {} };
        const res = {
          status: jest.fn().mockReturnValue({ json: jest.fn() }),
        };
        
        await controller.getCoin(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
      });
  
      it("should return status 404 when coin is not found", async () => {
        const req = { params: { id: 1 } };
        const res = {
          status: jest.fn().mockReturnValue({ json: jest.fn() }),
        };
  
        Coin.findByPk = jest.fn().mockReturnValue(null);
  
        await controller.getCoin(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
      });
  
      it("should return a coin when given a valid id", async () => {
        const req = { params: { id: 1 } };
        const res = {
          status: jest.fn().mockReturnValue({ json: jest.fn() }),
        };
  
        Coin.findByPk = jest.fn().mockReturnValue({name: 'Bitcoin', symbol: 'BTC', price: 50000});
  
        await controller.getCoin(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status().json).toHaveBeenCalledWith({name: 'Bitcoin', symbol: 'BTC', price: 50000});
      });
    });
  
    describe("getCoins", () => {
  
      it("should return all coins when there are coins", async () => {
        const req = {};
        const res = {
          status: jest.fn().mockReturnValue({ json: jest.fn() }),
        };
  
        Coin.findAll = jest.fn().mockReturnValue([{name: 'Bitcoin', symbol: 'BTC', price: 50000}, {name: 'Ethereum', symbol: 'ETH', price: 1500}]);
  
        await controller.getCoins(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status().json).toHaveBeenCalledWith([{name: 'Bitcoin', symbol: 'BTC', price: 50000}, {name: 'Ethereum', symbol: 'ETH', price: 1500}]);
      });
    });
  
    describe("createCoin", () => {
      it("should return error 400 when name, symbol or price is not provided", async () => {
        const req = { body: {} };
        const res = {
          status: jest.fn().mockReturnValue({ json: jest.fn() }),
        };
  
        await controller.createCoin(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
      });
  
      it("should return status 500 when coin cannot be created", async () => {
        const req = { body: { name: 'Bitcoin', symbol: 'BTC', price: 50000 } };
        const res = {
          status: jest.fn().mockReturnValue({ json: jest.fn() }),
        };
  
        Coin.create = jest.fn().mockReturnValue(null);
  
        await controller.createCoin(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
      });
  
      it("should create coin when all required parameters are given", async () => {
        const req = { body: { name: 'Bitcoin', symbol: 'BTC', price: 50000 } };
        const res = {
          status: jest.fn().mockReturnValue({ json: jest.fn() }),
        };
    
        Coin.create = jest.fn().mockReturnValue({name: 'Bitcoin', symbol: 'BTC', price: 50000});
    
        await controller.createCoin(req, res);
    
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.status().json).toHaveBeenCalledWith({name: 'Bitcoin', symbol: 'BTC', price: 50000});
    });

});

    describe("updateCoin", () => { it("should return error 400 when id is not provided", async () => 
    { 
        const req = { params: {} }; 
        const res = {
            status: jest.fn().mockReturnValue({ json: jest.fn() }), 
        };

        await controller.updateCoin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        });

        it("should return status 404 when coin is not found", async () => {
            const req = { params: { id: 1 }, body: {} };
            const res = {
            status: jest.fn().mockReturnValue({ json: jest.fn() }),
            };

            Coin.findByPk = jest.fn().mockReturnValue(null);

            await controller.updateCoin(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("should update coin with new values", async () => {
            const req = { params: { id: 1 }, body: { name: 'Bitcoin', symbol: 'BTC', price: 60000 } };
            const res = {
            status: jest.fn().mockReturnValue({ json: jest.fn() }),
            };

            Coin.findByPk = jest.fn().mockReturnValue({name: 'Bitcoin', symbol: 'BTC', price: 50000});
            Coin.update = jest.fn().mockReturnValue({name: 'Bitcoin', symbol: 'BTC', price: 60000});

            await controller.updateCoin(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe("deleteCoin", () => { it("should return error 400 when id is not provided", async () => { const req = { params: {} }; const res = { status: jest.fn().mockReturnValue({ json: jest.fn() }), };
    await controller.deleteCoin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return status 404 when coin is not found", async () => {
    const req = { params: { id: 1 } };
    const res = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    Coin.findByPk = jest.fn().mockReturnValue(null);

    await controller.deleteCoin(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should delete coin when given a valid id", async () => {
    const req = { params: { id: 1 } };
    const res = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    Coin.findByPk = jest.fn().mockReturnValue({name: 'Bitcoin', symbol: 'BTC', price: 50000});
    Coin.destroy = jest.fn();

    await controller.deleteCoin(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    });
    }); 
});


