
const express = require('express');
const router = express.Router();    
const bcrypt=require('bcrypt');

// const userregister = require('../models/Registration')
const addproducts = require('../models/dashborardschema');
const Registration = require('../models/Registration');

const contacctSchema = require('../models/contactus');
const multer = require('multer');





// router.get('/header',function(req,res){
//     res.render("/footer.ejs");

// })
router.get('/index', function (req, res) {
    res.render("index");
});
router.get('/contactus', function (req, res) {
    res.render("contactus");
});
router.post('/contactus', (req, res) => {
    var contacts = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    };
    var conpost = new contacctSchema(contacts);
    conpost.save()
        .then(() =>
            res.json('register successfully'))
        .catch(err => res.status(400).json('error' + err));
});

router.get("/viewcontactus", async (req, res) => {
    try {
        const contactdata = await contacctSchema.find({});
        res.render("dashboard/viewcontactus", { contactdata: contactdata });
        console.log(contactdata);
    } catch (err) {
        console.log(err);
    }
});
router.get("/deletecon/:id", async (req, res) => {
    try {
        const data = await contacctSchema.findByIdAndRemove(req.params.id);
        return res.redirect('http://localhost:8000/viewcontactus')

    } catch (err) {
        console.log(err);
    }
});


// **********************************login***************************************************


// signup api
router.get('/login', function (req, res) {
    res.render("login");
})
router.post('/login',async(req,res)=>{
    var email = req.body.email,
    password = req.body.password;

    try{
        var user = await Registration.findOne({email:email})
        .exec();

        console.log()
        if(!user){
            res.redirect("/");
        }
        user.comparePassword(password,(error,match)=>{
            if(!match){
                res.redirect("/dashboard");
            }
           })
           req.session.user = user;
        res.redirect("/dashboard");
    } catch (error){
        console.log(error)
    }
})
// ********************************dashboard***************************************************
router.get('/dashboard' ,(req,res)=> {
    if(req.session.user && req.cookies.user_id) {
        res.render('dashboard/indexs')
    }else{
        res.redirect("/index");
    }
});

// *********************************dashborad***************************************************


// *******************cart********************
router.get("/cart", async (req, res) => {
    try {
        const orderitem = await addproducts.find({});
        res.render("cart", { orderitem: orderitem });
        console.log(orderitem);
    } catch (err) {
        console.log(err);
    }
});
// ***********************cart********************
// **********************addpackags***************
router.get('/add-package/:id',function(req,res){
    console.log(req.params.id);
    userInfo.findById(res.params.id, function(err, data){
        if (err){
            console.log(err);
        }else{
            console.log(data);

            res.render('add-package',{data: data});
        }
    });
});

// ******************************signup*******************************************************

router.get('/signup', function (req, res) {
    res.render("signup");
})
router.post('/signup', (req, res) => {
    var register = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        address: req.body.address
    };
    var addpost = new Registration(register);
    addpost.save()
        .then(() =>
            res.json('register successfully'))
        .catch(err => res.status(400).json('error' + err));
});


// router.get('/dashboard', function (req, res) {
//     res.render('dashboard/indexs')
// })
// *****************************************************************
router.get('/dashboard/bttable', function (req, res){
    res.render("dashboard/bttable")
})
// *****************************************************************

router.get('/oders', function (req, res) {
    res.render('dashboard/oders')
})
const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, './upload');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp','image/avif'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, filefilter});

router.post('/oders',upload.single('img'), (req, res) => {
    var addproduct = {
        productname: req.body.productname,
        product: req.body.product,
        price: req.body.price,
        img: req.file.filename
    };
    var regpost = new addproducts(addproduct);
    regpost.save()
        .then(() =>
            res.json('register successfully'))
        .catch(err => res.status(400).json('error' + err));
});


router.get("/oders-item", async (req, res) => {
    try {
        const orderitem = await addproducts.find({});
        res.render("dashboard/oders-item", { orderitem: orderitem });
        console.log(orderitem);
    } catch (err) {
        console.log(err);
    }
});
router.get("/view-resgistration", async function (req, res) {
    const registerdata = await Registration.find({});
    res.render('dashboard/viewresgistration', { registerdata: registerdata });
    console.log(registerdata)
})
// **************************delete or edit**************************
router.get("/delete_2/:id", async (req, res) => {
    try {
        const datas = await addproducts.findByIdAndRemove(req.params.id);
        return res.redirect('http://localhost:8000/oders-item')

    } catch (err) {
        console.log(err);
    }
});

router.get("/delete/:id", async (req, res) => {
    try {
        const data = await Registration.findByIdAndRemove(req.params.id);
        return res.redirect('http://localhost:8000/view-resgistration')

    } catch (err) {
        console.log(err);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const editdata = await Registration.findById(req.params.id);
        res.render('dashboard/edit-resgistration', { editdata: editdata });
        console.log(editdata);
    } catch (err) {
        console.log(err)
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        let editupdate = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            contact: req.body.contact,
            address: req.body.address
        };
        const data = await Registration.findByIdAndUpdate(req.params.id, editupdate);
        // res.render('dashboard/viewcontact',{data:data});
        res.redirect('./view-resgistration');
    } catch (err) {
        console.log(err);
    }
});


router.get('/edit2/:id', async (req, res) => {
    try {
        const edit2data = await addproducts.findById(req.params.id);
        res.render('dashboard/add-product', { edit2data: edit2data });
        console.log(edit2data);
    } catch (err) {
        console.log(err)
    }
});
// **************************delete or edit**************************
// 


// router.post('edit2/:id', async(req, res)=>{
//     const itemId = req.params.id;
//     const updateData = req.body; //data to update with
//     try{
//         const updatedItem = await edit2data.findByIdAndUpdate(itemId, updateData, {new: true});
//         if(!updatedItem){
//             return res.status(404).json({message:'Item not found '});
//         }
//         res.redirect('edit/'+itemid);
//         res.json(updatedItem);
//     }catch(err){
//         res.status(500).json({message: 'server error'})
//     }
// });
// router.get('/oders-item', function (req, res) {
//     res.render('dashboard/oders-item')
// });

// ***************************************

router.get('/packagedetails/:id' , async(req , res) =>{
    try{    
        const orderitem = await addproducts.findById(req.params.id);
        res.render('packagedetails' , {orderitem: orderitem});
        console.log(orderitem);

    }catch(err){
        console.log(err);
    }
});

router.get('/logout', (req,res)=>{
    if(req.session.user && req.cookies.user_id){
        res.clearCookie('user_id');
        res.redirect('/index');
    }else{
        res.redirect('/login');
    }
});


module.exports = router;
