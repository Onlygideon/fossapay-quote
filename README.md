# 🌍 FOSSAPAY Cross-Border Quote API

A real-time backend service that provides users with exchange rate quotes for converting **USDT (Tether)** to local fiat currencies (e.g., NGN, GBP, USD, KES, ZAR), including FX rates and applicable transaction fees.

Built with **NestJS**, **MySQL**, **Sequelize**, and **CoinGecko API** for accurate live rates.

## 🚀 Features

- 🔁 **Real-time FX Rates** from CoinGecko
- 💸 **Dynamic Fee Calculation** based on currency code
- 🧾 **Quote History** stored in MySQL (Admin-Only)
- 📦 **CSV Export** of last 50 quotes (Admin-only)
- 🔐 **Admin Authentication**
- ✅ **Jest Unit Tests** included

---

## 📦 Installation

```bash
git clone https://github.com/your-org/fossapay-quote-api.git

npm install
```

## Documentation

(https://documenter.getpostman.com/view/15715947/2sB34eHMhg) (Postman Documentation)

## Usage And Test

You can paste the temporary details below to your .env file to test locally

#### DB_HOST=crossover.proxy.rlwy.net

#### DB_PORT=38416

#### DB_USER=root

#### DB_PASS=jCDBvMzbMRvrhvmNZPzuedLSRbltLpxW

#### DB_NAME=railway

#### ADMIN_KEY=fossapay-admin-key
