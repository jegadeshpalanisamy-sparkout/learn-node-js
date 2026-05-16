

const getHome = async (req, res) => {
    try {
        res.status(200).json({ message: 'Welcome to Home page' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getHome }