const { Router } = require ('express');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../db.js');
const  { userSesion, userData, changes, deleteUser } = require('./usuarioController.js');

const router = Router();

//REGISTRO DE USUARIO
router.post('/registro', async(req, res) => {
    try {
        const { name, email, password} = req.body;
        const img = req.body.data;

        const useName = await User.findOne({where: {name}});
        const useEmail = await User.findOne({where: {email}});

        if(useName || useEmail) {
            const error = (
                useName ? 'El nombre de usuario ya existe' : 'El email ya está registrado'
            );
            res.status(400).json({type: 'error', msg: error })
        } else {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            let avatar;

            if(img) {
                const pathCloud = await cloudinary.uploads(img);
    
                console.log("uploaded image url => ", pathCloud);
    
                avatar = pathCloud.secure_url;
                  
            }

            const newUser = await User.create({
                name, 
                email, 
                password: passwordHash,
                avatar
               });
    
               res.json({type: 'success', msg: 'El usuario fue creado con éxito'})
            }
    } catch (error) {
        res.json(error)
    }
});

router.post('/login', async(req,res) => {
    try {
        const {email, password} = req.body;

        const userEmail = await User.findOne({where: {email}});

        if(!userEmail) {
            res.status(400).json({type: 'error', msg: 'La dirección de email no está registrada'})
        
        } else if(userEmail) {
            const pass = await bcrypt.compare(password, userEmail.password);

            if(pass === false) {
               res.status(400).json({type: 'error', msg: 'La contraseña es incorrecta'})
            } else {
                  // create token
                  const token = jwt.sign({
                    nombre: userEmail.name,
                    id: userEmail.id
                }, process.env.TOKEN_SECRET)

                res.json({
                    token: `Bearer ${token}`,
                    mensaje: {type: 'success', msg: `Hola ${userEmail.name}!!!`},
                })
            }

        }
        
    } catch (error) {
        res.json(error)
    }

});

router.get('/perfil', userSesion, userData);

router.put('/cambios', userSesion, changes);

router.post('/delete', userSesion, deleteUser);


module.exports = router;