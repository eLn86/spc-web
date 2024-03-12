# Scrabble Points Calculator React Frontend Application
This is an application which helps to calculate how many points a word (up to 10 chars) in scrabble would score.
I am using the **TDD (Test Driven Development)** approach to build this application as much as possible within the allotted time, 
simply put writing tests before writing the implementation code and refactoring the code in the process.
Read more [here](https://martinfowler.com/bliki/TestDrivenDevelopment.html).

I will also be using **TBD (Trunk Based Development)** where I keep commits small and push directly to the main branch.
Read more [here](https://trunkbaseddevelopment.com/).

## Features

- Enter any English word from 1-10 characters
- Get scrabble score based on word entered
- Save score
- Reset tiles
- View top 10 scores
- Validate if your word is an English word

## Getting Started

Please adhere to the package versions below (Prerequisites) to avoid any issues with installation.

### Prerequisites

- Node.js v19.0.0
- npm v8.19.2
- yarn 4.1.1 (with corepack enabled)
- React v18.2.0

### Installation

1. Clone the repository:

```bash
git clone https://github.com/eLn86/spc-backend.git
```
2. Navigate to the project directory:
```bash
cd spc-web
```
3. Install dependencies:
```bash
yarn install
```
4. Start the development server:
```bash
yarn start
```
The application should now be running on http://localhost:3000.

# Running the tests
I am using Jest for unit tests. You can run the tests via the following command:

```bash
yarn test
```

# Built With
- React - The web framework used
- Create React App - Used to bootstrap the development
- Ant Design - UI framework for React components