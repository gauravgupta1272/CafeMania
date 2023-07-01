const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.gkenr3h.mongodb.net/foodDelivery?retryWrites=true&w=majority'
//for connection purpose
const mongoDB = async () => {
    await mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,result)=>{
        if(err) console.log("..."+err);
        else{
            console.log("connected");
            const fetchedData = await mongoose.connection.db.collection("food_items");
            fetchedData.find({}).toArray(async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("foodCategories");
                foodCategory.find({}).toArray(function (err, catData){
                    if(err) console.log(err);
                    else{
                    global.food_items = data;
                    global.foodCategory = catData;
                    }

                })
                
                //console.log(global.food_items);
            })
        }
    })
    }
module.exports = mongoDB;
