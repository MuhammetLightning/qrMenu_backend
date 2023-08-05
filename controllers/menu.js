import Menu from "../models/Menu.js";

export const createMenu = async (req, res, next) => {
  const newMenu = new Menu(req.body);
  try {
    const savedMenu = await newMenu.save();
    res.status(200).json(savedMenu);
  } catch (err) {
    next(err);
  }
};

export const updateMenu = async (req, res, next) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMenu);
  } catch (err) {
    next(err);
  }
};

export const deleteMenu = async (req, res, next) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.status(200).json("Item has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.status(200).json(menu);
  } catch (err) {
    next(err);
  }
};

export const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find(req.query);
    res.status(200).json(menus);
  } catch (err) {
    next(err);
  }
};
export const getCategoriesByRestoranName = async (req, res, next) => {
  try {
    const { restoranName } = req.params;

    const categories = await Menu.aggregate([
      {
        $match: { restoranName }, // İlgili restoran adını eşleştiriyoruz.
      },
      {
        $group: {
          _id: "$restoranName",
          categories: { $addToSet: "$category" },
        },
      },
      { $unwind: "$categories" }, // categories dizisini ayrıştırma (unwind)
      { $sort: { categories: 1 } }, // categories alanına göre alfabetik sıralama
      { $group: { _id: "$_id", categories: { $push: "$categories" } } }, // tekrar gruplama
    ]);

    if (categories.length === 0) {
      return res
        .status(404)
        .json({ message: "Restoran adına ait kategori bulunamadı." });
    }
    const restaurantCategories = categories[0].categories;
    res.status(200).json(restaurantCategories);
  } catch (err) {
    next(err);
  }
};
