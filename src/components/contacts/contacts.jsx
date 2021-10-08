import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Form, FormControl, Button, Spinner} from 'react-bootstrap';
import {PersonLinesFill} from 'react-bootstrap-icons';
import {getContacts, setPlug, search} from "../../store/slice";
import Header from '../header/header';
import Footer from '../footer/footer';
import ContactsCard from '../contacts-card/contacts-card';
import ContactsForm from '../contacts-form/contacts-form';

const Contacts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getContacts());
      dispatch(setPlug());
      }, [dispatch]);

    const contactsData = useSelector((state) => state.contactsData);
    const editedCard = useSelector((state) => state.editedCard);
    const isLoading = useSelector((state) => state.isLoading);

    const [query, setQuery] = useState('');

    const handleChangeSearch = useCallback(
      (evt) => {
        setQuery(evt.target.value);
      }, []
    )

    const handleSearchButton = useCallback(
      (evt) => {
        evt.preventDefault();
        dispatch(search(query))
      }, [dispatch, query]
    );

    const handleClearButton = useCallback(
      (evt) => {
        evt.preventDefault();
        setQuery('');
        dispatch(getContacts());
      }, [dispatch]
    );

    return (
        <Container>
          <Header />
          <section className="contacts">
            <div className="contacts__wrapper">
            <h2 className="contacts__title"><PersonLinesFill /> <span>Contacts</span></h2>
            <Form className="d-flex">
              <FormControl type="search" placeholder="Name, email or phone number" className="mr-2" aria-label="Search" value={query} onChange={handleChangeSearch} />
              <Button variant="outline-dark" onClick={handleSearchButton}>Search</Button>
              <Button variant="outline-danger" onClick={handleClearButton}>Clear</Button>
            </Form>
            {isLoading ?
            <Spinner animation="border" variant="dark" /> :
            <ul className="contacts__list">
              {contactsData.map((contact) => (
                <ContactsCard key ={contact.id} contact={contact} />
              ))}
              <ContactsForm isDisabled={editedCard !== 0} />
            </ul>
          }
            </div>
          </section>
          <Footer />
        </Container>
      );
};

export default Contacts;
