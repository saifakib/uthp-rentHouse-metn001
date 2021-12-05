exports.homeController = (req, res) => {
    res.render('pages/explorer/home', { title: 'Hey', message: 'Hello there!' })
}

exports.propertyListing = (req, res) => {
    res.render('pages/explorer/moreProperty', { title: 'Hey', message: 'Hello there!' })
}

exports.searchPropertyListing = (req, res) => {
    res.render('pages/explorer/searchProperty', { title: 'Hey', message: 'Hello there!' })
}

exports.contactGetController = (req, res) => {
    res.render('pages/explorer/contactForm', { title: 'Hey', message: 'Hello there!' })
}

exports.profile = (req, res) => {
    res.render('pages/explorer/profile', { title: 'Hey', message: 'Hello there!' })
}

exports.profileProperty = (req, res) => {
    res.render('pages/explorer/profileProperty', { title: 'Hey', message: 'Hello there!' })
}