const mongoose = require("mongoose");

// import geocoder from 'geocoder'

const PlaceSchema = new mongoose.Schema(
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
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PlaceSchema.pre("remove", async function (next) {
  await this.model("Task").deleteMany({ place: this._id });
  next();
});

PlaceSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "place",
});

module.exports = mongoose.model("Place", PlaceSchema);
