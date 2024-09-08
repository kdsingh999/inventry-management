import { Request, Response } from "express";
import { db } from "../db/db";

export const createCustomer = async (req: Request, res: Response) => {
  const {
    customerType,
    firstname,
    lastname,
    email,
    phone,
    gender,
    maxCreditLimit,
    maxCreditDays,
    taxPin,
    dob,
    nationalID,
    country,
    location,
  } = req.body;

  try {
    const user = await db.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const customer = await db.customer.create({
      data: {
        customerType,
        firstname,
        lastname,
        email,
        phone,
        gender,
        maxCreditLimit,
        maxCreditDays,
        taxPin,
        dob,
        nationalID,
        country,
        location,
      } as any,
    });
    res.status(201).json({ customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await db.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);
    const customer = await db.customer.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).json({ customer });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);
    const { name, email, phone } = req.body;

    const customer = await db.customer.findUnique({
      where: {
        id,
      },
    });

    console.log(customer);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // const updateCustomer = await db.customer.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     name,
    //     email,
    //     phone,
    //   },
    // });
    // res.status(200).json({ updateCustomer });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id: idParam } = req.params;
    const id = parseInt(idParam);
    const customer = await db.customer.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ error, message: "Something went wrong" });
  }
};
