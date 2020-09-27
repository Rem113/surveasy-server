import { Router } from "express"

const router = Router()

router.post("/register", (req, res) => {
  const { email, pass, confPass } = req.body
  return res.status(200).json({ email, pass, confPass })
})

router.post("/login", (req, res) => {
  const { email, pass } = req.body
  return res.status(200).json({ email, pass })
})

export default router
