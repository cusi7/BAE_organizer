const { Router } = require('express');
const  { userSesion } = require('./usuarioController.js');
const {Position, Modality, Skill} = require('../db.js');
const  { getApplies, newAppli, appliId, appliAddFavorite, appliData, appliCandidate, appliPut,
    createInterview, interviewPut, interviewPass, deleteInterview, deleteAppli } = require('./applicationController.js');

const router = Router();


router.get('/applications', userSesion, getApplies);

router.post('/newAppli', userSesion, newAppli );

router.get('/:idAppli/appli', userSesion, appliId, appliData);

router.put('/:idAppli/addFav', userSesion, appliId, appliAddFavorite);

router.put('/:idAppli/candidate', userSesion, appliId, appliCandidate);

router.put('/:idAppli/changes', userSesion, appliId, appliPut);

router.post('/:idAppli/newInterview', userSesion, appliId, createInterview);

router.put('/:idInt/Intchanges', userSesion, interviewPut);

router.put('/:idInt/IntPass', userSesion, interviewPass);

router.post('/:idInt/deleteInterview', userSesion, deleteInterview);

router.post('/:idAppli/delete', userSesion, deleteAppli);

router.get('/modalities', async(req, res) => {
    try {
        const modalities = await Modality.findAll();

        res.json(modalities);
    } catch (error) {
        console.log(error)
    }

});

router.get('/positions', async(req, res) => {
    try {
        const positions = await Position.findAll();

        res.json(positions);
    } catch (error) {
        console.log(error)
    }

});

router.get('/skills', async(req, res) => {
    try {
        const skills = await Skill.findAll();

        res.json(skills);
    } catch (error) {
        console.log(error)
    }

});




module.exports = router;