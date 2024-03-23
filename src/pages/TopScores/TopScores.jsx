import PageWrapper from "../../components/PageWrapper";
import { Flex, Table } from "antd";
import { useEffect, useState } from "react";
import { getTopTenScores } from "../../apis/scoresAPI";

const TopScores = () => {
    const [scores, setScores] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getTopTenScores();
            const { data: { scores: topTenScores } } = response;
            if (topTenScores.length === 0) {
                setScores(null);
            } else {
                setScores(topTenScores);
            }
        })();
    }, [])
    const tableColumns = [
        { title: 'Word Submitted', dataIndex: 'word', key: 'word' },
        { title: 'Score Attained', dataIndex: 'score', key: 'score' }
    ];

    const computeAndRenderTableData = () => {
        const emptySlots = scores ? 10 - scores.length : 10
        return scores ? [
            ...scores.sort((a, b) => b.score - a.score).map((data, index) => ({
                key: `${index + 1}`,
                word: data.word,
                score: data.score
            })),
            ...Array.from({ length: emptySlots }).map((_, index) => ({
                key: `${scores.length + index + 1}`,
                word: 'This slot has yet to be filled!',
                score: '-'
            }))
        ] : [...Array.from({ length: emptySlots }).map((_, index) => ({
            key: `${index + 1}`,
            word: 'This slot has yet to be filled!',
            score: '-'
        }))]
    }

    return (
        <PageWrapper>
            <Flex data-testid='top-scores-title'>Top 10 Scores</Flex>
            <Table
                data-testid='score-table'
                columns={tableColumns}
                dataSource={computeAndRenderTableData()}
                pagination={false}
            />
        </PageWrapper>
    )
}

export default TopScores;