

//////////////////////////
//      PUERTO
//////////////////////////

//  Constantes, variables de forma global

process.env.PORT = process.env.PORT || 3000



//////////////////////////
//      Entorno
//////////////////////////
process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';



//////////////////////////
//      Base de datos
//////////////////////////
let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe';
} else
{
    urlDB = 'mongodb+srv://tsmariano:WqhaqAGyNuvbef2f@cluster0-v025x.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;


