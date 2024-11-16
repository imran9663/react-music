import React, { useEffect, useState } from 'react';
import { Icons } from '../../../assets/Icons';
import CoustomInput from '../../../components/CoustomInput';
import CoustomButton from '../../../components/CoustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { regexp } from '../../../utils/regexp';
import RouteStrings from '../../../utils/RouteStrings';
import SpotLoader from '../../../components/Loader/SpotLoader';
import { postRequest } from '../../../apis/Base/serviceMethods';
import { configURL } from '../../../apis/Base/config';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false);
    const errorText = {
        email: 'please enter correct Email',
    }
    const [formVlaues, setformVlaues] = useState({
        email: '',
    })
    const [errorState, seterrorState] = useState({
        email: '',
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
                default:
                    break;
            }
        }
    }
    const OnClickOnCta = () => {
        callForgotPassword({ email: formVlaues.email })
    }
    const callForgotPassword = async (payload) => {
        setisLoading(true);
        await postRequest(configURL.forgotpassword, payload).then((result) => {
            if (result.status === 201) {
                navigate(RouteStrings.otp, { state: { lastRoute: RouteStrings.forgotPassword, email: formVlaues.email } })
            }
            if (result.status === 400) {
                toast.error('❗ Email is not registered')
            }
        }).catch((err) => {
            console.log("err=>", err);
            toast.error('❗ Something went Wrong')
        }).finally(() => {
            setisLoading(false)
        })
    }
    return (
        <>
            <div className="container Login">
                <div className="row h-100 px-4  d-flex justify-contet-center align-items-center">
                    <div className="col-md-8  d-none d-md-block hero-img-wrapper">
                        <img loading="lazy" src={Icons.ForgotPassword} alt="bannerimage" />
                    </div>
                    <div className="col-md-4  Login-form">
                        <h1 className="heading"> Forgot Password</h1>
                        <p className="info">  Get otp through Email</p>
                        <div className="formElements">
                            <CoustomInput type={'email'}
                                label={'email'}
                                Value={formVlaues.email}
                                name='email'
                                OnChange={handleFormValueChange}
                                placeholder={"ex: jhonDoe@nomail.com"}
                                OnBlur={handleFormValueBlur}
                                errorText={errorState.email} />
                            <CoustomButton OnClick={OnClickOnCta} Disabled={isDisabled} title={"Send OTP"} />

                        </div>
                    </div>
                </div>
            </div>
            {
                isLoading && <div className="LoadingConatiner">
                    <SpotLoader />
                </div>
            }
            <Toaster position='bottom' />
        </>
    )
}

export default ForgotPassword