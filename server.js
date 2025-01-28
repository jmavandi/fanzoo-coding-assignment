// Backend
// a. Create an endpoint (e.g., POST /bookings) that takes in the experienceId,
// userId, athlete, and timestamp (in ISO 8601 format).
// b. Integrate with a mock payment service (could be a simple endpoint simulating
// payment acceptance or rejection).
// c. Upon successful "payment," store the booking record in the database.

import { createRequestHandler } from "@remix-run/express";
import express from "express";

// notice that the result of `remix vite:build` is "just a module"
import * as build from "./build/server/index.js";

const app = express();

// Add JSON body parsing middleware
app.use(express.json());

// Serve static files
app.use(express.static("build/client"));

// Your API routes should be mounted before the Remix handler
// You can import and use your booking routes here
// import bookingRoutes from './api.bookings';
// app.use('/api', bookingRoutes);

// Remix request handler for all other routes
app.all("*", createRequestHandler({ build }));

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
