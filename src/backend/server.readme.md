# Verbose Commented Version of server.ts

```ts
// =============================================
// Middlewares - Before Routers
// =============================================

/**
 * Security layer for requests
 *
 * It set security HTTP headers
 * and other security related beauty.
 *
 * NOTE: helmet doesnt work with Codesandbox,
 * (at least used like this), so it's commented
 */
// app.use(helmet());

/**
 * Request/response logger
 */
app.use(loggerPlain("--------------------"));
app.use(morgan("dev"));

/**
 * Request parsers
 */
app.use(express.json());

// =============================================
// Routers
// =============================================
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("Hello from homepage!");
});

// =============================================
// Middlewares - After Routers
// =============================================

/**
 * 404 Not Found Handler
 */
app.use(notFound);

if (isDevelopment()) {
  /**
   * Development only error trace logger
   *
   * Use it only on develoment
   * It helps you to find where "error" originated.
   * Otherwise the client receive the sensistive trace.
   */
  app.use(errorhandler());
} else {
  /**
   * Prdduction only chain
   * That send back info to client about "why" error happened
   */
  app.use(apiErrorMiddleware);
  app.use(clientErrorHandler);
}

export default app;
```
