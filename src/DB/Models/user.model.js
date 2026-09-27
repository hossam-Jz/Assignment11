import mongoose from "mongoose";
import {
  genderEnum,
  providerEnum,
  roleEnum,
} from "../../Utils/enums/user.enum.js";

export const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === providerEnum.SYSTEM;
      },
    },
    provider: {
      type: Number,
      enum: Object.values(providerEnum),
      default: providerEnum.SYSTEM,
    },
    role: {
      type: Number,
      enum: Object.values(roleEnum),
      default: roleEnum.USER,
    },
    gender: {
      type: Number,
      enum: Object.values(genderEnum),
      default: genderEnum.MALE,
    },
    DOB: Date,
    confirmEmail: Date,
    profilePic: String,
    phone: String,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

userSchema
  .virtual("userName")
  .set(function (value) {
    const [firstName, lastName] = value?.split(" ") || [];
    this.set({ firstName, lastName });
  })
  .get(function () {
    return `${this.firstName} ${this.lastName} `;
  });

export const userModel = mongoose.model("user", userSchema);
