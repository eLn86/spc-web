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
- Save your score
- Reset tiles
- View top 10 scores
- Validate if your word is an English word and if it is not, score is not calculated
- If your word scores in the top ten, you will see a banner that informs you that your word has scored in the top ten and advises you to save

## Getting Started

Please adhere to the package versions below (Prerequisites) to avoid any issues with installation.

### Prerequisites

- Node.js v19.0.0
- npm v8.19.2
- yarn 4.1.1 (with corepack enabled)

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

## Running Tests
I am using Jest for unit tests. You can run the tests via the following command:

```bash
yarn test
```

## Built With
- React JS
- Axios for API calls
- Create React App for bootstrapping
- Ant Design for UI
- Free dictionary API (https://dictionaryapi.dev/)