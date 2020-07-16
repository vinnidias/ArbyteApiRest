const handleError = (res, error) => {
    console.log('handle Error', error)
    res.status(error.status || 500).json({...error, message: error.message})
};

module.exports = handleError;