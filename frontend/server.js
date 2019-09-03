

// server.js
const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000            // add this

app
    .prepare()
    .then(() => {
        const server = express();
        server.get("/post/:id/edit", (req, res) => {
            const actualPage = "/post/edit";
            const queryParams = { id: req.params.id };
            app.render(req, res, actualPage, queryParams);
        });
        server.get("/post/:id", (req, res) => {
            const actualPage = "/post";
            const queryParams = { id: req.params.id };
            app.render(req, res, actualPage, queryParams);
        });
        server.get("*", (req, res) => {
            return handle(req, res);
        });
        server.listen(PORT, err => {                  // update this
            if (err) throw err;
            console.log(`> Ready on http://localhost:${PORT}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });