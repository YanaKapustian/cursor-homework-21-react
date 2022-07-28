import React, { useState, useRef, useEffect } from 'react';
import './Contacts.scss'
import Contact from './Contact';

const Contacts = () => {
    const contactsInitial = [{
        firstName: "Барней",
        lastName: "Стинсовський",
        phone: "+380956319521",
        gender: "male"
    }, {
        firstName: "Робін",
        lastName: "Щербатська",
        phone: "+380931460123",
        gender: "female"
    }, {
        firstName: "Анонімний",
        lastName: "Анонімус",
        phone: "+380666666666",
        gender: "not-mentioned"
    }, {
        firstName: "Лілія",
        lastName: "Олдровна",
        phone: "+380504691254",
        gender: "female"
    }, {
        firstName: "Маршен",
        lastName: "Еріксонян",
        phone: "+380739432123",
        gender: "male"
    }, {
        firstName: "Теодор",
        lastName: "Мотсбес",
        phone: "+380956319521",
        gender: "male"
    }];
    const [contacts] = useState(contactsInitial)
    let [filteredContacts, setFilteredContacts] = useState([])
    let [searchValue, setSearchValue] = useState('')

    const refMale = useRef(null);
    const refFemale = useRef(null);
    const refNotMentioned = useRef(null);
    
    const handleSearchChange = (e) => {
        setSearchValue(searchValue = e.target.value)
    }

    let array = [];

    const handleCheckbox = () => {
        if (refMale.current.checked) array.push("male")
        if (refFemale.current.checked) array.push("female")
        if (refNotMentioned.current.checked) array.push("not-mentioned")

        setFilteredContacts(filteredContacts = contacts.filter(contact => {
            return contact.gender === array[0] || contact.gender === array[1] || contact.gender === array[2]
        }).filter(contact => {
            return contact.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
            contact.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
            contact.phone.toLowerCase().includes(searchValue.toLowerCase())
        }) )
    }

    useEffect(() => {
        handleCheckbox()
    }, [searchValue])

    const checkLength = () => {
        if (filteredContacts.length === 0) {
            return (
                <div>
                    <h3 className='not-found'>Контактів не знайдено</h3>
                </div>
            )
        }
    }

    return (
        <div>
            <div className='header'>
                <div className="input-group mb-3">
                    <input onChange={handleSearchChange} type="text" className="form-control" placeholder="Введіть дані для пошуку" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                    <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">Пошук</button>
                    </div>
                </div>
                <div className="form-check form-switch">
                    <input ref={refMale} className="form-check-input" type="checkbox" id="male" defaultChecked onClick={handleCheckbox}></input>
                    <label className="form-check-label" htmlFor="male">Ч</label>
                </div>
                <div className="form-check form-switch">
                    <input ref={refFemale} className="form-check-input" type="checkbox" id="female" defaultChecked onClick={handleCheckbox}></input>
                    <label className="form-check-label" htmlFor="female">Ж</label>
                </div>
                <div className="form-check form-switch">
                    <input ref={refNotMentioned} className="form-check-input" type="checkbox" id="not-mentioned" defaultChecked onClick={handleCheckbox}></input>
                    <label className="form-check-label" htmlFor="not-mentioned">не вказано</label>
                </div>
            </div>
            {filteredContacts.map(contact => <Contact props={contact} key={contact.firstName + contact.lastName} /> )}
            {checkLength()}
        </div>
    )
}

export default Contacts