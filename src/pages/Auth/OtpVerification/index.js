import React, { useEffect, useState } from 'react';
import './style.scss';
import { Icons } from '../../../assets/Icons';
import CoustomInput from '../../../components/CoustomInput';
import CoustomButton from '../../../components/CoustomButton';
import { Link } from 'react-router-dom';
import { regexp } from '../../../utils/regexp';
import RouteStrings from '../../../utils/RouteStrings';

const OtpVerification = () => {

    const errorText = {
        email: 'please enter correct Email',
        otp: 'otp length should be grater than 8',
    }
    const [formVlaues, setformVlaues] = useState({
        email: '',
        otp: '',
    })
    const [errorState, seterrorState] = useState({
        email: '',
        otp: '',
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
            case 'otp':
                regexp.otp.test(value) && seterrorState({ ...errorState, [name]: "" })
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
                case 'otp':
                    regexp.onlyNumber.test(value) ? seterrorState({ ...errorState, [name]: "" }) : seterrorState({ ...errorState, [name]: errorText[name] })
                    break;
                default:
                    break;
            }
        }
    }
    const OnClickOnCta = () => {
        console.log("formvalues", formVlaues);
    }
    return (
        <>
            <div className="container OtpVerification">
                <div className="row h-100 px-4  d-flex justify-contet-center align-items-center">
                    <div className="col-md-8  d-none d-md-block hero-img-wrapper">
                        <img loading="lazy" src={Icons.mailbox} alt="bannerimage" />
                    </div>
                    <div className="col-md-4  OtpVerification-form">
                        <h1 className="heading">Verif OTP</h1>
                        <p className="info">  An OTP has been sent to your mail</p>
                        <div className="formElements">
                            <CoustomInput type={'email'}
                                label={'email'}
                                Value={formVlaues.email}
                                name='email'
                                OnChange={handleFormValueChange}
                                placeholder={"ex: JhonDoe@nomail.com"}
                                OnBlur={handleFormValueBlur}
                                errorText={errorState.email} />
                            <CoustomInput
                                type={'otp'}
                                Value={formVlaues.otp}
                                label={'otp'}
                                placeholder={"ex: X X X X"}
                                name={'otp'}
                                OnChange={handleFormValueChange}
                                OnBlur={handleFormValueBlur}
                                errorText={errorState.otp} />
                            <CoustomButton OnClick={OnClickOnCta} Disabled={isDisabled} title={"OtpVerification"} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OtpVerification