const { User: UserModel } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const dataUsers = await UserModel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return res.send({
      status: "success",
      message: "Get data users success",
      data: dataUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const dataInput = req.body;

    // CheckUserByEmail
    const dataUserByEmail = await UserModel.findOne({
      where: {
        email: dataInput.email,
      },
    });
    if (dataUserByEmail) {
      return res.status(400).send({
        status: "fail",
        message: `User with email: ${dataInput.email} Allready exist`,
      });
    }
    // End CheckUserByEmail

    // Insert to database
    const insertToDatabase = await UserModel.create({
      id: uuidv4(),
      email: dataInput.email,
      fullname: dataInput.fullname,
      password: await bcrypt.hash(dataInput.password, 10),
    });
    if (!insertToDatabase) {
      return res.status(400).send({
        status: "fail",
        message: "Add user fail",
      });
    }
    // End Insert to database

    return res.send({
      status: "success",
      message: "Add data users success",
      data: dataInput,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};
