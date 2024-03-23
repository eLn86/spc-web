import { Button, Card, Flex, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { checkIfValidWord } from "../../apis/dictionaryAPI";
import { ALPHABET_SCORE_MAP, API_ERRORS, HTTPSTATUS, LABELS } from "../../constants";
import PageWrapper from "../../components/PageWrapper";
import { saveScore } from "../../apis/scoresAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const { Text } = Typography;

const Main = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState('');
    const [isScoreSaved, setIsScoreSaved] = useState(false);
    const [isInvalidWord, setIsInvalidWord] = useState(false);
    const [showWordExistsError, setShowWordExistsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaveScoresLoading, setIsSaveScoresLoading] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            // Send Axios request here
            if (value) {
                if (value.length <= 10) {
                    setIsLoading(true);
                    const response = await checkIfValidWord(value);
                    setIsLoading(false);
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

    const scoreAvailableTextStyle = {
        fontSize: '24px',
        margin: '20px 0px',
        fontWeight: 'bold',
        color: '#967BB6'
    }

    const scoreUnavailableTextStyle = {
        fontSize: '24px',
        margin: '20px 0px',
        fontWeight: 'bold',
        color: '#000000'
    }

    // Handler functions
    const handleResetOnClick = () => {
        setValue('');
        setScore(0);
        setIsScoreSaved(false);
        setIsInvalidWord(false);
        setShowWordExistsError(false);
    }

    const handleSaveOnClick = async () => {
        if (value && !isInvalidWord) {
            const score = calculateScore(value);
            try {
                setIsSaveScoresLoading(true);
                await saveScore({ word: value, score })
                setIsSaveScoresLoading(false);
                setIsScoreSaved(true);
                setTimeout(() => setIsScoreSaved(false), 3000);
            } catch (e) {
                setIsSaveScoresLoading(false);
                const { response: { status, data: {error: errorMessage }}} = e;
                console.log('error when calling save score api: ', e);
                if (status === HTTPSTATUS.CONFLICT && errorMessage === API_ERRORS.WORD_EXISTS) {
                    setShowWordExistsError(true);
                }
            }
        }
    }

    // Render functions
    const renderCards = () => Array(10).fill().map((_, index) => (
        <Card style={cardStyle} key={index} data-testid='tile'>
            {value && value.charAt(index).toUpperCase()}
        </Card>
    ))

    return (
        <PageWrapper>
            {isLoading && <Loader/>}
            <Flex style={welcomeMessageStyle} data-testid='welcome-text'>
                {LABELS.WELCOME_TEXT}
            </Flex>
            <Flex style={tilesWrapperStyle}>
                <Input
                    value={value}
                    maxLength={10}
                    style={isInvalidWord ? inputErrorStyle : inputStyle}
                    placeholder={LABELS.WORD_INPUT_PLACEHOLDER_TEXT}
                    onChange={e => {
                        setShowWordExistsError(false);
                        !isLoading && setValue(e.target.value)
                    }}
                    data-testid='input-field'
                />
                <Text type={'success'} style={scoreSavedTextStyle} data-testid='score-saved'>
                    {isScoreSaved && LABELS.SCORE_SAVED_TEXT}
                </Text>
                <Text type={'danger'} style={invalidWordTextStyle} data-testid='invalid-word-error-text'>
                    {isInvalidWord && LABELS.WORD_INVALID_TEXT}
                    {showWordExistsError && LABELS.WORD_ALREADY_EXISTS_TEXT}
                </Text>
                <Flex gap={'small'}>
                    {renderCards()}
                </Flex>
            </Flex>

            <Flex data-testid={'score'}>
                <Text
                    style={score
                        ? scoreAvailableTextStyle
                        : scoreUnavailableTextStyle}
                >
                    Score: {score && score || 'N/A'}
                </Text>
            </Flex>
            <Flex gap={'large'}>
                <Button
                    onClick={handleResetOnClick}
                    data-testid='reset-tiles-btn'
                    type="primary"
                    size={'large'}>
                    Reset Tiles
                </Button>
                <Button data-testid='save-btn' type="primary" size={'large'} loading={isSaveScoresLoading}
                        onClick={handleSaveOnClick}>Save
                    Score</Button>
                <Button data-testid='view-top-scores-btn' type="primary" size={'large'}
                        onClick={() => navigate('/top-scores')}>View Top Scores</Button>
            </Flex>
        </PageWrapper>
    )
}

export default Main;