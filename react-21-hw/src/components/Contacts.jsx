import React, { useState, useRef } from 'react';
import './Contacts.scss'
import Contact from './Contact';

const Contacts = () => {
    const contacts = [{
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
    const [state] = useState({
        contacts,
        render() {
            return (
                this.contacts.map(contact => <Contact props={contact} key={contact.firstName + contact.lastName} /> )
            )
        },
    })
    let [value, setValue] = useState('')
    const handleSearchChange = (e) => {
        setValue(value = e.target.value)
        state.contacts = contacts.filter(contact => {
            return contact.lastName.toLowerCase().includes(value.toLowerCase()) ||
            contact.firstName.toLowerCase().includes(value.toLowerCase()) ||
            contact.phone.toLowerCase().includes(value.toLowerCase())
        })
        state.render()
    }
    
    const refMale = useRef(null);
    const refFemale = useRef(null);
    const refNotMentioned = useRef(null);

    let [array, setArray] = useState([]);

    const handleCheckbox = (e) => {
            if (e.target.className !== 'form-check-input' && e.target.className !== 'form-check-label') return;
            let array = [];
            if (refMale.current.checked) setArray(array.push("male"))
            if (refFemale.current.checked) setArray(array.push("female"))
            if (refNotMentioned.current.checked) setArray(array.push("not-mentioned"))
            switch(array.length) {
                case 0:
                    state.contacts = [];
                    break;
                case 1:
                    state.contacts = contacts.filter(contact => {
                        return contact.gender === array[0];
                    })
                    break;
                case 2:
                    state.contacts = contacts.filter(contact => {
                        return contact.gender === array[0] || contact.gender === array[1]
                    })

                    break;
                case 3:
                    state.contacts = contacts;
                    break;
            }
            state.render()
    }

    return (
        <div>
            <div className='header' onClick={handleCheckbox}>
                <div className="input-group mb-3">
                    <input onChange={handleSearchChange} type="text" className="form-control" placeholder="Введіть дані для пошуку" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                    <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">Пошук</button>
                    </div>
                </div>
                <div className="form-check form-switch">
                    <input ref={refMale} className="form-check-input" type="checkbox" id="male" defaultChecked></input>
                    <label className="form-check-label" htmlFor="male">Ч</label>
                </div>
                <div className="form-check form-switch">
                    <input ref={refFemale} className="form-check-input" type="checkbox" id="female" defaultChecked></input>
                    <label className="form-check-label" htmlFor="female">Ж</label>
                </div>
                <div className="form-check form-switch">
                    <input ref={refNotMentioned} className="form-check-input" type="checkbox" id="not-mentioned" defaultChecked></input>
                    <label className="form-check-label" htmlFor="not-mentioned">не вказано</label>
                </div>
            </div>
            {state.render()}
        </div>
    )
}

export default Contacts