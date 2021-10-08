import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap';
import {setEditedCard, deleteContact} from "../../store/slice";

const ContactsEntry = ({contact, isDisabled}) => {

  const dispatch = useDispatch();
  const {id} = contact;

  const handleEditButton = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(setEditedCard(id));
    }, [dispatch, id]
  );

  const handleDeleteButton = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(deleteContact(id));
    }, [dispatch, id]
  );

  return (
    <Card className="contacts__item" as="li" style={{ width: '13rem' }}>
      <Card.Img variant="top" src={`img/${contact.avatar}`} />
      <Card.Body>
        <Card.Title>{contact.name}</Card.Title>
        <Card.Text><a className="contacts__link" href={`tel:${contact.phone}`}>{contact.phone}</a></Card.Text>
        <Card.Text><a className="contacts__link" href={`mailto:${contact.email}`}>{contact.email}</a></Card.Text>
        <Button variant="outline-dark" disabled={isDisabled} onClick={handleEditButton}>Edit</Button>
        <Button variant="outline-danger" disabled={isDisabled} onClick={handleDeleteButton}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

ContactsEntry.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  isDisabled: PropTypes.bool,
};

export default ContactsEntry;
