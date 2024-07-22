router.post('/login', async (req, res) => {
    const requiredFields = bodyValidator['login'];
    const missingFields = validateBody(req.body, requiredFields);

    if (missingFields.length) {
        return res.status(403).json({
            error: `Missing fields: ${missingFields.join(', ')}`,
            statusCode: 403
        });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid Username/Password" });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: "Invalid Username/Password" });
        }

        const token = jwt.sign({ _id: user._id }, jwtKey);
        const { _id, role } = user;
        return res.json({ token, user: { _id, username, role } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});