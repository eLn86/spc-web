import { Button, Card, Flex, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { checkIfValidWord } from "../apis/dictionaryAPI";
import { ALPHABET_SCORE_MAP, HTTPSTATUS } from "../constants";

const { Text } = Typography;

const Main = () => {
    const [value, setValue] = useState('');
    const [isInvalidWord, setIsInvalidWord] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            // Send Axios request here
            if ((value && value.length <= 10)) {
                const response = await checkIfValidWord(value);
                const { status } = response;
                if (status === HTTPSTATUS.NOTFOUND) {
                    setIsInvalidWord(true);
                    setScore(0);
                } else {
                    setIsInvalidWord(false);
                    setScore(calculateScore(value));
                }
            } else {
                setIsInvalidWord(false);
                setScore(0);
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [value])

    const calculateScore = word => {
        if (!word) return 0;
        return word.split('').reduce((acc, letter) => acc + ALPHABET_SCORE_MAP[letter.toUpperCase()], 0);
    }

    const containerStyle = {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '800px',
        width: '100%'
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
        <Flex style={containerStyle}>
            <Flex style={tilesWrapperStyle}>
                <Input
                    value={value}
                    maxLength={10}
                    style={isInvalidWord ? inputErrorStyle : inputStyle}
                    placeholder={'Type a word'}
                    onChange={e => setValue(e.target.value)}
                    data-testid='input-field'
                />
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
                        setIsInvalidWord(false);
                    }}
                    data-testid='reset-tiles-btn'
                    type="primary"
                    size={'large'}>
                    Reset Tiles
                </Button>
                <Button data-testid='save-button' type="primary" size={'large'}>Save Score</Button>
                <Button data-testid='view-topscores-button' type="primary" size={'large'}>View Top Scores</Button>
            </Flex>
        </Flex>
    )
}

export default Main;