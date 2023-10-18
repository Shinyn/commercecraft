This is a CMS for managing your store's database.
You can add products and sort them into your own chosen color, category and size, aswell as add a description, price, manufacturer etc. You can of course delete and edit them aswell as your colors, categories and sizes.
There's also a tab for seeing your Orders, and printing a Delivery note. When a customer orders from you, you also get their customer information into it's own tab, where you can choose to send them an email.

## Getting Started

### Installation

#### Repo

You can clone the repo from github to get all the repositories files easily from githubs page.

#### .env

You need to have a .env in your rootfile to be able to run the program. Create a file and name it `.env `, then add the following parameters:

```
DATABASE_URL= *You will fill this in later*
NEXT_PUBLIC_BACKEND_URL= *Here you'll fill in your url for your project, in this case localhost is sufficent*
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = *You will fill this in later*
CLERK_SECRET_KEY = *You will fill this in later*
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

#### Node packages

Install all the nodepackages:

```bash
npm i
```

#### Clerk Authentication

To be able to use this CMS you need to create an account on Clerk: [https://dashboard.clerk.com/sign-in](https://dashboard.clerk.com/sign-in). Start a new application, and then manage your way to _API Keys_ to find your important keys.

Add your NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to your .env file.

#### Prisma Database

To be able to use this CMS you need to create an account on planetscale: [https://auth.planetscale.com/sign-up](https://auth.planetscale.com/sign-up). There you need to add a new Database. Choose Prisma as your framework, and create a password in the browser. Don't forget to write down your password somewhere safe!<br>
This will generate a DATABASE_URL that you can copy and paste into your .env .
The initialization and model however comes with the repo.

To pull down the latest schema from Prisma's Database:

```bash
npx prisma db pull
```

and then to generate the new prisma client:

```bash
npx prisma generate
```

if you want to add to the schema you need to run the commando

```bash
npx prisma db push
```

### To run the program on your localhost:

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Folderstructure

### app

This folder contains:

- The _authentication folder_ where clerk's sign-in and sign-up route is situated.
- Then we have the _dashboard folder_ where all the different pages have their folders. They are situated in a _storeID folder_, so each store has it's own data-connection.
- Lastely we have the _api folder_ where all the backend-routes are.<br>
  -- The _stores folder_ contains the endpoints for creating, managing and deleting a store after logging in via Clerk.
  -- The folders under _storeID_ matches each page and contains the endponts for creating, managing and deleting data related to each page. <br>
  --- The _checkout folder_ is and endpoint to _POST_ your Orders too when checking out of the store you will be building.<br>
  --- The _order_items folder_ is and endpoint to _GET_ all of the items that are related to your specific order.

_Each of theese API-keys are broadcasted on each specific site on your browser when running the npm run dev_

### components

This folder contains:

- Globally used components are straight into the _components folder_.
- Inside the _ui_ folders are shadcn_ui components that are used globally.
- Inside the _stores folder_ are components that are used for the front page of when you log in.
- Inside the _dashboard folder_ are components that are used to each page. <br>
  -- The _api-list folder_ is a component for all the api-keys that are broadcasted on each page.

_With *components* we mean both functions, states aswell as HTML-components._

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
