const { Province } = require('../models')

class ProvinceController{
    static async postProvince(req, res, next){
        try {
            let { name } = req.body
            
            let newProvince = await Province.create({ name })
            res.status(201).json({msg: `New Province ${newProvince.name} has created`})
        } catch (error) {
            next (error)
        }
    }

    static async putProvince(req, res, next){
        try {
            let { name } = req.body
            let { id } =  req.params
            
            let updatedProvince = await Province.findByPk(id)
            if (!updatedProvince) throw ({name: "InvalidId"})

            const oldName = updatedProvince.name
            await updatedProvince.update({name})

            res.status(201).json({msg: `Province ${oldName} has updated to ${name}`})
        } catch (error) {
            next (error)
        }
    }
}

module.exports = ProvinceController