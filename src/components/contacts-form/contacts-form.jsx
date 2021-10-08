import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, Form, Button} from 'react-bootstrap';
import InputMask from 'react-input-mask';
import {setEditedCard, editContact, addContact} from '../../store/slice';
import {getRandomAvatar} from '../../utils';
import {defaultFormData, PHOTOS} from '../../const';

const ContactsForm = ({contact, isDisabled}) => {

  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [newContact, setNewContact] = useState(defaultFormData);

  useEffect(() => {
      if (contact) {
        setNewContact({name: contact.name, phone: contact.phone, email: contact.email, avatar: contact.avatar});
      }
    }, [contact]
  );

  const clearForm = useCallback(
    () => {
      dispatch(setEditedCard(0));
      setValidated(false);
      setNewContact(defaultFormData);
    }, [dispatch]
  )

  const handleChangeInput = useCallback(
    (evt) => {
      setNewContact({...newContact, [evt.target.name]: evt.target.value});
    }, [newContact]
  )

  const handleSubmit = useCallback(
    (evt) => {
      const form = evt.currentTarget;
      if (form.checkValidity() === false) {
        evt.preventDefault();
        evt.stopPropagation();
      } else {
        if (contact) {
          evt.preventDefault();
          dispatch(editContact({id: contact.id, data: newContact}));
          clearForm();
          return;
        } else {
          evt.preventDefault();
          const data = {...newContact, avatar: getRandomAvatar(PHOTOS)}
          dispatch(addContact(data));
          clearForm();
          return;
        }
      }
      setValidated(true);
    }, [clearForm, contact, dispatch, newContact]
  );

  const handleCancelButton = useCallback(
    (evt) => {
      evt.preventDefault();
      clearForm();
    }, [clearForm]
  );

  return (
    <Card className="contacts__item" as="li" style={{ width: '13rem' }} bg="light">
      <Card.Img variant="top" src={`img/${newContact.avatar}`} />
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Card.Title>
            <Form.Control plaintext required name="name" type="text" placeholder="Add name" value={newContact.name} onChange={handleChangeInput} />
            <Form.Control.Feedback type="invalid">Please add name.</Form.Control.Feedback>
          </Card.Title>
          <Card.Text as="div">
            <Form.Control as={InputMask} plaintext required name="phone" type="text" placeholder="Add phone" mask="+7-(999)-999-99-99" value={newContact.phone} onChange={handleChangeInput}  />
            <Form.Control.Feedback type="invalid">Please add phone.</Form.Control.Feedback>
          </Card.Text>
          <Card.Text as="div">
            <Form.Control plaintext required name="email" type="email" placeholder="Add e-mail" value={newContact.email} onChange={handleChangeInput}/>
            <Form.Control.Feedback type="invalid">Please add e-mail.</Form.Control.Feedback>
          </Card.Text>
          <Button variant="outline-primary" type="submit" disabled={isDisabled}>Save</Button>
          <Button variant="outline-danger" onClick={handleCancelButton} disabled={isDisabled}>Cancel</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

ContactsForm.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  isDisabled: PropTypes.bool,
};

export default ContactsForm;
