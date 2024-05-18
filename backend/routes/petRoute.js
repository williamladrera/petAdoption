const express = require("express");
const router = express.Router();

const petController = require("../controllers/petController");

router.get("/", petController.pets);
router.get("/breed/:breed", petController.petsByBreed);
router.post("/create", petController.createPet);
router.put("/update/:id", petController.updatePet);
router.delete("/delete/:id", petController.deletePet);

module.exports = router;
