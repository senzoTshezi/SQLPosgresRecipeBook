var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cons = require ('consolidate'),
dust = require('dustjs-helpers'),
pg = require('pg'),
app = express();

//connection string 
//var connect = "postgres://postgres:Sa20906657@localhost/recipebookdb";
let Pool = require('pg-pool');
var pool = new Pool({
    database: 'recipebookdb',
    user: 'postgres',
    password: 'Sa20906657',
    port: 5432,
    server:'localhost',
    ssl: false
  });

//Assign Dust Engine to Dust Files 
app.engine('dust', cons.dust);


//set default ext dust
app.set('view engine', '.dust');
app.set('views', __dirname + '/views');

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parse Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Router
//GET ALL 
app.get("/", function(req, res) { 
    console.log("Server > GET ALL '/Recipes' ");
    pool.query('SELECT * FROM recipes', function(err,result){
            if(err){
                return console.error('error running query ', err);
            }
            res.render('index',{recipes: result.rows});
        });
});

//Add 
// app.post("/", function(req,res){
//     console.log("Server > ADD '/Recipe' ");
//     pool.query('INSERT INTO recipes(name,ingredient,directions) VALUES($1, $2, $3)',
//     [req.body.name, req.body.ingredients, req.body.directions]);
//     res.redirect('/');
// });


app.post("/add", function(req,res){
    pool.query('INSERT INTO recipes(name,ingredient,directions) VALUES($1, $2, $3)',
    [req.body.name, req.body.ingredient, req.body.directions]);
   res.redirect('/');
     });

// Server 
app.listen(3000,function(){
    console.log('Server Started On Port 3000');
});


