const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const UserDB = require('./DBs/UserDB');
const AdminDB = require('./DBs/AdminDB');
const ProductDB = require('./DBs/ProductDB');
const TransactionDB = require('./DBs/TransactionDB');
const CartDB = require('./DBs/CartDB');
const OrderDB = require('./DBs/OrderDB');
const FeedbackDB = require('./DBs/FeedbackDB');
const portNumber = require('./config/DBConfig').portNumber;

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/Login', (req, res, next) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/UserDashboard', async (req, res, next) => {
  res.sendFile(__dirname + '/public/profile.html');
});

app.get('/MyCart', (req, res, next) => {
  res.sendFile(__dirname + '/public/cart.html');
});

app.get('/ContactUs', (req, res, next) => {
  res.sendFile(__dirname + '/public/ContactUs.html');
});

app.get('/Products', (req, res, next) => {
  res.sendFile(__dirname + '/public/product.html');
});

app.get('/ProductInfo', (req, res, next) => {
  res.sendFile(__dirname + '/public/productinfo.html');
});

app.get('/MyOrders', (req, res, next) => {
  res.sendFile(__dirname + '/public/orders.html');
});

app.get('/Checkout', (req, res, next) => {
  res.sendFile(__dirname + '/public/checkout.html');
});

app.get('/PaymentPolicy', (req, res, next) => {
  res.sendFile(__dirname + '/public/paypolicy.html');
});

app.get('/PrivacyPolicy', (req, res, next) => {
  res.sendFile(__dirname + '/public/privacy.html');
});

app.get('/AdminLogin', (req, res, next) => {
  res.sendFile(__dirname + '/public/adminLogin.html');
});

app.get('/AdminDashboard', async (req, res, next) => {
  res.sendFile(__dirname + '/public/admin.html');
});

//-----------------------------Admin-----------------------------------------

app.post('/addAdmin', async (req, res, next) => {
  let resultObj = await AdminDB.addAdmin(req.body);

  let responseObj = {};

  if (resultObj.acknowledged) {
    responseObj = { msg: 'Admin user created successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

app.post('/authenticateAdmin', async (req, res, next) => {
  let username = req.body.username;
  // let password = req.body.password;
  let result;

  if (username != undefined && username.includes('@')) {
    result = await AdminDB.authenticateAdmin({ email: username });

  }

  let details = { admin_details: result };
  // if (result != null && result != undefined) {
  //   result = await AdminDB.adminById({
  //     _id: result._id,
  //   });

  if (result != null && result != undefined) {

    // details['account_details'] = result;
    details['msg'] = 'success';
  } else {
    details['msg'] = 'fail';
  }
  // }
  res.send(details);
});

app.get('/allUsers', async (req, res, next) => {
  res.send(await UserDB.getAllUsers());
});

//-------------------------------User---------------------------------------

app.get('/UserDetails', async (req, res, next) => {
  let uid = req.query.uid;
  let result = await UserDB.userById({ uid: uid });

  let details = { user_details: result };

  if (result != null && result != undefined) {
    details['msg'] = 'success';
  } else {
    details['msg'] = 'fail';
  }
  res.send(details);
  console.log(details);
});

app.post('/authenticateUser', async (req, res, next) => {
  let username = req.body.username;
  let result;

  if (username != undefined && username.includes('@')) {
    result = await UserDB.authenticateUser({ email: username });
  }

  let details = { user_details: result };

  if (result != null && result != undefined) {
    details['msg'] = 'success';
  } else {
    details['msg'] = 'fail';
  }
  res.send(details);
  console.log(details);
});

app.post('/addUser', async (req, res, next) => {
  let resultObj = await UserDB.addUser(req.body);

  let responseObj = {};

  if (resultObj.acknowledged) {
    responseObj = { msg: 'Customer created successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

app.post('/updateUser', async (req, res, next) => {
  console.log(req.body);
  let resultObj = await UserDB.updateUser(req.body);

  let responseObj = {};
  if (resultObj.acknowledged) {
    responseObj = { msg: 'User updated successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

app.post('/deleteUser', async (req, res, next) => {
  let resultObj = await UserDB.deleteUser(req.body);

  let responseObj = {};
  if (resultObj.acknowledged) {
    responseObj = { msg: 'User deleted successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

app.get('/allUsers', async (req, res, next) => {
  res.send(await UserDB.getAllUsers());
});

//---------------------------Products-------------------------------------------

app.get('/allProducts', async (req, res, next) => {
  res.send(await ProductDB.getAllProducts());
});

app.get('/allProductsData', async (req, res, next) => {

  let prodArr = [];
  try {
    let prodData = await ProductDB.getAllProducts();
    // prodData.map((d) => {
    //   let tempData = []
    //   tempData.push(d.pname);
    //   tempData.push(d.img);
    //   tempData.push(d._id);
    //   tempData.push(d.price);
    //   tempData.push("");
    //   prodArr.push(tempData);
    // });
    console.log(prodData);
    res.send({ "data": prodData });
  } catch (error) {
    console.log("allPrdouctData", error);
    res.send({ "msg": "error" });

  }
});

app.post('/addProduct', async (req, res, next) => {
  let resultObj = await ProductDB.addProduct(req.body);

  let responseObj = {};

  if (resultObj.acknowledged) {
    responseObj = { msg: 'Product created successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

app.post('/ProductDetails', async (req, res, next) => {
  let pid = req.body.pid;
  let result;

  if (pid != undefined && pid != null) {
    result = await ProductDB.productById({ pid: pid });
  }

  let details = { product_details: result };

  res.send(details);
});

app.post('/updateProduct', async (req, res, next) => {
  let resultObj = await ProductDB.updateProduct(req.body);

  let responseObj = {};
  if (resultObj.acknowledged) {
    responseObj = { msg: 'Product updated successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

app.delete('/deleteProduct', async (req, res, next) => {
  let resultObj = await ProductDB.deleteProduct(req.body);

  let responseObj = {};
  if (resultObj.acknowledged) {
    responseObj = { msg: 'Product delete successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

//--------------------------Cart-----------------------------------------

app.post('/addToCart', async (req, res, next) => {
  let resultObj = await CartDB.addToCart(req.body);

  let responseObj = {};

  if (resultObj.acknowledged) {
    responseObj = { msg: 'Item added successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

//check
app.get('/userCart', async (req, res, next) => {
  let uid = req.query.uid;
  let result = await CartDB.cartsByUid({ uid: uid });
  let details = result;

  console.log(details);
  res.send(details);
});

//check
app.get('/cartDetails', async (req, res, next) => {
  let cid = req.query.cid;
  console.log(cid);
  let result = await CartDB.cartById({ cid: cid });

  res.send(result);
});

app.post('/updateCart', async (req, res, next) => {
  let resultObj = await CartDB.updateCart(req.body);

  let responseObj = {};
  if (resultObj.acknowledged) {
    responseObj = { msg: 'Item updated successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

app.post('/deleteCart', async (req, res, next) => {
  let resultObj = await CartDB.deleteCartItem(req.body);

  let responseObj = {};
  if (resultObj.acknowledged) {
    responseObj = { msg: 'Item removed successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

// -------------------------Orders---------------------------------------

app.post('/addOrder', async (req, res, next) => {
  let resultObj = await OrderDB.addOrder(req.body);

  let responseObj = {};

  if (resultObj.acknowledged) {
    responseObj = { msg: 'Order added successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

app.get('/allOrders', async (req, res, next) => {
  res.send(await OrderDB.getAllOrders());
});

//check
app.get('/orderDetails', async (req, res, next) => {
  let uid = req.query.uid;
  let result = await OrderDB.ordersByUid({ uid: uid });
  let details = { list: result };
  if (result != null && result != undefined) {
    details['msg'] = 'success';
  } else {
    details['msg'] = 'fail';
  }
  res.send(details);
});

app.get('/latestOrders', async (req, res, next) => {
  let uid = req.query.uid;
  console.log(uid);
  let result = await OrderDB.latestOrders(uid);
  res.send(result);
})

//get checked
app.get('/userOrders', async (req, res, next) => {
  let uid = req.query.uid;
  let result = await OrderDB.ordersByUid({ uid: uid });
  res.send(result);
});

//---------------------------Feedback------------------------------------

app.post('/addFeedback', async (req, res, next) => {
  let resultObj = await FeedbackDB.addFeedback(req.body);
  let responseObj = {};

  if (resultObj.acknowledged) {
    responseObj = { msg: 'Feedback sent successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

app.get('/allFeedbacks', async (req, res, next) => {
  res.send(await FeedbackDB.getAllFeedbacks());
});

//---------------------------Transaction---------------------------------

app.get('/allTransactions', async (req, res, next) => {
  res.send(await TransactionDB.getAllTransactions());
});

app.post('/addTransaction', async (req, res, next) => {
  let resultObj = await TransactionDB.addTransaction(req.body);

  let responseObj = {};

  if (resultObj.acknowledged) {
    responseObj = { msg: 'Transaction added successfuly', status: 200 };
  } else {
    responseObj = {
      msg: 'Something went wrong, for more details, check server log',
      status: 500,
    };
  }
  res.send(responseObj);
});

//check
app.get('/userTransactions', async (req, res, next) => {
  let uid = req.query.uid;
  let result = await TransactionDB.transactionsByUid({ uid: uid });
  let details = { _details: result };
  if (result != null && result != undefined) {
    details['Transactions'] = result;
    // console.log('Transactions -----',result);
    details['msg'] = 'success';
  }
  res.send(details);
});

//-----------------------------------------------------------------------

app.listen(portNumber, () => {
  console.log('Power Shoes server started on 3000');
});