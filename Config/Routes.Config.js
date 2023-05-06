const Autoload = require('../Controllers/autoload.js')
const router = require('express').Router()

let setApplicationRoutes = (app, sm) => {
    const MembersRoutes = require("../Routes/Members.Routes")(router, sm)
    const DashboardRoutes = require("../Routes/Dashboard.Routes")(router, sm)
    const StaffRoutes = require("../Routes/Staff.Routes")(router, sm)
    const CustomerRoutes = require('../Routes/Customers.Routes')(router, sm)
    const COARoutes = require('../Routes/COA.Routes')(router, sm)
    const AuthRoutes = require('../Routes/Authorizations.Routes')(router, sm)
    const BranchRoutes = require('../Routes/Branch.Routes')(router, sm)
    const AccountsRoutes = require('../Routes/Accounts.Routes')(router, sm)
    const MenuRoutes = require('../Routes/Menu.Routes')(router, sm)
    const AccessControlRoutes = require('../Routes/AccessControl.Routes')(router, sm)
    const EndOfDayRoutes = require('../Routes/EndOfDay.Routes')(router, sm)
    const CurrencyRoutes = require('../Routes/Currency.Routes')(router, sm)
    const AccountTypeRoutes = require('../Routes/AccountTypes.Routes')(router, sm)
    const TellerRoutes = require('../Routes/Teller.Routes')(router, sm)
    const BanksRoutes = require('../Routes/OtherBanks.Routes')(router, sm)

    const CommandRoutes = require('../Routes/Command.Routes')(router)

    app.use('/', MembersRoutes)
    app.use('/', DashboardRoutes)
    app.use('/', StaffRoutes)
    app.use('/', CustomerRoutes)
    app.use('/', COARoutes)
    app.use('/', AuthRoutes)
    app.use('/', BranchRoutes)
    app.use('/', AccountsRoutes)
    app.use('/', MenuRoutes)
    app.use('/', AccessControlRoutes)
    app.use('/', EndOfDayRoutes)
    app.use('/', CurrencyRoutes)
    app.use('/', AccountTypeRoutes)
    app.use('/', TellerRoutes)
    app.use('/', BanksRoutes)

    app.use('/', CommandRoutes)

    app.get('/uploads/:file_name', (req, res) => {
        let file = path.join(__dirname, 'Public/uploads/' + req.params.file_name)
        res.sendFile(file)
    })


    //Run all configurations and data seeding
    app.get('/system/configure', new Autoload().Run)

    app.get('*', sm.validatePage, function(req, res) {
        res.render(
            'workspace', {
                title: '404',
                session: true,
                partial: '404',
                userdata: req.session.userdata
            }
        );
    });

    return app
}

module.exports = { setApplicationRoutes }