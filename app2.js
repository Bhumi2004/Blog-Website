const express = require('express');
const morgan = require('morgan');
const mongoose =require('mongoose');
const blogRoutes= require('./routes/blogRoutes');
const methodOverride = require('method-override');

const app= express();

//connect to mongodb 
const dbURI = 'mongodb+srv://bhumijain:test123@cluster0.kzxid0j.mongodb.net/node-tutsretryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000); // Start the server after successful connection
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

//register view engine
app.set('view engine','ejs');




//middleware

/*app.use((req,res,next) =>
{
    console.log('new request made');
    console.log('host:',req.hostname);
    console.log('path:',req.path);
    console.log('method:',req.method);
    next();//otherwise it will load and dont know where to go.
});*/

//midlleware & static files
app.use(express.static('public'));//can acess public folder;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'));


//3 party middle ware
app.use(morgan('dev'));


//mongoose and mongo sandbox routes
/*app.get('/add-blog',(req,res) =>
{
   const blog = new Blog({
    title:'new blog',
    snippet:'about my new blog',
    body:'more about my new blog'
   });
   blog.save()
   .then((result)=>{
      res.send(result)
   })
   .catch((err)=>
   {
     console.log(err);
   });
});

app.get('/all-blogs',(req,res) =>
{
    Blog.find()
    .then((result)=>
    {
        res.send(result);
    })
    .catch((err)=>
    {
        console.log(err);
    });
})
 app.get('/single-blog',(req,res)=>
{
    Blog.findById('66af18359a84e16ef0bac8e7')
    .then((result)=>
    {
        res.send(result);
    })
    .catch((err)=>
    {
        console.log(err);
    });
})*/





//routes
app.get('/',(req,res) =>
{
    res.redirect('/blogs');
});

app.get('/about',(req,res) =>
    {
      res.render('aboutb',{title:'About'});
    });


    //blog routes
    app.use(blogRoutes)
    

     //404 page
     app.use((req,res)=>
    {
        res.status(404).render('404b',{title:'404'});
    });   
