const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const { nextTick } = require('process')
const ApiError = require('../error/ApiError')
const { info } = require('console')

class DeviceController { 
    async create(request, response, next) {
        try {

            const {name, price, brandId, typeId, info} = request.body
            const {img} = request.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.response(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})


            if(info) {
                info.JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }


            return response.json(device)

        } catch (e) {
            next(ApiError.badRequest)
        }
    }
    
    async getAll(request, response,) {
        let {brandId, typeId, limit, page} = request.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;

        if(!brandId && !typeId) {
            devices = await Device.findAll({limit, offset})
        }
        
        if(!brandId && typeId) {
            devices = await Device.findAll({where: {typeId}, limit, offset})
        }
        
        if(brandId && !typeId) {
            devices = await Device.findAll({where: {brandId}, limit, offset})
        }
        
        if(brandId && typeId) {
            devices = await Device.findAll({where: {typeId, brandId}, limit, offset})
        }

        return response.json(devices)
    }

    async getOne(request, response) {
        const {id} = request.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )

        return response.json(device)

    }
}

module.exports = new DeviceController