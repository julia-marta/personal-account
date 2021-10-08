import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Image, Button} from 'react-bootstrap';
import {logOut, clearState} from '../../store/slice';
import {AppRoute} from '../../const';

const Plug = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.authorizedUser);

  const handleLogOut = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(logOut());
      dispatch(clearState());
    }, [dispatch]
  )

  return (

    <Row className="plug">
      <Col className="plug__img">
        <Image src={`img/${user.avatar}`} roundedCircle />
      </Col>
      <Col className="plug__info">
        <p className="plug__greeting">You are logged as <span>{user.name}</span></p>
        <Button className="plug__button" variant="dark" href={AppRoute.CONTACTS}>Contacts</Button>
        <Button className="plug__button" variant="danger" onClick={handleLogOut}>Exit</Button>
      </Col>
    </Row>
  );
};

export default Plug;
