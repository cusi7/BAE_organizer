const {User, Application, Position, Modality, Skill, Interview} = require('../db.js');


const getApplies = async(req, res) => {
    const user = req.actualUser;
    try {
        const applies = await Application.findAll({where: {userId: user.id},
    
                attributes: {
                    exclude:  ['positionId', 'modalityId']
                },
                include: [{
                    model: Position
                },{
                    model: Modality
                },{
                    model: Skill,
                    attributes: ['skill'],
                    through: {
                        attributes: []
                        }
                },{
                    model: Interview
                }]
        });
        res.json(applies);
    } catch (error) {
        console.log(error)
    }

};

const newAppli = async(req, res) => {
    const {linkA, duration, remuneration, currency, postulation, nameCompany, location, modality, position, skills } = req.body;
    const user = req.actualUser;

    try {
        const userAppli = await User.findOne({where: {email: user.email}});

        //APLICACION
            let applic = await Application.create({    
                    link: linkA,
                    duration,
                    remuneration,
                    currency,
                    postulation,
                    company: nameCompany,
                    location   
            });
                userAppli.addApplication(applic);

            //POSICION
            let posc = position.toUpperCase();
            let [instanceP, createdP] = await Position.findOrCreate({
                where: {position: posc},
                default: {
                    position: posc
                }  
            });
            if(instanceP) {
                instanceP.addApplication(applic)
            }   
            else if(createdP) {
                createdP.addApplication(applic)
            };

            //MODALIDAD
            let mod = modality.toUpperCase();
            let [instanceM, createdM] = await Modality.findOrCreate({
                where: {modality: mod},
                default: {
                    modality: mod
                }  
            });
            if(instanceM) {
                instanceM.addApplication(applic)
            }   
            else if(createdM) {
                createdM.addApplication(applic)
            };

            //SKILLS
            skills.forEach( async(s) => {
                let sk = s.toUpperCase();
                let [instance, created] = await Skill.findOrCreate({
                    where: {skill: sk},
                    default: {
                        skill: sk
                    }  
                });
                if(instance) {
                        applic.addSkill(instance)
                }   
                else if(created) {
                        applic.addSkill(created)
                };
            });
            

            res.json({type: 'success', msg: 'Postulación creada. Suerte!!'})

    } catch (error) {
        console.log(error)
    }

};

const appliId = async(req, res, next) => {
    const {idAppli} = req.params;
    try {
        let appli = await Application.findByPk(idAppli);

        if(!appli) {
            res.status(400).json({type: "error", msg: "Postulación no encontrada"})
        } else if( appli ) {
            req.appli = appli;

            next();
        }
        
    } catch (error) {
        console.log(error);
    }
};

const appliData = async(req, res) => {
    const {idAppli} = req.params;
    try {
        let appli = await Application.findByPk(idAppli, {
            attributes: {
                exclude:  ['positionId', 'modalityId']
            },
            include: [{
                model: Position
            },{
                model: Modality
            },{
                model: Skill,
                attributes: ['skill'],
                through: {
                    attributes: []
                    }
            },{
                model: Interview
            }]
        });

        res.json(appli)
        
    } catch (error) {
        res.status(400).json({type: "error", msg: "Postulación no encontrada"})
    }
    
};

const appliAddFavorite = async(req, res) => {
    let appli = req.appli;
    try {
        appli.favorite = !appli.favorite;
        await appli.save();
        res.json(appli)
    } catch (error) {
        console.log(error)
    }
};

const appliCandidate = async(req, res) => {
    let appli= req.appli;
    try {
        appli.candidate = !appli.candidate;
        await appli.save();
        res.json(appli)
    } catch (error) {
        console.log(error)
    }
};

const appliPut = async(req, res) => {
    let appli = req.appli;
    let {linkA, duration, remuneration, currency, annotations, nameCompany, location, modality,
         position, skills} = req.body;

         try {
            if(linkA) appli.link = linkA;
            if(duration) appli.duration = duration;
            if(remuneration) appli.remuneration = remuneration;
            if(currency) appli.currency = currency;
            if(annotations) appli.annotations = annotations;
            if(nameCompany) appli.company = nameCompany;
            if(location) appli.location = location;
        
            await appli.save();
        
            if(modality) {
                let mod = modality.toUpperCase();
                    let [instanceM, createdM] = await Modality.findOrCreate({
                        where: {modality: mod},
                        default: {
                            modality: mod
                        }  
                    });
                    if(instanceM) {
                        instanceM.addApplication(appli)
                    }   
                    else if(createdM) {
                        createdM.addApplication(appli)
                    };
            };
        
            if(position) {
                let posc = position.toUpperCase();
                    let [instanceP, createdP] = await Position.findOrCreate({
                        where: {position: posc},
                        default: {
                            position: posc
                        }  
                    });
                    if(instanceP) {
                        instanceP.addApplication(appli)
                    }   
                    else if(createdP) {
                        createdP.addApplication(appli)
                    };
            };

            if(skills) {
                let allSkills = await Skill.findAll();
                allSkills.forEach(async(e) => {
                    appli.removeSkill(e);
                });

                skills.forEach( async(s) => {
                    let sk = s.toUpperCase();
                    let [instance, created] = await Skill.findOrCreate({
                        where: {skill: sk},
                        default: {
                            skill: sk
                        }  
                    });
                    if(instance) {
                            appli.addSkill(instance)
                    }   
                    else if(created) {
                            appli.addSkill(created)
                    };
                });
            }

            // res.json(appli);
            res.json({type: 'success', msg: 'Postulación actualizada'})
         } catch (error) {
            console.log(error)
         }

};

const deleteAppli = async(req, res) => {
    const {idAppli} = req.params;
     try {
        let appli = await Application.findByPk(idAppli, {
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

        res.json({type: 'success', msg: 'Postulación eliminada'})
   
     } catch (error) {
        res.status(400).json({type: "error", msg: "La postulación no pudo ser eliminada"})
     }

};

const createInterview = async(req, res) => {
    const appli = req.appli;
    const {date, description, link} = req.body;

    try {
        const interv = await Interview.create({
            date,
            description,
            link
        });

        appli.addInterview(interv);

        res.json({type: 'success', msg: 'Entrevista creada. Éxitos!!'})
       
    } catch (error) {
        res.status(400).json({type: "error", msg: "La entrevista no pudo ser creada"})
    }

};

const interviewPut = async(req, res) => {
    const {idInt} = req.params;
    const {date, description, link} = req.body;

    try {
        let int = await Interview.findByPk(idInt);

        if(date) int.date = date;
        if(description) int.description = description;
        if(link) int.link = link;

        await int.save();
        res.json({type: 'success', msg: 'Entrevista actualizada'})

    } catch (error) {
        res.status(400).json({type: "error", msg: "La entrevista no pudo ser actualizada"})
    }
};

const interviewPass = async(req, res) => {
    const {idInt} = req.params;
    const user = req.actualUser;

    try {
        let int = await Interview.findByPk(idInt);

        int.passed = !int.passed;
        int.save();

        if(int.passed === true) {
            res.json({type: 'congratulation', msg: `Felicitaciones ${user.name}!!!`})
        } else if(int.passed === false) {
            res.json({type: 'looser', msg: `Ánimos ${user.name}, será la próxima!!`})
        }
    } catch (error) {
        
    }
};

const deleteInterview = async(req, res) => {
    const {idInt} = req.params;
    try {
        let int = await Interview.findByPk(idInt);

        await int.destroy();
        res.json({type: 'success', msg: 'Entrevista eliminada'})
    } catch (error) {
        res.status(400).json({type: "error", msg: "La entrevista no pudo ser eliminada"})
    }
}


module.exports = {
    getApplies,
    newAppli,
    appliId,
    appliAddFavorite,
    appliData,
    appliCandidate,
    appliPut,
    createInterview,
    interviewPut,
    interviewPass,
    deleteInterview,
    deleteAppli
}