```markdown
# Stripe Payment Integration API

This is a simple Node.js Express API that integrates with Stripe to handle payments. It provides an endpoint to create a payment intent.

## Prerequisites

- [Node.js](https://nodejs.org/) (v12.x or later)
- [npm](https://www.npmjs.com/get-npm) (v6.x or later)
- [Stripe Account](https://stripe.com)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install dependencies

Run the following command to install the required npm packages:

```bash
npm install
```

### 3. Set up Stripe API keys

- Replace the following keys in `index.js`:
  - `sk_test_51HxFijD844Bjnaxyr8AdaZCQ4UlsChPfyNLgB8VXrAFSCrRxLQRYvsYGrxWmtMX9YvOPCr3kDi5275uHX4gsdAQj00W1QVH7RC` with your **Stripe secret key**.
  - `pk_test_qblFNYngBkEdjEZ16jxxoWSM` with your **Stripe publishable key**.

### 4. Run the server

Start the server by running:

```bash
npm start
```

By default, the server will run on port `6000`.

### 5. API Endpoints

#### Health Check

- **Method**: `GET`
- **Endpoint**: `/`
- **Description**: Returns "Hello world" to verify the server is running.

#### Create Payment Intent

- **Method**: `POST`
- **Endpoint**: `/create-payment-intent`
- **Description**: Creates a payment intent using Stripe.
- **Request Body**:
  - `amount`: The amount to charge (in USD).
- **Response**: Returns `paymentIntent`, `ephemeralKey`, `customer`, and `publishableKey`.

#### Example Request:

```bash
POST /create-payment-intent
Content-Type: application/json
{
  "amount": 50
}
```

### 6. Environment Variables (Optional)

You can use a `.env` file to manage your environment variables. Create a `.env` file and add your configuration:

```bash
STRIPE_SECRET_KEY=your_secret_key
STRIPE_PUBLISHABLE_KEY=your_publishable_key
PORT=6000
```

### 7. CORS Setup

This API has CORS enabled with the following settings:

- Allows all origins (`*`).
- Allows the following methods: `OPTIONS, GET, POST, PUT, PATCH, DELETE`.
- Allows the following headers: `Content-Type, Authorization`.

## License

This project is open-source and available under the [MIT License](./LICENSE).
```