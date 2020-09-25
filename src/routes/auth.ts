import { Router } from "express"

const router = Router()

router.post("/register", (req, res) => {
  const { email, pass, confPass } = req.body
  console.log(email, pass, confPass)
})

export default router
