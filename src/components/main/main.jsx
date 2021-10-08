import React from 'react';
import {useSelector} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import Header from '../header/header';
import Footer from '../footer/footer';
import Plug from '../plug/plug';
import Login from '../login/login';

const Main = () => {

  const isPlug = useSelector((state) => state.isPlug);

  return (
    <Container>
      <Header isMain={true} />
      <main className="main">
        <h1 className="visually-hidden">Личный кабинет: требуется авторизация</h1>
        <Row>
          <Col>
            {isPlug ? <Plug /> : <Login />}
          </Col>
        </Row>
      </main>
      <Footer />
    </Container>
  );
};

export default Main;
