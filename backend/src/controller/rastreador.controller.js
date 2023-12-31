
const Rastreador = require("../model/Rastreador")

module.exports = {
    async index(req, res) {
        let rastreador = (await Rastreador.find().sort({ _id: -1 }).limit(1)).shift();
        //await Rastreador.deleteMany({})
        console.log(rastreador)
        console.log("/////////////////")
        const test = {
            latitude: rastreador.latitude,
            longitude: rastreador.longitude,
            altura: rastreador.altura,
            __v: rastreador.__v
        }
        console.log(test)
        const RastreadorCreate = await Rastreador.create(test)

        return res.json(rastreador)
    },

    async detail(req, res) {
        const { _id } = req.params
        const rastreador = await Rastreador.findOne({ _id });

        return res.json(rastreador)
    },

    async delete(req, res) {
        const { _id } = req.params
        const rastreador = await Rastreador.findByIdAndDelete({ _id });

        res.json({ Message: "Excluido com Sucesso" })
    },

    async create(req, res) {
        const {
            latitude,
            longitude,
            altura,
            __v
        } = req.body;

        let dataCreate = {};

        dataCreate = {
            latitude,
            longitude,
            altura,
            __v
        } // vars vindo do corpo
        const RastreadorCreate = await Rastreador.create(dataCreate) // criando o Rastreador atraves das var que vem do corpo
        return res.status(200).json(RastreadorCreate)

    },

    async update(req, res) {
        const {
            _id,
            latitude,
            longitude,
            altura
        } = req.body;

        let dataUpdate = {};

        dataUpdate = {
            _id,
            latitude,
            longitude,
            altura
        } // vars vindo co corpo
        const RastreadorUpdate = await Rastreador.findByIdAndUpdate({ _id }, dataUpdate, { new: true }) // criando o Rastreador atraves das var que vem do corpo
        return res.status(200).json(RastreadorUpdate)

    }
}