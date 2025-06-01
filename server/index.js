const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 6001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://food-ordering-app-with-ai.vercel.app','https://aistudio.google.com/prompts/new_chat'], // without the trailing /
  methods: ['GET', 'POST', 'PUT', 'DELETE' ,'PATCH'],
}));

app.use(express.json());

// MongoDB configuration
require('dotenv').config();

const user = process.env.DB_USER;
const password = encodeURIComponent(process.env.DB_PASSWORD); // Encoding just in case
const dbName = process.env.DB_NAME || 'FoodApp';

const mongoURI = `mongodb+srv://${user}:${password}@cluster0.unyo3.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// JWT Authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1hr" });
  res.send({ token });
});

// Importing routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoute");
const suggestedItemsRouter = require('./api/routes/suggesteditems');

app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);
app.use('/', suggestedItemsRouter);


// Chatbot Route (added)
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({ generationConfig, safetySettings, history: [
    {
      role: "user",
      parts: [{ text: "Generate a detailed list of healthy food recommendations suitable for a person eating at a restaurant. The recommendations should be personalized based on the individual's age, height, weight, and specific dietary needs, such as limiting sugar or other specified ingredients. Suggest commonly available options found in typical restaurants that are nutritious, balanced, and fit within these health parameters. Please include meal descriptions, ingredient details, and any portion size recommendations that align with the goal of promoting a healthy eating experience,based on the following details, formatted line by line:.\""}],
    },
    {
      role: "model",
      parts: [{ text: "Hello! Welcome to food recommendation. What's your name?"}],
    },
    {
      role: "user",
      parts: [{ text: "Hi"}],
    },
    {
      role: "model",
      parts: [{ text:  "Please provide me with line-by-line answers to the following information so I can create personalized recommendations:\n\n- Age:  \n- Height:  \n- Weight:  \n- Specific dietary needs: (e.g., limiting sugar, gluten-free, vegetarian, vegan, lactose intolerant, etc.)  \n- Any allergies or sensitivities:  \n- What type of restaurant are you eating at? (e.g., Italian, Mexican, American, etc.)  \n- What are your preferences for meals? (e.g., Do you prefer lighter fare, heavier meals, or something in between? Do you like salads, pasta, grilled meats, etc.?)  \n\nOnce I have this information, I can create a detailed list of healthy food recommendations tailored specifically to your needs."
}],
    },
  ], });

  const result = await chat.sendMessage(userInput);
  return result.response.text();
}
const fs = require("fs/promises");

app.post('/chat', async (req, res) => {
  try {
    const { userInput } = req.body;
    
    if (!userInput) {
      return res.status(400).json({ error: "User input is required" });
    }

    const response = await runChat(userInput);
    res.json({ response });

  } catch (error) {
    console.error("Error processing chat request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Stripe Payment Route
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Root Route
app.get("/", (req, res) => {
  res.send("Hello World, this is foodApp!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
