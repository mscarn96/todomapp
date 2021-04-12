const mongoose = require("mongoose");

// import geocoder from 'geocoder'

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please name a place"],
      trim: true,
      maxLength: [50, "Name can't be longer than 50 characters"],
    },
    icon: {
      type: String,
      required: [true, "Please add an icon"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

placeSchema.pre("remove", async function (next) {
  await this.model("Task").deleteMany({ place: this._id });
  next();
});

placeSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "place",
  justOne: false,
});

module.exports = mongoose.model("Place", placeSchema);
