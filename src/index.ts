import "dotenv/config"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import app from "@/server";

// We are in ...
console.log("mode: ", process.env.NODE_ENV);

// Main
function initServer() {
  const port = 9000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

(() => {
  try {
    initServer();
  } catch (err) {
    console.error(err);
    process.exit();
  }
})();
