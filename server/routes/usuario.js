// Librerias
const express = require('express')
const bcrypt = require('bcrypt');
const _ = require('underscore');


// Archivos
const Usuario = require('../models/usuario')

//
const app = express()
//


//  ===== GET =====
app.get('/usuario',  (req, res) => {





    // Maneja inicio de paginacion
    let desde = req.query.desde || 0;
    desde = Number(desde);

    // Maneja limite de paginacion
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado: true}, 'nombre email estado google img')
        .skip(desde)
        .limit(limite)
        .exec( ( err, usuarios ) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //  countDocuments actualizacion en lugar de funcion count
            // countDocuments devuelve valor de registros de la coleccion
            Usuario.countDocuments( {estado: true}, ( err, conteo ) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });
        });
});


// ====== POST ======
app.post('/usuario', (req, res) => {


    let body = req.body; //data enviada por usuario

    // Crea objeto listo para grabar en BD
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    // Grabando en BD
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
               ok: false,
               err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

});



// ====== PUT ======
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id; // obtiene id del usuario por URL
    let body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado'] );

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, ( err, usuarioDB ) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });



});


// ===== DELETE =====

app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }


    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, ( err, usuarioBorrado ) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }


        res.json({
            ok: true,
            usuario: usuarioBorrado
        });


    });

/* Borrado fisico en BD
    Usuario.findByIdAndRemove(id, ( err, usuarioBorrado ) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }




        res.json({
           ok: true,
           usuario: usuarioBorrado
        });
    });
*/

});


module.exports = app;
