class HouseController {

    async store(req,res) {
        console.log(req.body);
        console.log(req.file);
        
        return res.json({message: 'Okay'});
    };
}

export default new HouseController();