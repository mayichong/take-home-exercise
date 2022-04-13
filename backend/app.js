const express = require('express');
const { TeamMember } = require('./model');
var cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});

app.post('/new', async(req, res, next) => {
  const newMember = req.body;

  TeamMember.create({
    firstName:newMember.firstname,
    lastName: newMember.lastname,
    title: newMember.title,
    story: newMember.story,
    favoriteColor: newMember.background,
    photoUrl: newMember.pic,
  })

})

module.exports = app;
