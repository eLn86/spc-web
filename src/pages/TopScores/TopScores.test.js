import { render, screen } from "@testing-library/react";
import TopScores from "./TopScores";
import '../../setupDomTests';
import { TABLE_ROLES } from "../../constants";

describe('TopScores Page UI', () => {
    test('renders header text', () => {
        render(<TopScores />);
        const headerText = screen.getByText(/top 10 scores/i);
        expect(headerText).toBeInTheDocument();
    });

    test('render table with Word and Score columns', () => {
        render(<TopScores />);
        const table = screen.getByTestId('score-table');
        expect(table).toBeInTheDocument();
        const headerCellWithWordText = screen.getByRole(TABLE_ROLES.COLUMN_HEADER, { name: 'Word Submitted' });
        const headerCellWithScoreText = screen.getByRole(TABLE_ROLES.COLUMN_HEADER, { name: 'Score Attained' });
        expect(headerCellWithWordText).toBeInTheDocument();
        expect(headerCellWithScoreText).toBeInTheDocument();
    })
})