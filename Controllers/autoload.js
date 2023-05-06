module.exports = class {

    Run = (req, res) => {
        try {
            //await this.schema.Migrate();
            res.json({
                'status': "Ok",
                "message": "Configuration complete!"
            })
        } catch (err) {
            res.json({
                "status": 'error',
                'message': "Configurations Failed",
                "error": err
            })
        }
    }
}