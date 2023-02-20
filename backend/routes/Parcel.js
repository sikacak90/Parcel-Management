import express from "express";
import Parcel from "../models/Parcel.js";
import mongoose from "mongoose";
let router = express.Router();

//Adding new parcel
router.route("/add").post(async (req, res) => {
  const parcelId = req.body.parcelId;
  const Date = req.body.Date;
  const Time = req.body.Time;
  const Status = req.body.Status;
  const userId = req.body.userId;

  const duplicate = await Parcel.findOne({ parcelId: parcelId }).exec();

  if (duplicate) {
    console.log(parcelId + " Already Scanned");
    return res.status(400).json({ message: parcelId + " Already Scanned" });
  }
  try {
    const newParcel = await Parcel.create({
      parcelId,
      Date,
      Time,
      Status,
      userId,
    });
    console.log(newParcel);
    console.log("Tracking Captured " + req.body.parcelId);
    res.status(201).json({ message: parcelId + " Added" });
  } catch (err) {
    res.status(400).json("error: " + err);
  }



  // newParcel
  //   .save()
  //   .then(() => res.json("New Parcel Added"))
  // .catch((err) => res.status(400).json("error: " + err));
});

//Getting all parcels
router.route("/getParcel").get(async (req, res) => {
  const parcels = await Parcel.find();
  res.json(parcels);
});

//Get Specific Parcels
router.route("/getParcel/:id").get(async (req, res) => {
  const { id } = req.params;
  const parcel = await Parcel.find().where("userId").equals(id);
  res.json(parcel);
});

//Deleting a parcel
router.route("/del/:id").delete(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID Format" });
  }

  const parcel = await Parcel.findOneAndDelete({ _id: id });
  if (parcel) {
    res.status(200).json(parcel);
    console.log("Delete " + id);
  } else {
    res.status(404).json({ error: "No Such Parcel" });
    console.log("Delete " + id);
  }
});

//Searching for a parcel
router.route("/find/:parcelId").get(async (req, res) => {
  const { parcelId } = req.params;
  Parcel.findOne({ parcelId: parcelId })
    .then((Parcel) => {
      res.status(200).json({
        Parcel: Parcel,
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

//Updating a parcel
router.route("/update/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const { Status } = req.body;

    const updateParcel = await Parcel.findByIdAndUpdate(
      id,
      { Status: Status },
      { new: true }
    );
    res.json(updateParcel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.route("/updateAll/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const { parcelId, Date, Time } = req.body;
    const updateParcel = await Parcel.findByIdAndUpdate(
      id,
      { parcelId: parcelId, Date: Date, Time: Time },
      { new: true }
    );
    res.json(updateParcel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
export default router;
