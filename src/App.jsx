import './App.css';
import { Flex, Layout } from 'antd';
import Main from "./pages/Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import TopScores from "./pages/TopScores/TopScores";

const { Header, Footer, Content } = Layout;
const App = () => {
    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        lineHeight: '64px',
        backgroundColor: '#4096ff',
        fontFamily: 'Verdana',
        fontSize: '30px'
    };

    const contentStyle = {
        textAlign: 'center',
        height: 'auto',
        width: '100%',
        lineHeight: '120px',
        position: 'absolute',
        top: '64px',
        bottom: 0
    };

    const footerStyle = {
        textAlign: 'center',
        height: 64,
        color: '#fff',
        backgroundColor: '#000000',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    };

    const layoutStyle = {
        borderRadius: 8,
        overflow: 'hidden',
        width: '100%',
        height: '100%'
    };
    return (
        <>
            <Flex wrap="wrap">
                <Layout style={layoutStyle}>
                    <Header style={headerStyle}>Scrabble Points Calculator Deluxe</Header>
                    <Content style={contentStyle}>
                        <Router>
                            <Routes>
                                <Route path='/' element={<Main/>}/>
                                <Route path='/top-scores' element={<TopScores/>}/>
                            </Routes>
                        </Router>
                    </Content>
                    <Footer style={footerStyle}>Cognizant Gobiz Technical Challenge March 2024</Footer>
                </Layout>
            </Flex>
        </>
    );
}

export default App;
