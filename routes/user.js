const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")

const { user } = new PrismaClient()

router.get('/', async (req, res) => {
  const users = await user.findMany({
    select: {
      username: true
    }
  })

  res.json(users)
})

router.post('/', async (req, res) => {
  const { username } = req.body;
  const userExists = await user.findUnique({
    where: {
      username
    },
    select: {
      username: true
    }
  })

  if(userExists) {
    res.status(400).json({
      message: "User already exists"
    })
  }

  const newUser = await user.create({
    data: {
      username
    }
  })
  res.status(200).json(newUser)
})

module.exports = router