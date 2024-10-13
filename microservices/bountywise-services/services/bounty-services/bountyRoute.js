import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    "message": "Hello World From Bounty Services"
  });
});

router.post("/create-bounty", (req, res) => {
  console.log(req.body);
  // const { bountyId, bountyName, bountyDescription, bountyReward } = req.body;
  return res.json({
    "message": "Bounty Created",
    "data": req.body
  });
});

export default router;
