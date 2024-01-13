var express = require('express');
var router = express.Router();
var Razorpay = require('razorpay')



var instance = new Razorpay({
  key_id: 'rzp_test_XvZ85XPQcRpX01',
  key_secret: '6yiLKQtSbFwf4nCRGZrsKkyZ',
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create/orderId', function(req, res, next) {
  var options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    res.send(order)
  });
});

router.post("/api/payment/verify",(req,res)=>{
  const razorpayOrderId = req.body.response.razorpay_order_id;
  const razorpayPaymentId = req.body.response.razorpay_payment_id;
  const signature = req.body.response.razorpay_signature;
  const secret = "6yiLKQtSbFwf4nCRGZrsKkyZ";
  var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
 const result = validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
 res.send(result);
})
router.get('/success',(req,res)=>{
  res.render('success.ejs');
})

module.exports = router;
