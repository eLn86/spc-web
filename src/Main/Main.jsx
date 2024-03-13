import { Button, Flex } from "antd";

const Main = () => {
    const containerStyle = {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
    return (
        <Flex style={containerStyle}>
            <Flex>

            </Flex>
            <Flex>Score: </Flex>
            <Flex gap={'large'}>
                <Button data-testid='reset-button' type="primary" size={'large'}>Reset Tiles</Button>
                <Button data-testid='save-button' type="primary" size={'large'}>Save Score</Button>
                <Button data-testid='view-topscores-button' type="primary" size={'large'}>View Top Scores</Button>
            </Flex>
        </Flex>
    )
}

export default Main;