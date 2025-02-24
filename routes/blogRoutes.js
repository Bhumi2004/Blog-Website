const express= require('express');
const Blog= require('../model/blog');


const router= express.Router();

router.get('/blogs',(req,res)=>
    {
        Blog.find().sort({createdAt:-1})
        .then((result)=>
        {
            res.render('indexb',{title:'All Blogs',blogs:result})
        })
        .catch((err)=>
        {
            console.log(err);
        })
    });

    router.post('/blogs',(req,res)=>
    {
         const blog =new Blog(req.body);
         blog.save()
         .then((result)=>
         {
            res.redirect('/blogs');
         })
         .catch((err)=>
        {
            console.log(err);
        })
    })

    router.get('/blogs/create',(req,res) =>
        {
            res.render('create',{title:'Create a new blog'});
        })

        
    router.get('/blogs/:id',(req,res)=>
    {
        const id= req.params.id;
        console.log(id);
        Blog.findById(id)
      
        .then(result=>
        {
            res.render('details',{blog:result,title:'Blog Details'})
        })
        .catch(err=>
        {
            console.log(err);
        });
    });

   

    router.delete('/blogs/:id', (req, res) => {
        const id = req.params.id;
        
        Blog.findByIdAndDelete(id)
          .then(result => {
            res.json({ redirect: '/blogs' });
          })
          .catch(err => {
            console.log(err);
          });
      });
      

    // Route to render the edit form
router.get('/blogs/:id/edit', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('edit', { blog: result, title: 'Edit Blog' });
        })
        .catch(err => {
            console.log(err);
        });
});



router.put('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body)
        .then(result => {
            res.redirect(`/blogs/${id}`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error updating the blog');
        });
});





  

   router.get('/blogs/create',(req,res) =>
{
    res.render('create',{title:'Create a new blog'});
})

module.exports= router;
