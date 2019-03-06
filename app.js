const express = require('express');

const app = express();
const ExpressError = require("./expressError")


//mean route
app.get('/mean', function(req, res, next){
    try{
        if (req.query.nums === undefined){
            throw new ExpressError('nums are required!', 400);
        }
        const nums = req.query.nums.split(',');
        function sum(arr){
            let sum = 0;
            for (let num of arr){
                console.log(+num)
                if (isNaN(+num)){ 
                    throw new ExpressError(`${num} is not a number!`, 400);
                }
                sum += +num; //will turn string to number
            }
            return sum;
        }
        const mean = sum(nums)/nums.length;
        return res.send({opertaion: "mean",
                            value: mean})   
    } catch(err){
        return next(err);
    }
})

// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });
  
// generic error handler
app.use(function(err, req, res, next) {
// the default status is 500 Internal Server Error
let status = err.status || 500;

// set the status and alert the user
return res.status(status).json({
    error: {
    message: err.message,
    status: status
    }
});
}); 
// end generic handler
app.listen(3000, function() {
console.log('Server is listening on port 3000');
}); 
