import { Store } from "../Models/Store.js";

//create new store
export const newstore = async (req, res) => {
  const {
    store_name,
    store_email,
    store_phone,
    store_no,
    store_brand,
    store_address,
  } = req.body;
  if (
    store_name == "" ||
    store_email == "" ||
    store_phone == "" ||
    store_no == "" ||
    store_brand == "" ||
    store_address == ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const store_no1 = req.body.store_no; //for route same "id" used
  const detail = await Store.findOne({ store_no: store_no1 });

  if (detail) {
    return res.status(409).json({
      message: "Store already exists",
      Store_name: detail.store_name,
      Store_email: detail.store_email,
      Store_No: detail.store_no,
    });
  }

  let storedetails = await Store.create({
    store_name,
    store_email,
    store_phone,
    store_no,
    store_brand,
    store_address,
    user: req.user,
  });

  return res.json({
    message: "Store saved successfully",
    success: true,
    storedetails,
  });
};

//get all store
export const getallstores = async (req, res) => {
  const userStoredetail = await Store.find();
  if (!userStoredetail) {
    return res.status(403).json({ message: "Empty Stores", success: false });
  }
  console.log(userStoredetail);

  return res.json({
    message: "All stores are fetched successfully",
    userStoredetail,
  });
};

//get store by ID
export const getstorebyid = async (req, res) => {
  const id1 = req.params.id; //for route same "id" used
  const storedetails = await Store.findById(id1);

  if (!storedetails) {
    console.log("---------no data");
    return res.status(403).json({ message: "No store found", success: false });
  }

  return res.json({
    message: "Store ID found",
    success: true,
    storedetails,
  });
};

//update store by ID
export const updatestore = async (req, res) => {
  const {
    store_name,
    store_email,
    store_phone,
    store_no,
    store_brand,
    store_address,
  } = req.body;
  const store_nos = req.params.store_no; //for route same "id" used
  const storedetails = await Store.findOneAndUpdate(
    { store_no: store_nos },
    {
      store_name,
      store_email,
      store_phone,
      store_brand,
      store_address,
    },
    { new: true }
  );
  console.log("storedetails::", storedetails);
  if (!storedetails) {
    return res.status(404).json({
      message: "Details not found for update",
      success: false,
    });
  }
  return res.json({
    message: "Store updated successfully",
    success: true,
    storedetails,
  });
};

//delete store
export const deletestore = async (req, res) => {
  const store_nos = req.params.store_no; //for route same "id" used
  const storedetails = await Store.findOneAndDelete({ store_no: store_nos });

  console.log("storedetails::", storedetails);
  if (!storedetails) {
    return res.status(404).json({
      message: "Details not found for delete",
      success: false,
    });
  }
  return res.json({
    message: "Store deleted successfully",
    success: true,
  });
};
