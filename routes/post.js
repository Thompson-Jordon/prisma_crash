const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")

const { post, user } = new PrismaClient()

router.post('/', async (req, res) => {
  const { title, content, user_id } = req.body

  const userExists = await user.findUnique({
    where: {
      id: user_id
    }
  })

  if (!userExists) {
    return res.status(400).json({ message: "User not found" })
  }
  const newPost = await post.create({
    data: {
      title,
      post: content,
      user_id: parseInt(user_id)
    }
  })
  res.json(newPost)
})

router.get('/:user_id', async (req, res) => {
  const {user_id} = req.params
  const posts = await post.findMany({
    where: {
      user_id: parseInt(user_id)
    }
  })

  res.json(posts)
})

module.exports = router