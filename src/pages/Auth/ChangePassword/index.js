import React, { useEffect, useState } from 'react';
import { Icons } from '../../../assets/Icons';
import CoustomInput from '../../../components/CoustomInput';
import CoustomButton from '../../../components/CoustomButton';
import { Link } from 'react-router-dom';
import { regexp } from '../../../utils/regexp';
import RouteStrings from '../../../utils/RouteStrings';

const ChangePassword = () => {

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
        console.log("formvalues", formVlaues);
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
        </>
    )
}

export default ChangePassword