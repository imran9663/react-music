import React, { useEffect, useState } from 'react';
import './style.scss';
import { Icons } from '../../../assets/Icons';
import CoustomInput from '../../../components/CoustomInput';
import CoustomButton from '../../../components/CoustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { regexp } from '../../../utils/regexp';
import RouteStrings from '../../../utils/RouteStrings';
import { getRequestWithInstence, postRequest } from '../../../apis/Base/serviceMethods';
import { configURL } from '../../../apis/Base/config';
import SpotLoader from '../../../components/Loader/SpotLoader';

const Register = () => {
    const Navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const errorText = {
        name: 'please enter correct name',
        email: 'please enter correct Email',
        newPassword: 'password length should be grater than 8',
        confirmPassword: 'new password & Confirm Password should be same'
    }
    const [formVlaues, setformVlaues] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [errorState, seterrorState] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [isDisabled, setisDisabled] = useState(false)
    useEffect(() => {
        if (Object.values(formVlaues).every(val => val !== '') && Object.values(errorState).every(val => val === '')) {
            setisDisabled(false)
        }
        else {
            setisDisabled(true)
        }
    }, [formVlaues])
    const handleFormValueChange = (name, value) => {
        setformVlaues({ ...formVlaues, [name]: value })
        switch (name) {
            case 'email':
                regexp.email.test(value) && seterrorState({ ...errorState, [name]: "" })
                break;
            case 'newPassword':
                regexp.password.test(value) && seterrorState({ ...errorState, [name]: "" })
                break;
            case 'confirmPassword':
                value === formVlaues.newPassword && seterrorState({ ...errorState, [name]: "" })
                break;
            default:
                break;
        }
    }
    const handleFormValueBlur = (e) => {
        const { name, value } = e.target
        if (value === '') {
            seterrorState({ ...errorState, [name]: "Cannot be balnk" })
        } else {
            seterrorState({ ...errorState, [name]: "" })
            switch (name) {
                case 'email':
                    regexp.email.test(value) ? seterrorState({ ...errorState, [name]: "" }) : seterrorState({ ...errorState, [name]: errorText[name] })
                    break;
                case 'newPassword':
                    console.log("match pass", regexp.password.test(value));
                    regexp.password.test(value) ? seterrorState({ ...errorState, [name]: "" }) : seterrorState({ ...errorState, [name]: errorText[name] })
                    break;
                case 'confirmPassword':
                    value === formVlaues.newPassword ? seterrorState({ ...errorState, [name]: "" }) : seterrorState({ ...errorState, [name]: errorText[name] })
                    break;
                default:
                    break;
            }
        }
    }
    const OnClickOnCta = () => {
        callAPI()
    }
    const callAPI = async () => {
        setisLoading(true)
        const data = {
            "fullName": formVlaues.name,
            "email": formVlaues.email,
            "Password": formVlaues.newPassword,
        }
        await postRequest(configURL.register, data).then(res => {
            console.log(res);
            res.status === 201 && Navigate(RouteStrings.otp, { state: { lastRoute: RouteStrings.register, email: formVlaues.email } });
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setisLoading(false)
        })
    }
    return (
        <>
            <div className="container Register">
                <div className="row h-100 px-4  d-flex justify-contet-center align-items-center">
                    <div className="col-md-8  d-none d-md-block hero-img-wrapper">
                        <img loading="lazy" src={Icons.moremusic} alt="bannerimage" />
                    </div>
                    <div className="col-md-4  Register-form">
                        <h1 className="heading"> Welcome to <span>reusic</span></h1>
                        <p className="info"> please register yourself to Continue</p>
                        <div className="formElements">
                            <CoustomInput
                                type={'text'}
                                Value={formVlaues.name}
                                name='name'
                                OnChange={handleFormValueChange}
                                label={'Full Name'}
                                placeholder={"ex: Jhon Doe"}
                                OnBlur={handleFormValueBlur}
                                errorText={errorState.name} />
                            <CoustomInput type={'email'}
                                label={'email'}
                                Value={formVlaues.email}
                                name='email'
                                OnChange={handleFormValueChange}
                                placeholder={"ex: JhonDoe@nomail.com"}
                                OnBlur={handleFormValueBlur}
                                errorText={errorState.email} />
                            <CoustomInput
                                type={'password'}
                                Value={formVlaues.newPassword}
                                label={'new password'}
                                placeholder={"ex: ▪▪▪▪▪▪▪▪▪▪▪▪"}
                                name={'newPassword'}
                                OnChange={handleFormValueChange}
                                OnBlur={handleFormValueBlur}
                                errorText={errorState.newPassword} />
                            <CoustomInput
                                type={'password'}
                                Value={formVlaues.confirmPassword}
                                label={'confirm password'}
                                placeholder={"ex: ▪▪▪▪▪▪▪▪▪▪▪▪"}
                                name={'confirmPassword'}
                                OnChange={handleFormValueChange}
                                OnBlur={handleFormValueBlur}
                                errorText={errorState.confirmPassword} />


                            <div className="pt-5">
                                <CoustomButton OnClick={OnClickOnCta} Disabled={isDisabled} title={"Register"} />
                                <p className="link">Already registerd <Link to={RouteStrings.login} className='loginLinh'> Login</Link> here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                isLoading && <div className="LoadingConatiner">
                    <SpotLoader />
                </div>
            }

        </>
    )
}

export default Register