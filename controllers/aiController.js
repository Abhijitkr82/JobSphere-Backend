const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const testAI = async (req, res) => {
  try {
    console.log(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(
      "Say Hello from Gemini AI"
    );

    const response = result.response.text();

    res.status(200).json({
      success: true,
      message: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  testAI,
};