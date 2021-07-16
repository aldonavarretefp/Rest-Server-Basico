const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const router = Router();
//Endpoints:
//Obtener info
router.get('/', usuariosGet);
//Actualizando data
router.put('/',usuariosPut)
//Crear nuevos recursos
router.post('/:id', usuariosPost)
//Borrar, marcandolo nadamas
router.delete('/', usuariosDelete)
router.patch('/', usuariosPatch);



module.exports = router;