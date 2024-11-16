import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstence from '../../../apis/Base';
import { configURL } from '../../../apis/Base/config';
import { postRequest } from '../../../apis/Base/serviceMethods';
import { Icons } from '../../../assets/Icons';
import CoustomButton from '../../../components/CoustomButton';
import CoustomInput from '../../../components/CoustomInput';
import SpotLoader from '../../../components/Loader/SpotLoader';
import { loaclStorageStrings } from '../../../utils/localStorageStrings';
import { regexp } from '../../../utils/regexp';
import RouteStrings from '../../../utils/RouteStrings';
import './style.scss';

const Login = () => {
    const [isLoading, setisLoading] = useState(false)
    const Navigate = useNavigate()
    const errorText = {
        email: 'please enter correct Email',
        Password: 'password length should be grater than 8',
    }
    const [formVlaues, setformVlaues] = useState({
        email: '',
        Password: '',

    })
    const [errorState, seterrorState] = useState({
        email: '',
        Password: '',
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
            case 'Password':
                regexp.password.test(value) && seterrorState({ ...errorState, [name]: "" })
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
                case 'Password':
                    regexp.password.test(value) ? seterrorState({ ...errorState, [name]: "" }) : seterrorState({ ...errorState, [name]: errorText[name] })
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
        await postRequest(configURL.login, formVlaues).then(res => {
            if (res.status === 201) {
                const { token, data } = res.data
                localStorage.setItem(loaclStorageStrings.token, JSON.stringify(token))
                localStorage.setItem(loaclStorageStrings.profileInfo, JSON.stringify(data))
                axiosInstence.defaults.headers.Authorization = `Bearer ${token}`
                setTimeout(() => {
                    Navigate(RouteStrings.home)
                }, 50);
                res.status !== 201 && toast.error(res.data.msg)

                // res.status === 201 && Navigate(RouteStrings.home, { state: { lastRoute: RouteStrings.register, email: formVlaues.email } });
            }
        }).catch(err => {
            console.log(err);
            toast.error('Something went wrong')

        }).finally(() => {
            setisLoading(false)
        })
    }
    return (
        <>
            <div className="container Login">
                <div className="row h-100 px-4  d-flex justify-contet-center align-items-center">
                    <div className="col-md-8  d-none d-md-block hero-img-wrapper">
                        <img loading="lazy" src={Icons.teamFun} alt="bannerimage" />
                    </div>
                    <div className="col-md-4  Login-form">
                        <h1 className="heading"> Welcome Back</h1>
                        <p className="info">  Login to Continue</p>
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
                                type={'password'}
                                Value={formVlaues.Password}
                                label={'password'}
                                placeholder={"ex: ▪▪▪▪▪▪▪▪▪▪▪▪"}
                                name={'Password'}
                                OnChange={handleFormValueChange}
                                OnBlur={handleFormValueBlur}
                                errorText={errorState.Password} />
                            <div className=" w-100 text-left ">
                                <Link to={RouteStrings.forgotPassword} className='forgot-link'> Forgot Password?</Link>
                            </div>
                            <div className="pt-5">
                                <CoustomButton OnClick={OnClickOnCta} Disabled={isDisabled} title={"Login"} />
                                <p className="link">Not Registerd <Link to={RouteStrings.register} className='loginLinh'> Register</Link> here</p>
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
            <Toaster position='bottom' />

        </>
    )
}

export default Login