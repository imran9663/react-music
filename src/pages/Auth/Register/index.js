import React, { useState } from 'react';
import './style.scss';
import { Icons } from '../../../assets/Icons';
import CoustomInput from '../../../components/CoustomInput';
import CoustomButton from '../../../components/CoustomButton';
import { Link } from 'react-router-dom';

const Register = () => {

    const [errorState, seterrorState] = useState({
        name: 'please enter correct name',
        email: 'please enter correct Email',
        newPassword: 'password length should be grater than 8',
        confirmPassword: 'new password & Confirm Password should be same'
    })
    return (
        <>
            <div className="container Register">
                <div className="row h-100 px-4  d-flex justify-contet-center align-items-center">
                    <div className="col-md-8  d-none d-md-block hero-img-wrapper">
                        <img src={Icons.moremusic} alt="bannerimage" />
                    </div>
                    <div className="col-md-4  Register-form">
                        <h1 className="heading"> Welcome to <span>reusic</span></h1>
                        <p className="info"> please register yourself to Continue</p>
                        <div className="formElements">
                            <CoustomInput type={'text'}
                                label={'Full Name'}
                                placeholder={"ex: Jhon Doe"}
                                OnChange={""} OnBlur={""}
                                errorText={""} />
                            <CoustomInput type={'email'}
                                label={'email'}
                                placeholder={"ex: JhonDoe@nomail.com"}
                                OnChange={""} OnBlur={""}
                                errorText={""} />
                            <CoustomInput type={'password'}
                                label={'new password'}
                                placeholder={"ex: ▪▪▪▪▪▪▪▪▪▪▪▪"}
                                OnChange={""} OnBlur={""}
                                errorText={""} />
                            <CoustomInput type={'password'}
                                label={'confirm password'}
                                placeholder={"ex: ▪▪▪▪▪▪▪▪▪▪▪▪"}
                                OnChange={""} OnBlur={""}
                                errorText={""} />
                            <div className="pt-5">
                                <CoustomButton title={"Register"} />
                                <p className="link">Already registerd <Link className='loginLinh'> Login</Link> here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register