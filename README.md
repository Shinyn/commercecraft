This is a CMS for managing your store's database.
You can add products and sort them into your own chosen color, category and size, as well as add a description, price, manufacturer etc. You can of course delete and edit them as well as your colors, categories and sizes.
There's also a tab for seeing your Orders, and printing a Delivery note. When a customer orders from you, you also get their customer information into it's own tab, where you can choose to send them an email.

## Getting Started

### Installation

#### Repo

You can clone the repo from github to get all the repositories files easily from githubs page.

#### .env

You need to have a .env file in your root folder to be able to run the program. Create a file and name it `.env `, then add the following parameters:

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

Install all the node packages:

```bash
npm i
```

#### Clerk Authentication

To be able to use this CMS you need to create an account on Clerk: [https://dashboard.clerk.com/sign-in](https://dashboard.clerk.com/sign-in). Start a new application, and then manage your way to _API Keys_ to find your important keys.

Add your NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to your .env file.

#### Prisma Database

To be able to use this CMS you need to create an account on planetscale: [https://auth.planetscale.com/sign-up](https://auth.planetscale.com/sign-up).<br>

- Create a new database in your PlanetScale dashboard. <br>
- Choose Prisma as your framework, and remember to **save your generated password** somewhere safe!<br>
- You will receive a DATABASE_URL (in which you paste the database username and password) that you can copy and paste into your .env. <br>
  The initialization and models however come with the repo, you do not need to create these yourself.

To pull down the latest schema from Prisma's Database:

```bash
npx prisma db pull
```

and then to generate the new prisma client:

```bash
npx prisma generate
```

If you want to change anything or add to the schema you need to push these changes to the database by running this command afterwards:

```bash
npx prisma db push
```

### To run the program locally:

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

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Folder structure

### app

This folder contains:

- The _authentication folder_ where clerk's sign-in and sign-up route is situated.
- The _dashboard folder_ where all the different pages have their folders. They are situated in a _storeID folder_, so each store has its own data connection.
- The _api folder_ where all the backend routes are:<br>
  - The _stores folder_ contains the endpoints for creating, managing and deleting a store after logging in via Clerk. <br>
  - The folders under _storeID_ matches each page and contains the endponts for creating, managing and deleting data related to each page. <br>
    - The _checkout folder_ is and endpoint to _POST_ your Orders too when checking out of the store you will be building.<br>
    - The _order_items folder_ is and endpoint to _GET_ all of the items that are related to your specific order.

_Each of theese API-keys are broadcasted on each specific site on your browser when running the **npm run dev** command_

### components

This folder contains:

- Globally used components (are straight into the root _components folder_).
- The _ui_ folder (for shadcn_ui components that are used globally).
- The _stores folder_ (for components that are used for the front page of when you log in).
- The _dashboard folder_ inside _stores_ (for components that are used to each page). <br>
  - The _api-list folder_ holds a component for all the api-keys that are broadcasted on each page.

_With *components* we mean both functions, states as well as HTML-components._

### Naming conventions

Please use the following naming conventions in this repository to avoid confusion and optimize readability: <br>

- **Component names:** PascalCase <br>
- **File names:** kebab-case <br>
- **Routes:** kebab-case <br>

### Tailwind

This project is designed using Tailwind CSS.
Visit their website to find all their utilities.
[https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)

You may also add custom styles in your globals.css file. Learn how to manage this here:
[https://tailwindcss.com/docs/adding-custom-styles](https://tailwindcss.com/docs/adding-custom-styles)

### Testing

Regression testing has been made throughout development of this project.<br>
Formal testing has been made using Jira/Xray.<br>
Use the following result guide as needed:

#### RESULT | Explanation

**PASS** : Test case approved<br>
**FAIL** : Test case not approved<br>
**ABORTED** : Test case could not be carried through<br>
**TODO** : Test case to execute<br>
**EXECUTING** : Test case ongoing<br>
**CRITICAL** : Critical bug - fatal for the entire system performance<br>
**MAJOR** : Bug affects parts of system and webshop functionality - ought to be fixed<br>
**MINOR** : Bug affects only small part of the system - disturbing but no priority<br>
**ENHANCEMENT** : Improvement suggestions for increased functionality and user experience<br>
**INVESTIGATE** : Seriousness of deviation cannot be assessed due to uncertainty regarding constitution of expected result

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
