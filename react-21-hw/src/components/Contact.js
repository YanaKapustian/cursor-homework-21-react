import React from 'react';
import malePic from '../img/mars.png'
import femalePic from '../img/female.png'


const Contact = ({props}) => {
    const {firstName, lastName, phone, gender} = props;
    return (
        <div className='contact-item'>
            <div className='info'>{firstName} {lastName} {gender === 'female' ? <img src={femalePic} alt="female" className='female' /> : gender === 'male' ? <img src={malePic} alt="male" className='male' /> : null }</div>
            <div className='phone'>{phone}</div>
        </div>
    )
};

export default Contact;