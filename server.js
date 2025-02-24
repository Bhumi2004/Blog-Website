const http =require('http');
const fs= require('fs');
const Lo = require('lodash');

const server = http.createServer((req,res)=>
{

    // lodash
    const num = Lo.random(0,20);
    console.log(num);



    const greet = Lo.once(()  =>
    {
        console.log('hello');
    });
    greet();
    greet();//only  once even if call more than one time
    
//console.log('request made');
console.log(req.url, req.method);

// set header content type

    res.setHeader('content-Type', 'text/html');
 //   res.write('<head><link rel="stylesheet" href="#"></head>');
   // res.write('<p>Hello, Bhumi</p>');
   // res.write('<p>Hello,  again Bhumi</p>');   we are using our index.html page so no need here 
  // res.end();


  let path ='./views/';
  switch(req.url)
  {
    case '/':
        path+= 'index.html';
        res.statusCode=200;
        break;

        case '/about':
            path+= 'about.html';
            res.statusCode=200;
            break;
            case '/about-blah':
                res.statusCode=301;
                res.setHeader('Location','/about');
                res.end();
                break;
                

            default:
                path+='404.html';
                res.statusCode=400;
                break;
  }
  fs.readFile(path,(err,data)=>
{
   if(err)
   {
    console.log(err);
    res.end();

   }
   else{
   // res.write(data);
   // res.end();
   res.end(data);// Direct process                                                                                                                                     


   }
});


});


server.listen(3000,'localhost',()=>
    {
        console.log('listening for request on port 3000');
    }
);
