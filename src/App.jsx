import './App.css';
import { Layout, Flex } from 'antd';
import Main from "./Main/Main";

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
          <div className="stars">
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
          </div>
          <Flex wrap="wrap">
              <Layout style={layoutStyle}>
                  <Header style={headerStyle}>Scrabble Points Calculator Deluxe</Header>
                  <Content style={contentStyle}>
                      <Main/>
                  </Content>
                  <Footer style={footerStyle}>Cognizant Gobiz Technical Challenge March 2024</Footer>
              </Layout>
          </Flex>
      </>
  );
}

export default App;
