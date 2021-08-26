# E-Commerce Website

Facilitating payments using the Stripe API

---

#### **Tech Stack**

| Database |    Backend     | Frontend           |
| -------- | :------------: | ------------------ |
| SQLite   | Flask (Python) | React (JavaScript) |

---

#### **Flask Backend**

| Routes        | HTTP Methods | Description                                   |
| ------------- | :----------: | --------------------------------------------- |
| /api/payment  |     POST     | Provides a client secret using the Stripe API |
| /api/products |     GET      | Provides a list of all the product objects    |
| /api/products |     POST     | Allows addition of products to the inventory  |

---

#### **Use**

Using Stripe to create an e-commerce website where people can purchase items.

Can be used as a template, to quickly deploy a website.

---

#### **Running It**

Frontend

```
npm install // To install the node modules
npm start   // To start the application
```

Backend

```
export FLASK_APP=server
flask run
```
