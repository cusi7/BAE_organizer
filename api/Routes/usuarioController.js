const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const cloudinary = require ('../helpers/cloudinary.js');
const {User, Application, Interview, Skill} = require('../db.js');

const userSesion = async(req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];//Saca el Bearer

        if(!token) {
            res.status(400).json({type: "error", msg: "Error. Intente ingresar nuevamente"})
        } else {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            req.actualUser = await User.findByPk(decoded.id, {
                attributes: {
                    exclude:  ['password']
                }
            });

         }
         next();

    } catch (error) {
        res.json(error)
    }

};

const userData = async(req, res) => {
    try {
        const user = req.actualUser;
        res.json(user)
        
    } catch (error) {
        res.json(error)
    }
    
};

const changes = async(req, res) => {
    try {
        const {password, newPassword, img} = req.body;

        const user = req.actualUser;

        const userPut = await User.findOne({where: {email: user.email}});

        if(userPut) {
            
            const pass = await bcrypt.compare(password, userPut.password);

            if(pass === false) {
               res.status(400).json({type: 'error', msg: 'La contraseña es incorrecta'})
            } else {
                const avatar = '';
                const saltRounds = 10;
                const passwordHash = await bcrypt.hash(newPassword, saltRounds);
                if(img) {
                    const pathCloud = await cloudinary.uploads(img);
                    console.log("uploaded image url => ", pathCloud);
                    avatar = pathCloud.secure_url;

                };
                if(newPassword && img) {
                    userPut.password = passwordHash;
                    userPut.avatar = avatar;
                    await userPut.save();
                    res.json({type: 'success', msg: 'La contraseña y el avatar fueron actualizados'})
                
                } else if(newPassword) {
                    userPut.password = passwordHash;
                    await userPut.save();

                    res.json({type: 'success', msg: 'La contraseña fue actualizada'})

                } else if(img) {
                    userPut.avatar = avatar;
                    await userPut.save();

                    res.json({type: 'success', msg: 'El avatar fue actualizado'})   

                }
            }

        } else {
            res.status(400).json({type: 'error', msg: 'No se encontro el usuario'}) 
        }
        
    } catch (error) {
        res.json(error)
    }
};

const deleteUser = async(req, res) => {
    const user = req.actualUser;

    try {
        const delUser = await User.findByPk(user.id, {
            attributes: {
                exclude:  ['password']
            },
            include: [{
                model: Application
            }]
        });

        delUser.applications.forEach(async(ap) => {
            
            let appli = await Application.findByPk(ap.id, {
                include: [{
                    model: Skill,
                    attributes: ['skill'],
                    through: {
                        attributes: []
                        }
                },{
                    model: Interview
                }]
            });
            if(appli.interviews.length > 0) {
                appli.interviews.forEach(async(i) => {
                    let int = await Interview.findByPk(i.id);
        
                    await int.destroy();
                });
            };
            if(appli.skills.length > 0) {
                let allSkills = await Skill.findAll();
                    allSkills.forEach(async(e) => {
                        await appli.removeSkill(e);
                    });
            }
            
            appli.destroy();
            
        });

        delUser.destroy();

        res.json({type: 'success', msg: 'Usuario eliminado'})

    } catch (error) {
        res.status(400).json({type: "error", msg: "La postulación no pudo ser eliminada"})
    }

};


module.exports = {
    userSesion,
    userData,
    changes,
    deleteUser
};