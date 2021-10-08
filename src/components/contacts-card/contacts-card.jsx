import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ContactsEntry from '../contacts-entry/contacts-entry';
import ContactsForm from '../contacts-form/contacts-form';

const ContactsCard = ({contact}) => {

    const editedCard = useSelector((state) => state.editedCard);

    return (
      <>
        {editedCard === contact.id ?
        <ContactsForm contact={contact} /> :
        <ContactsEntry contact={contact} isDisabled={editedCard !== 0 && editedCard !== contact.id} /> }
      </>
    );
};

ContactsCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
};

export default ContactsCard;
