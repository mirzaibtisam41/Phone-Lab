const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    // Trim and escape special regex characters to prevent unexpected behavior
    const sanitizedKeyword = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regEx = new RegExp(sanitizedKeyword, "i");

    const searchQuery = {
      $or: [
        { title: { $regex: regEx } },
        { description: { $regex: regEx } },
        { category: { $regex: regEx } },
        { brand: { $regex: regEx } },
      ],
    };

    const searchResults = await Product.find(searchQuery).lean();

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { searchProducts };
