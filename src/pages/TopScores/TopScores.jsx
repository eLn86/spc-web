import PageWrapper from "../../components/PageWrapper";
import { Button, Flex, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getTopTenScores } from "../../apis/scoresAPI";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const TopScores = () => {
    const navigate = useNavigate();
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
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            render: (text) => <Text style={rankStyle}>{text}</Text>
        },
        {
            title: 'Word Submitted',
            dataIndex: 'word',
            key: 'word',
            render: (text) => <Text style={wordStyle}>{text}</Text>
        },
        {
            title: 'Score Attained',
            dataIndex: 'score',
            key: 'score',
            render: (text) => <Text style={scoreStyle}>{text}</Text>
        }
    ];

    const computeAndRenderTableData = () => {
        const emptySlots = scores ? 10 - scores.length : 10
        return scores ? [
            ...scores.sort((a, b) => b.score - a.score).map((data, index) => ({
                key: `${index + 1}`,
                rank: `${index + 1}`,
                word: data.word,
                score: data.score
            })),
            ...Array.from({ length: emptySlots }).map((_, index) => ({
                key: `${scores.length + index + 1}`,
                rank: `${scores.length + index + 1}`,
                word: 'This slot has yet to be filled!',
                score: '-'
            }))
        ] : [...Array.from({ length: emptySlots }).map((_, index) => ({
            key: `${index + 1}`,
            rank: `${index + 1}`,
            word: 'This slot has yet to be filled!',
            score: '-'
        }))]
    }

    const rankStyle = {
        fontFamily: 'Comic Sans MS',
        fontSize: '14px',
        fontWeight: 'bolder'
    }

    const wordStyle = {
        fontFamily: 'Comic Sans MS',
        fontSize: '14px',
        fontWeight: 'bolder',
        color: 'brown',
        textTransform: 'uppercase'
    }

    const scoreStyle = {
        fontFamily: 'Comic Sans MS',
        fontSize: '18px',
        fontWeight: 'bolder'
    }

    const titleWrapperStyle = {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
    }

    const homeTextWrapperStyle = {
        width: '120px',
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer'
    }

    const backHomeTextStyle = {
        display: 'flex',
        alignItems: 'center'
    }

    const topTenScoresTextStyle = {
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Comic Sans MS',
        fontSize: '24px',
        fontWeight: 'bolder'
    }

    const tableStyle = {
        width: '80%',
        border: '3px solid grey'
    }
    return (
        <PageWrapper>
            <Flex data-testid='top-scores-title' style={titleWrapperStyle}>
                <Text style={topTenScoresTextStyle}>Top 10 Scores</Text>
                <Flex style={homeTextWrapperStyle}>
                    <Button type="default" data-testid='back-to-home-btn' icon={<LeftOutlined/>}
                            onClick={() => navigate('/')}>
                        Back to Home
                    </Button>
                </Flex>
            </Flex>
            <Table
                style={tableStyle}
                data-testid='score-table'
                columns={tableColumns}
                dataSource={computeAndRenderTableData()}
                pagination={false}
            />
        </PageWrapper>
    )
}

export default TopScores;