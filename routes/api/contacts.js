const express = require("express");

const { contacts } = require("../../controllers");
const isValidId = require("../../controllers/midleware/helpers");
const router = express.Router();
router.get("/", contacts.getAllContacts);

router.get("/:contactId", isValidId, contacts.getById);

router.post("/", contacts.addContacts);

router.delete("/:contactId", contacts.deleteContacts);

router.put("/:contactId", isValidId, contacts.updateContacts);

router.patch("/:contactId/favorite", isValidId, contacts.updateStatusContact);

module.exports = router;
