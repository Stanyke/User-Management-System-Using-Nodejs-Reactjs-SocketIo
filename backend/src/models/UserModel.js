const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    department: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female", ""],
      lowercase: true,
      trim: true,
      default: "",
    },
    avatar: {
      name: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
  }
);

// Used when the user object need to be destructured as in ...user._doc
// instead use ...user.toJSON()
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

// This makes sure that the user's password is removed,
// if the user is fetch with its related collections or when doing: res.send({user, ...,})
// This does not need to be called
UserSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.password;
  },
});

UserSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  return token;
};

UserSchema.pre("save", async function (next) {
  const user = this;

  if ((user.isModified("password") || this.isNew) && user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

UserSchema.virtual("fullName").get(function () {
  return this.firstname + " " + this.lastname;
});

const user = model("User", UserSchema);
module.exports = user;
