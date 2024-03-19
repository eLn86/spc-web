import PageWrapper from "../../components/PageWrapper";
import { Flex, Table } from "antd";

const TopScores = () => {
    const tableColumns = [
        { title: 'Word Submitted', dataIndex: 'word', key: 'word' },
        { title: 'Score Attained', dataIndex: 'score', key: 'score' }
    ];

    return (
        <PageWrapper>
            <Flex>Top 10 Scores</Flex>
            <Table data-testid='score-table' columns={tableColumns} />
        </PageWrapper>
    )
}

export default TopScores;