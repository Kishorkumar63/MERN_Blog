const express = require("express");
const { verfiyToken } = require("../utils/verfiyUser");
const router = express.Router();


router.post("/create",verfiyToken)

module.export=router