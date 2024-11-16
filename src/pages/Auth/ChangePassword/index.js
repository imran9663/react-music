import React, { useEffect, useState } from 'react';
import { Icons } from '../../../assets/Icons';
import CoustomInput from '../../../components/CoustomInput';
import CoustomButton from '../../../components/CoustomButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { regexp } from '../../../utils/regexp';
import RouteStrings from '../../../utils/RouteStrings';
import { postRequest } from '../../../apis/Base/serviceMethods';
import { configURL } from '../../../apis/Base/config';
import toast, { Toaster } from 'react-hot-toast';
import { Toast } from 'bootstrap';
import SpotLoader from '../../../components/Loader/SpotLoader';

const ChangePassword = () => {
    const navigate = useNavigate();
    const Location = useLocation();
    const { token } = Location.state;


    const errorText = {
        newPassword: 'password length should be grater than 8',
        confirmPassword: 'new password & Confirm Password should be same'
    }
    const [formVlaues, setformVlaues] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [errorState, seterrorState] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [isDisabled, setisDisabled] = useState(false);
    const [isLoading, setisLoading] = useState(false);
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
                case 'newPassword':
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
        const payload = { token: token, newPassword: formVlaues.newPassword }
        callChangePasswordApi(payload)
    }
    const callChangePasswordApi = async (payload) => {
        setisLoading(true);
        await postRequest(configURL.changepassword, payload).then((result) => {
            if (result.status === 200) {
                toast.success('Password Reset Success');
                navigate(RouteStrings.login);
            }
        }).catch((err) => {
            toast.error("Error while password reset")
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
                        <h1 className="heading"> Change Password</h1>
                        <div className="formElements">
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

                            <CoustomButton OnClick={OnClickOnCta} Disabled={isDisabled} title={"Change "} />
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

export default ChangePassword