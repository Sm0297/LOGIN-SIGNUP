import React, { useEffect, useRef, useState } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import validator from 'validator'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ReCAPTCHA from 'react-google-recaptcha';



import signinImage from '../assets/signup.jpg';


const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);
    const [buttonPopup, setButtonPopup] = useState(false);

    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] = useState('');
    const [errorMessageSubmit, setErrorMessageSubmit] = useState('');
    const [errorMessageUsername, setErrorMessageUsername] = useState('');
    const [phone, setPhone] = useState('');

    const userName = ['Palash029', 'AkSHAY029', 'Dinesh029', 'Samar029', 'Subha029'];


    

    const handlePhoneChange = (value) => {
        setPhone(value);
        handleChange({
            target: {
                name: 'phoneNumber',
                value: value,
            },
        });
    };

    const validatePassword = (value) => {

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessagePassword('Is Strong Password')
        } else {
            setErrorMessagePassword('Is Not Strong Password')
        }
        handleChange({
            target: {
                name: 'password',
                value: value,
            },
        });
    }

    const validateConfirmPassword = (value) => {

        if (value !== document.forms['myForm']['password'].value) {
            setErrorMessageConfirmPassword("Password do not match");
        }
        else {
            setErrorMessageConfirmPassword("");
        }

        handleChange({
            target: {
                name: 'confirmPassword',
                value: value,
            },
        });
    };

    const validateUsername = (value) => {

        if (userName.includes(value)) {
            setErrorMessageUsername("Username already exists");
        }
        else {
            setErrorMessageUsername("");
        }

        handleChange({
            target: {
                name: 'username',
                value: value,
            },
        });
    };

    let captcha = '';
    const handleCaptchaChange = (value) => {
        captcha = value;
        console.log('CAPTCHA value:', value);
        // Store the CAPTCHA value in the component's state or perform any other necessary actions
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (captcha.length === 0) {
            setErrorMessageSubmit("Please check the captcha");
            setButtonPopup(true);
            return;
        }

        if (isSignup) {

            if (document.forms['myForm']['password'].value !== document.forms['myForm']['confirmPassword'].value) {
                console.log("Confimr Password")
                setErrorMessageSubmit("Password and Confirm Password do not match");
                setButtonPopup(true);
                return;
            }

            if (userName.includes(document.forms['myForm']['username'].value)) {
                console.log("Username")
                setErrorMessageSubmit("UserName already present");
                setButtonPopup(true);
                return;
            }
            else {
                userName.push(document.forms['myForm']['username'].value);
            }

            setErrorMessageSubmit('');



            console.log(document.forms['myForm']['password'].value)
            console.log(document.forms['myForm']['confirmPassword'].value)
            console.log(form);
        }
        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://localhost:5000/auth';

        try {

            const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
                username, password, fullName: form.fullName, phoneNumber, avatarURL,
            });

            cookies.set('token', token);
            cookies.set('username', username);
            cookies.set('fullName', fullName);
            cookies.set('userId', userId);

            if (isSignup) {
                cookies.set('phoneNumber', phoneNumber);
                cookies.set('avatarURL', avatarURL);
                cookies.set('hashedPassword', hashedPassword);
            }

            window.location.reload();
        } catch (error) {
            setErrorMessageSubmit("Wrong Credentials");
            setButtonPopup(true);
        }
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form id="myForm" onSubmit={handleSubmit}>

                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="username">UserName</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    onChange={(e) => validateUsername(e.target.value)}
                                    required
                                /><br />
                                {isSignup && (errorMessageUsername === '' ? null :
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{errorMessageUsername}</span>)}
                            </div>
                        )}

                        {!isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="username">UserName</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    onChange={handleChange}
                                    required
                                />
                                
                            </div>

                        )}


                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <PhoneInput
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    country={'us', 'gb', 'de', 'fr', 'es', 'it', 'ca', 'au', 'jp', 'cn', 'sg', 'mx', 'br', 'ar', 'ch', 'nl', 'se', 'no', 'in'}
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    required
                                />
                            </div>
                        )}
                        {/*{isSignup && (*/}
                        {/*    <div className="auth__form-container_fields-content_input">*/}
                        {/*        <label htmlFor="avatarURL">Avatar URL</label>*/}
                        {/*        <input*/}
                        {/*            name="avatarURL"*/}
                        {/*            type="text"*/}
                        {/*            placeholder="Avatar URL"*/}
                        {/*            onChange={handleChange}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        {isSignup && (

                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => validatePassword(e.target.value)}
                                    required
                                />
                                <br />
                                {errorMessagePassword === '' ? null :
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{errorMessagePassword}</span>}
                            </div>
                        )}
                        {!isSignup && (

                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                                <br />
                                {errorMessagePassword === '' ? null :
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{errorMessagePassword}</span>}
                            </div>
                        )}

                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={(e) => validateConfirmPassword(e.target.value)}
                                    required
                                /><br />
                                {errorMessageConfirmPassword === '' ? null :
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{errorMessageConfirmPassword}</span>}
                            </div>
                        )}
                        <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={handleCaptchaChange}
                        />

                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                                ? "Already have an account?"
                                : "Dont't have an account?"
                            }
                            <span onClick={switchMode}>
                                {isSignup ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
              
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt='sign in' />
            </div>
        </div>
    )

}

export default Auth