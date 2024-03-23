import { Button, Card, Flex, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { checkIfValidWord } from "../../apis/dictionaryAPI";
import { ALPHABET_SCORE_MAP, HTTPSTATUS } from "../../constants";
import PageWrapper from "../../components/PageWrapper";
import { saveScore } from "../../apis/scoresAPI";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const Main = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState('');
    const [isScoreSaved, setIsScoreSaved] = useState(false);
    const [isInvalidWord, setIsInvalidWord] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            // Send Axios request here
            if (value) {
                if (value.length <= 10) {
                    const response = await checkIfValidWord(value);
                    const { status } = response;
                    if (status === HTTPSTATUS.NOTFOUND) {
                        setIsInvalidWord(true);
                        setScore(0);
                    } else {
                        setIsInvalidWord(false);
                        setScore(calculateScore(value));
                    }
                }
            } else {
                setIsInvalidWord(false);
                setScore(0);
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn);
    }, [value])

    const calculateScore = word => word.split('').reduce(
        (acc, letter) => acc + ALPHABET_SCORE_MAP[letter.toUpperCase()], 0);

    const welcomeMessageStyle = {
        fontFamily: 'Comic Sans MS',
        fontSize: '24px',
        fontWeight: 'bolder'
    }
    const tilesWrapperStyle = {
        flexDirection: 'column',
        alignItems: 'center',
    }
    const inputStyle = {
        marginBottom: '10px',
        height: '50px'
    }
    const inputErrorStyle = {
        marginBottom: '10px',
        height: '50px',
        border: '1px solid red'
    }
    const scoreSavedTextStyle = {
        height: '30px',
        textAlign: 'left',
        width: '100%',
        fontSize: '18px'
    }
    const invalidWordTextStyle = {
        height: '30px',
        textAlign: 'left',
        width: '100%'
    }
    const cardStyle = {
        width: '50px',
        height: '50px',
        border: '2px solid black',
        fontFamily: 'Verdana',
        fontWeight: 'bolder',
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const scoreTextStyle = {
        fontSize: '24px',
        margin: '20px 0px',
        fontWeight: 'bold',
        color: '#967BB6'
    }

    return (
        <PageWrapper>
            <Flex style={welcomeMessageStyle}>Welcome! Please type a word in the field below to begin!</Flex>
            <Flex style={tilesWrapperStyle}>
                <Input
                    value={value}
                    maxLength={10}
                    style={isInvalidWord ? inputErrorStyle : inputStyle}
                    placeholder={'Score will only be computed when you type a valid word'}
                    onChange={e => setValue(e.target.value)}
                    data-testid='input-field'
                />
                <Text type={'success'} style={scoreSavedTextStyle} data-testid='score-saved'>
                    {isScoreSaved && `Your score has been saved!`}
                </Text>
                <Text type={'danger'} style={invalidWordTextStyle} data-testid='invalid-word-error-text'>
                    {isInvalidWord && `The word you typed is invalid, please try another word!`}
                </Text>
                <Flex gap={'small'}>
                    {Array(10).fill().map((_, index) => (
                        <Card style={cardStyle} key={index} data-testid='tile'>
                            {value && value.charAt(index).toUpperCase()}
                        </Card>
                    ))}
                </Flex>
            </Flex>

            <Flex data-testid={'score'}>
                <Text style={scoreTextStyle}>Score: {score && score || 'N/A'}</Text>
            </Flex>
            <Flex gap={'large'}>
                <Button
                    onClick={() => {
                        setValue('');
                        setScore(0);
                        setIsScoreSaved(false);
                        setIsInvalidWord(false);
                    }}
                    data-testid='reset-tiles-btn'
                    type="primary"
                    size={'large'}>
                    Reset Tiles
                </Button>
                <Button data-testid='save-btn' type="primary" size={'large'} onClick={async () => {
                    if (value && !isInvalidWord) {
                        const score = calculateScore(value);
                        try {
                            await saveScore({ word: value, score })
                            setIsScoreSaved(true);
                            setTimeout(() => setIsScoreSaved(false), 3000);
                        } catch (e) {
                            console.log('error when calling save score api: ', e);
                        }
                    }
                }}>Save Score</Button>
                <Button data-testid='view-top-scores-btn' type="primary" size={'large'}
                        onClick={() => navigate('/top-scores')}>View Top Scores</Button>
            </Flex>
        </PageWrapper>
    )
}

export default Main;