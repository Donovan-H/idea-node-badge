const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy(() => {
    return res.redirect(process.env.IDEA_URL);
  });
});

module.exports = router;