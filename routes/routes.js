const req = require('express/lib/request');
const mongoose = require('mongoose')

mongoose.connect("mongodb://root:nadira333@109.195.67.182:27017/tcointest?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to Mongo!');
})
.catch((err) => {
    console.error('Error connecting to Mongo', err);
});

const userSchema = new mongoose.Schema({
    user_id: Number,
    balance: Number
});

const User = mongoose.model('User', userSchema);

const router = app => {
    app.get('/api', (request, response) => {
        response.send({
            message: 'SmartCoin API active...'
        });
    });

    app.get('/updateUserBalance', async (req, res) => {
        if(!req.query.user_id) {
            return res.status(503).send({message: "Не указан user_id"})
        }
        let user = await User.findOne({user_id: req.query.user_id})
        let user1 = await User.find({user_id: req.query.user_id})
        if(!user) {
            await User.create({
                "user_id": req.query.user_id,
                "balance": 0
            })
        }
        user1.forEach((item) => {
            item.balance += 1;
            item.save()
        })
        return res.send({user})
    })

    app.get('/createUser', async (req, res) => {
        if(!req.query.user_id) {
            return res.status(503).send({message: "Не указан user_id"})
        }
        let user = await User.findOne({user_id: req.query.user_id})
        if(!user) {
            await User.create({
                "user_id": req.query.user_id,
                "balance": 0
            })
            return res.send({user})
        }
        return res.send({user})
    })
}



// Export the router
module.exports = router;