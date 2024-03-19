import { Flex } from "antd";

const PageWrapper = props => {
    const containerStyle = {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '800px',
        width: '100%'
    }
    return (
        <Flex style={containerStyle}>{props.children}</Flex>
    )
}

export default PageWrapper;