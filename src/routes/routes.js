/* 
    Nombre: routes
    Descripción: métodos de consulta y seteo
    Autor: Lany Rojas
    Empresa: Invertir en bolsa

 */

const express = require ('express');
const router = express.Router();
const mysqlConnection = require ('../database');


// Consulta para obtener todos los clientes
 router.get('/client', (req, res) =>{
    mysqlConnection.query('select * from Client', (err, rows, fields) =>{
        if(!err){
            console.log("GET_/client");
            res.json({rows});
         }else{
            res.status(400).json("Error al obtener clientes");
            console.log('err');
         }


    });
}); 


// Se  suscribe clientes 
  router.post('/addclient', (req, res) => {
    const {id_client,client_code, client_name, client_email} = req.body;
    console.log(id_client,client_code, client_name, client_email);
    const query = `
      CALL ClientAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_client,client_code, client_name, client_email ], (err, rows, fields) => {
      if(!err) {
        res.status(200).json({status: 'Cliente  Guardado'});
      } else {
        res.status(401).json({status: 'No  se puedo suscribir el cliente', err});
        console.log(err);
      }
    });
  
  }); 


  // Actualización de cliente por ID
  router.put('/updateclient/:id_client', (req, res) => {
    const { client_code, client_name, client_email } = req.body;
    const { id_client } = req.params;

    console.log(id_client,client_code, client_name, client_email);
    const query = `

    CALL ClientAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_client, client_code, client_name, client_email], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Cliente Actualizado'});
      } else {
        res.status(402).json({status: 'No  se puedo modificar el cliente', err});
        console.log(err);
      }
    });
  });


  // Consulta para obtener todos los supermercados
  router.get('/market', (req, res) =>{
  
    mysqlConnection.query('select * from Market', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
         }else{
            res.status(401).json("Error al obtener supermercados");
            console.log('err');
         }
    });
  });

  // Consulta para obtener todos los supermercados por nombre de supermercado
  router.get('/marketbyname', (req, res) =>{
    const market_name = req.query.market_name;

    mysqlConnection.query('select * from Market WHERE market_name = ?', [market_name], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
         }else{
             res.status(401).json("Error al obtener supermercados");
            console.log('err');
         }
    });
  });

  // Consulta para obtener todos los supermercados por código de supermercado
  router.get('/marketbycode', (req, res) =>{
    const market_code = req.query.market_code;

    mysqlConnection.query('select * from Market WHERE market_code = ?', [market_code], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            res.status(401).json("Error al obtener supermercados");
            console.log('err');
        }
    });
  });

  // Consulta para ontener id de supermercado  por id de cliente. 
  router.get('/idmarketbyclient/:id_client', (req, res) =>{
  
    mysqlConnection.query('select * from Client_Market  WHERE id_client = ?', [id_client], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
          
            res.status(401).json("Error al obtener supermercado");
            console.log('err');
        }
    });
  });

  // Agregar supermercado
  router.post('/addmarket', (req, res) => {
    const {id_market,market_code, market_name, market_email} = req.body;
    console.log(id_market,market_code, market_name, market_email);
    const query = `
      CALL MarketAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_market,market_code, market_name, market_email ], (err, rows, fields) => {
      if(!err) {
        res.status(200).json({status: 'Supermercado  Guardado'});
      } else {
        res.status(401).json({status: 'No  se puedo suscribir el supermercado', err});
        console.log(err);
      }
    });
  
  }); 

  // Consultar producto por id 
  router.get('/productbyid/:id_product', (req, res) => {
    const { id_product } = req.params; 
    mysqlConnection.query('SELECT * FROM Product WHERE id_product = ?', [id_product], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(400).json("Error al obtener producto");
        console.log(err);
      }
    });
  });

  // Consultar para obtener todos los datos de producto por id de categoria
  router.get('/productbycategory/:id_category', (req, res) => {
    const { id_category } = req.params; 
    
    mysqlConnection.query('SELECT * FROM Product WHERE id_category = ?', [id_category], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(403).json("Error al obtener producto");
        console.log(err);
      }
    });
  });

  //Agregar producto
   router.post('/addproduct', (req, res) => {
    const {id_product,product_code, product_name, buy_price, public_sell_price, mayor_sell_price, id_category,  id_market} = req.body;
    console.log(id_product,product_code, product_name, buy_price, public_sell_price, mayor_sell_price, id_category,  id_market);
    const query = `
      CALL ProductAddOrEdit(?, ?, ?, ?, ?, ?,?,?);
    `;
    mysqlConnection.query(query, [id_product,product_code, product_name, buy_price, public_sell_price, mayor_sell_price, id_category,  id_market ], (err, rows, fields) => {
      if(!err) {
        res.status(200).json({status: 'Producto Guardado'});
      } else {
        res.status(401).json({status: 'No  se pudo crear producto', err});
        console.log(err);
      }
    });
  
  }); 

  // Actualizar producto
  router.put('/updateproduct/:id_product', (req, res) => {
    const { product_code, product_name, buy_price, public_sell_price, mayor_sell_price, id_category,  id_market } = req.body;
    const { id_product } = req.params;

    console.log(id_product,product_code, product_name, buy_price, public_sell_price, mayor_sell_price, id_category,  id_market);
    const query = `

    CALL ProductAddOrEdit(?, ?, ?, ?, ?, ?,?,?);
    `;
    mysqlConnection.query(query, [id_product, product_code, product_name, buy_price, public_sell_price, mayor_sell_price, id_category, id_market ], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Producto Actualizado'});
      } else {
        res.status(402).json({status: 'No  se puedo modificar el producto', err});
        console.log(err);
      }
    });
  });

  // Consulta para obtener datos de categoria por nombre de categoria
  router.get('/categorybyname/:category_name', (req, res) => {
    const { category_name } = req.params; 
    mysqlConnection.query('SELECT * FROM Category WHERE category_name = ?', [category_name], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(403).json("Error al obtener categoria");
        console.log(err);
      }
    });
  });

  // Consulta para obtener 5 id de categoria aleatorios
  router.get('/idcategory', (req, res) => {
    mysqlConnection.query('SELECT id_category FROM Category ORDER BY RAND() LIMIT 5',  (err, rows, fields) => {
      if (!err) {
        let list = [];
        for (i = 0; i<rows.length; i++)
        {
           list.push(rows[i].id_category)
        }
        res.status(200).json(list);
    } else {
      res.status(403).json("Error al obtener categoria");
      console.log(err);
    }
  });
  

  });

  // Consulta para obtener porductos de manera random por id de categoria
  router.get('/productradom', (req, res) => { 

    const  id_category  = req.query.id_category; 
    mysqlConnection.query('SELECT * FROM product where id_category = ?', [id_category], (err, rows, fields) => {
        
          if (!err) {
              res.status(200).json(rows[0]);
              } else {
                res.status(403).json("Error al obtener producto");
                console.log(err);
              }
        });
      });

  router.get('/idcategory', (req, res) => { 

    const  id_category  = req.query.id_category; 
    console.log(id_category);
    mysqlConnection.query('SELECT * FROM product where id_category = ?', [id_category], (err, rows, fields) => {
            
      if (!err) {
        res.status(200).json(rows[0]);
        } else {
         res.status(403).json("Error al obtener producto");
         console.log(err);
        }
      });
  });

 // Agregar categoria
  router.post('/addcategory', (req, res) => {
    const {id_category,category_code, category_name} = req.body;
    console.log(id_category,category_code, category_name);
    const query = `
      CALL CategoryAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id_category,category_code, category_name ], (err, rows, fields) => {
      if(!err) {
        res.status(200).json({status: 'Categoria  Guardada'});
      } else {
        res.status(401).json({status: 'No  se pudo crear categoria', err});
        console.log(err);
      }
    });
  
  }); 

  // Agregar categoria
  router.post('/addclientmarket', (req, res) => {
    const {Client_id_client,Market_id_market} = req.body;
    console.log(Client_id_client,Market_id_market);
    const query = `
      CALL ClientMarketAdd(?, ?);
    `;
    mysqlConnection.query(query, [Client_id_client,Market_id_market ], (err, rows, fields) => {
      if(!err) {
        res.status(200).json({status: 'Cliente suscrito al supermercado'});
      } else {
        res.status(401).json({status: 'No  se pudo relacionar cliente con supermercado', err});
        console.log(err);
      }
    });
  
  }); 


  // Consulta para obtener datos de categoria por código de categoria
  router.get('/categorybycode', (req, res) =>{
    const category_code = req.query.category_code;
  
    mysqlConnection.query('select * from Category WHERE category_code = ?', [category_code], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
         }else{
           
            res.status(401).json("Error al obtener Categoria");
            console.log('err');
         }
    });
  });
  

module.exports = router;
