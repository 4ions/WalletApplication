const { UserCoin } = require('../../../db/models');

const updateUserCoin = async (data) => {
    try {
        const { userId, coinId, amount } = data;

        const userCoin = await UserCoin.findOne({
            where: {
                userId: userId,
                coinId: coinId
            }
        });

        if (data.operation === "plus") {
            
            if (!userCoin) {
                const newUserCoin = await UserCoin.create({
                    userId: userId,
                    coinId: coinId,
                    amount: amount
                });
        
                return newUserCoin;
            }
        
            console.log(userCoin.amount, amount)
            const updatedUserCoin = await UserCoin.update({
                amount: userCoin.amount + amount
            }, {
                where: {
                    userId: userId,
                    coinId: coinId
                }
            });
        
            return updatedUserCoin;
        }

        console.log("MINUS")
        const totalAmount = userCoin.amount - amount;
        if (totalAmount < 0) totalAmount = 0;
        console.log(totalAmount)
        const updatedUserCoin = await UserCoin.update({
            amount: totalAmount
        }, {
            where: {
                userId: userId,
                coinId: coinId
            }
        })

        return updatedUserCoin;
    } catch (error) {
        console.log(error);
    }
}

const getUserCoins = async (userId) => {
    const userCoin = await UserCoin.findAll({
        where: {
            userId: userId
        }
    });

    return userCoin;
}

const getUserCoin = async (userId, coinId) => {
    const userCoin = await UserCoin.findOne({
        where: {
            userId: userId,
            coinId: coinId
        }
    });

    return userCoin;
}

module.exports = {
    updateUserCoin,
    getUserCoins,
    getUserCoin
}