const fileUpload = require("express-fileupload");
const session = require("express-session");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./views/index.html"));
});

app.get("/espresso-machines", (req, res) => {
  res.sendFile(path.resolve("./views/espresso-machines.html"));
});

app.get("/accessories", (req, res) => {
  res.sendFile(path.resolve("./views/accessories.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve("./views/about.html"));
});

app.get("/coffee-machines/*", (req, res) => {
  res.sendFile(path.resolve("./views/product_list.html"));
});

app.get("/coffee-machine/:id*", (req, res) => {
  res.sendFile(path.resolve("./views/product.html"));
});

app.get("/coffee-grinders", (req, res) => {
  res.sendFile(path.resolve("./views/product_list.html"));
});

app.get("/coffee-grinder/:id", (req, res) => {
  res.sendFile(path.resolve("./views/product.html"));
});

app.get("/products/*", (req, res) => {
  res.sendFile(path.resolve("./views/product_list.html"));
});

app.get("/product/:id", (req, res) => {
  res.sendFile(path.resolve("./views/product.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.resolve("./views/contact.html"));
});

app.post("/contact", async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  };

  async function submit() {
    const currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      `@ ${new Date().toLocaleTimeString()}`;

    const info = await transporter.sendMail({
      from: '"Barista Garage Contact Page" <noreply@baristagarage.com>',
      to: "info@baristagarage.com",
      subject: payload.subject,
      html: `
        <ul>
            <li>Name:  ${payload.name}</li>
            <li>Email:  ${payload.email}</li>
            <li>Message: <br /> ${payload.message} </li>
        </ul>
      `,
    });
  }

  submit().catch((e) => console.log(e));

  res.sendFile(path.resolve("./views/contact_success.html"));
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.resolve("./views/admin/dashboard.html"));
  } else {
    res.sendFile(path.resolve("./views/admin/login.html"));
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.user = { username: process.env.ADMIN_USERNAME };
    res.redirect("/admin");
  } else {
    res.redirect("/login?success=false");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/admin", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.resolve("./views/admin/dashboard.html"));
  } else {
    res.redirect("/login");
  }
});

// add new product
app.get("/admin/new/coffee-machine", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.resolve("./views/admin/new_coffee_machine.html"));
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/new/coffee-grinder", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.resolve("./views/admin/new_coffee_grinder.html"));
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/new/product", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.resolve("./views/admin/new_product.html"));
  } else {
    res.redirect("/login");
  }
});

// edit products and delete
app.get("/admin/coffee-machine/:id", (req, res) => {
  if (req.session.user) {
    let data = require("./data/coffee_machines.json");
    const id = req.params.id;

    let product = data.filter((item) => item.id === id);

    if (product.length === 0) {
      res.send("Product not found!");
    } else {
      res.sendFile(path.resolve("./views/admin/edit_coffee_machine.html"));
    }
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/coffee-grinder/:id", (req, res) => {
  if (req.session.user) {
    let data = require("./data/coffee_grinders.json");
    const id = req.params.id;

    let product = data.filter((item) => item.id === id);

    if (product.length === 0) {
      res.send("Product not found!");
    } else {
      res.sendFile(path.resolve("./views/admin/edit_coffee_grinder.html"));
    }
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/product/:id", (req, res) => {
  if (req.session.user) {
    let data = require("./data/others.json");
    const id = req.params.id;

    let product = data.filter((item) => item.id === id);

    if (product.length === 0) {
      res.send("Product not found!");
    } else {
      res.sendFile(path.resolve("./views/admin/edit_product.html"));
    }
  } else {
    res.redirect("/login");
  }
});

app.use("/api", require("./api"));

app.get("*", function (req, res) {
  res.status(404).sendFile(path.resolve("./views/404.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
