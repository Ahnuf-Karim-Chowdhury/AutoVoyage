export const register = async (req, res) => {
    try {
        console.log("registered!");
        return res.status(200).json({ message: req.body });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
}