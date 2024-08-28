const { nanoid } = require("nanoid");
const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// returns all products     GET
router.get("/coffee-machines", (req, res) => {
  res.send(require("./data/coffee_machines.json"));
});

router.get("/coffee-grinders", (req, res) => {
  res.send(require("./data/coffee_grinders.json"));
});

router.get("/products", (req, res) => {
  res.send(require("./data/others.json"));
});

// returns a random product
router.get("/random", (req, res) => {
  const coffeeMachines = require("./data/coffee_machines.json");
  const coffeeGrinders = require("./data/coffee_grinders.json");
  const products = require("./data/others.json");

  const combinedArray = [...coffeeMachines, ...coffeeGrinders, ...products];
  const randomIndex = Math.floor(Math.random() * combinedArray.length);

  res.json(combinedArray[randomIndex]);
});

// returns a single product      GET
router.get("/coffee-machine/:id", (req, res) => {
  const data = require("./data/coffee_machines.json");
  const id = req.params.id;

  const product = data.filter((item) => item.id === id);

  if (product.length === 0) {
    res.send("Product not found!");
  }

  res.send(product[0]);
});

router.get("/coffee-grinder/:id", (req, res) => {
  const data = require("./data/coffee_grinders.json");
  const id = req.params.id;

  const product = data.filter((item) => item.id === id);

  if (product.length === 0) {
    res.send("Product not found!");
  }

  res.send(product[0]);
});

router.get("/product/:id", (req, res) => {
  const data = require("./data/others.json");
  const id = req.params.id;

  const product = data.filter((item) => item.id === id);

  if (product.length === 0) {
    res.send("Product not found!");
  }

  res.send(product[0]);
});

// adds new product        POST
const save = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

router.post("/coffee-machines", (req, res) => {
  const id = nanoid(5);

  const image = req.files.image;
  const imagePath = id + "." + image.name.split(".").at(-1);

  image.mv(path.resolve("./public/assets/", imagePath));

  const payload = {
    id: id,
    name: req.body.product_name,
    category: req.body.category,
    image: imagePath,
    description: req.body.description,
    keyword: "coffee-machine",
    specifications: {
      version: req.body.version,
      user_interface: req.body.user_interface,
      canisters: req.body.canisters,
      mixing_blows: req.body.mixing_blows,
      coffee_brewer: req.body.coffee_brewer,
      boilers: req.body.boilers,
      height: req.body.height,
      weight: req.body.weight,
      depth: req.body.depth,
      power_consumption: req.body.power_consumption,
      frequency: req.body.frequency,
      beans_capacity: req.body.beans_capacity,
      height_delivery_area: req.body.height_delivery_area,
    },
  };

  if (req.files.brochure) {
    const brochure = req.files.brochure;
    const brochurePath = id + "." + brochure.name.split(".").at(-1);
    brochure.mv(path.resolve("./public/assets/", brochurePath));

    payload.brochure = brochurePath;
  }

  let data = require("./data/coffee_machines.json");

  data.push(payload);

  save(path.resolve("./data/coffee_machines.json"), data);

  res.redirect("/admin?context=add+success");
});

router.post("/coffee-grinders", (req, res) => {
  const id = nanoid(5);

  const image = req.files.image;
  const imagePath = id + "." + image.name.split(".").at(-1);

  image.mv(path.resolve("./public/assets/", imagePath));

  const payload = {
    id: id,
    name: req.body.product_name,
    image: imagePath,
    description: req.body.description,
    keyword: "coffee-grinder",
    specifications: {
      version: req.body.version,
      user_interface: req.body.user_interface,
      canisters: req.body.canisters,
      mixing_blows: req.body.mixing_blows,
      height: req.body.height,
      weight: req.body.weight,
      depth: req.body.depth,
      power_consumption: req.body.power_consumption,
      beans_capacity: req.body.beans_capacity,
    },
  };

  if (req.files.brochure) {
    const brochure = req.files.brochure;
    const brochurePath = id + "." + brochure.name.split(".").at(-1);
    brochure.mv(path.resolve("./public/assets/", brochurePath));

    payload.brochure = brochurePath;
  }

  let data = require("./data/coffee_grinders.json");

  data.push(payload);

  save(path.resolve("./data/coffee_grinders.json"), data);

  res.redirect("/admin?context=add+success");
});

router.post("/products", (req, res) => {
  const id = nanoid(5);

  const image = req.files.image;
  const imagePath = id + "." + image.name.split(".").at(-1);

  image.mv(path.resolve("./public/assets/", imagePath));

  const payload = {
    id: id,
    name: req.body.product_name,
    category: req.body.category,
    image: imagePath,
    description: req.body.description,
    keyword: "product",
    specifications: {
      version: req.body.version,
      height: req.body.height,
      weight: req.body.weight,
      depth: req.body.depth,
      beans_capacity: req.body.beans_capacity,
    },
  };

  let data = require("./data/others.json");

  data.push(payload);

  save(path.resolve("./data/others.json"), data);

  res.redirect("/admin?context=add+success");
});

// deletes a product      DELETE
function findIndexById(array, id) {
  return array.findIndex((obj) => obj.id === id);
}

router.delete("/coffee-machine/:id", (req, res) => {
  let data = require("./data/coffee_machines.json");
  const id = req.params.id;

  const product = data.filter((item) => item.id === id);

  if (product.length === 0) {
    res.status(403).json({ error: "Product not found!" });
  } else {
    const index = findIndexById(data, id);

    data.splice(index, 1);

    save(path.resolve("./data/coffee_machines.json"), data);

    fs.unlinkSync(path.resolve("./public/assets/", product[0].image));

    if (Object.hasOwn(product[0], "brochure") === true) {
      fs.unlinkSync(path.resolve("./public/assets/", product[0].brochure));
    }

    res.json({ message: "Product deleted!" });
  }
});

router.delete("/coffee-grinder/:id", (req, res) => {
  let data = require("./data/coffee_grinders.json");
  const id = req.params.id;

  const product = data.filter((item) => item.id === id);

  if (product.length === 0) {
    res.status(403).json({ error: "Product not found!" });
  } else {
    const index = findIndexById(data, id);

    data.splice(index, 1);

    save(path.resolve("./data/coffee_grinders.json"), data);

    fs.unlinkSync(path.resolve("./public/assets/", product[0].image));

    if (Object.hasOwn(product[0], "brochure") === true) {
      fs.unlinkSync(path.resolve("./public/assets/", product[0].brochure));
    }

    res.json({ message: "Product deleted!" });
  }
});

router.delete("/product/:id", (req, res) => {
  let data = require("./data/others.json");
  const id = req.params.id;

  const product = data.filter((item) => item.id === id);

  if (product.length === 0) {
    res.status(403).json({ error: "Product not found!" });
  } else {
    const index = findIndexById(data, id);

    data.splice(index, 1);

    save(path.resolve("./data/others.json"), data);

    fs.unlinkSync(path.resolve("./public/assets/", product[0].image));

    res.json({ error: "Product deleted!" });
  }
});

// modifies a product       POST
router.post("/edit/coffee-machine/:id", (req, res) => {
  let data = require("./data/coffee_machines.json");
  const id = req.params.id;

  let product = data.filter((item) => item.id === id);

  if (product.length === 0) {
    res.send("Product not found!");
  } else {
    product = data.filter((item) => item.id === id)[0];

    const payload = new Object();

    payload.id = id;
    payload.name = req.body.product_name;
    payload.category = product.category;
    payload.image = product.image;
    payload.brochure = product.brochure;
    payload.description = req.body.description;
    payload.keyword = "coffee-machine";
    payload.specifications = {
      version: req.body.version,
      user_interface: req.body.user_interface,
      canisters: req.body.canisters,
      mixing_blows: req.body.mixing_blows,
      coffee_brewer: req.body.coffee_brewer,
      boilers: req.body.boilers,
      height: req.body.height,
      weight: req.body.weight,
      depth: req.body.depth,
      power_consumption: req.body.power_consumption,
      frequency: req.body.frequency,
      beans_capacity: req.body.beans_capacity,
      height_delivery_area: req.body.height_delivery_area,
    };

    if (req.files !== null && Object.hasOwn(req.files, "image") === true) {
      const image = req.files.image;

      image.mv(path.resolve("./public/assets/", image.name));
      fs.unlinkSync(path.resolve("./public/assets/", product.image));

      payload.image = image.name;
    }

    if (req.files !== null && Object.hasOwn(req.files, "brochure") === true) {
      const brochure = req.files.brochure;
      brochure.mv(path.resolve("./public/assets/", brochure.name));
      fs.unlinkSync(path.resolve("./public/assets/", product.brochure));

      payload.brochure = brochure.name;
    }

    const index = findIndexById(data, id);

    data.splice(index, 1);
    data.push(payload);

    save(path.resolve("./data/coffee_machines.json"), data);

    res.redirect(`/admin/coffee-machine/${id}?context=edit+success`);
  }
});

router.post("/edit/coffee-grinder/:id", (req, res) => {
  let data = require("./data/coffee_grinders.json");
  const id = req.params.id;

  let product = data.filter((item) => item.id === id);

  if (product.length === 0) {
    res.send("Product not found!");
  } else {
    product = data.filter((item) => item.id === id)[0];

    const payload = new Object();

    payload.id = id;
    payload.name = req.body.product_name;
    payload.image = product.image;
    payload.brochure = product.brochure;
    payload.description = req.body.description;
    payload.keyword = "coffee-grinder";
    payload.specifications = {
      version: req.body.version,
      user_interface: req.body.user_interface,
      canisters: req.body.canisters,
      mixing_blows: req.body.mixing_blows,
      height: req.body.height,
      weight: req.body.weight,
      depth: req.body.depth,
      power_consumption: req.body.power_consumption,
      beans_capacity: req.body.beans_capacity,
    };

    if (req.files !== null && Object.hasOwn(req.files, "image") === true) {
      const image = req.files.image;

      image.mv(path.resolve("./public/assets/", image.name));
      fs.unlinkSync(path.resolve("./public/assets/", product.image));

      payload.image = image.name;
    }

    if (req.files !== null && Object.hasOwn(req.files, "brochure") === true) {
      const brochure = req.files.brochure;
      brochure.mv(path.resolve("./public/assets/", brochure.name));
      fs.unlinkSync(path.resolve("./public/assets/", product.brochure));

      payload.brochure = brochure.name;
    }

    const index = findIndexById(data, id);

    data.splice(index, 1);
    data.push(payload);

    save(path.resolve("./data/coffee_grinders.json"), data);

    res.redirect(`/admin/coffee-grinder/${id}?context=edit+success`);
  }
});

router.post("/edit/product/:id", (req, res) => {
  let data = require("./data/others.json");
  const id = req.params.id;

  let product = data.filter((item) => item.id === id);

  if (product.length === 0) {
    res.send("Product not found!");
  } else {
    product = data.filter((item) => item.id === id)[0];

    const payload = new Object();

    payload.id = id;
    payload.name = req.body.product_name;
    payload.category = product.category;
    payload.image = product.image;
    payload.description = req.body.description;
    payload.keyword = "product";
    payload.specifications = {
      version: req.body.version,
      height: req.body.height,
      weight: req.body.weight,
      depth: req.body.depth,
      beans_capacity: req.body.beans_capacity,
    };

    if (req.files !== null && Object.hasOwn(req.files, "image") === true) {
      const image = req.files.image;

      image.mv(path.resolve("./public/assets/", image.name));
      fs.unlinkSync(path.resolve("./public/assets/", product.image));

      payload.image = image.name;
    }

    const index = findIndexById(data, id);

    data.splice(index, 1);
    data.push(payload);

    save(path.resolve("./data/others.json"), data);

    res.redirect(`/admin/product/${id}?context=edit+success`);
  }
});

module.exports = router;
