const { Payment, Tenant } = require('../../models')

exports.paymentCreateGetController = (req, res) => {
    res.render('pages/hw/paymentCreate')
}

exports.paymentCreatePostController = async (req, res, next) => {

    const { tenant_id, amount } = req.body
    const invoice = '#fh' + Math.floor(Math.random() * 999999);

    try {
        const newpayment = new Payment({
            tenant: tenant_id,
            invoice,
            amount
        })

        await newpayment.save()
            .then(async (savedpayment) => {
                const targetTenant = await Tenant.findById(tenant_id)
                    .populate({
                        path: 'house',
                        select: 'price'
                    })
                const registation = targetTenant.createdAt.getTime()
                const present = new Date().getTime()
                const diff = present - registation
                const months = diff / 1000 / 60 / 60 / 24 / 30
                const totalTargetPayment = Math.floor(months) * targetTenant.house.price

                const totalPaymentList = await Payment.find({ $in: { 'tenant': tenant_id } })
                let totalPaymentAmount = 0
                let dues = 0
                totalPaymentList.map(tp => {
                    console.log(tp.amount)
                    totalPaymentAmount = totalPaymentAmount + tp.amount
                })
                dues = (totalTargetPayment - totalPaymentAmount)
                await Tenant.findOneAndUpdate(
                    { _id: tenant_id },
                    {
                        due: dues,
                        $push: { payments: savedpayment._id }
                    })
                    .then(() => {
                        res.redirect('/hw/payment/list')
                    })
                    .catch(error => {
                        next(error)
                    })
            })
            .catch(error => {
                next(error)
            })

    } catch (e) {
        next(e)
    }
}


exports.paymentListController = async (req, res, next) => {
    try {
        const underProfileTenants = res.locals.profileTenants.tenants
        const paymentList = await Payment.find({ $in: { 'tenant': underProfileTenants } })
            .populate({
                path: 'tenant',
                select: 'firstName lastName'
            })
        res.render('pages/hw/paymentList', {
            paymentList
        })
    }
    catch (err) {
        next(err)
    }

}


