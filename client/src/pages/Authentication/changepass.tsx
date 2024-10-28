import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { IRootState } from '../../store';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import axios from 'axios';
import Swal from 'sweetalert2';

const ChangeCover = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [error, setError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const submitForm = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        axios
            .post('http://localhost:4002/api/update_password', {
                password,
                cpassword,
            })
            .then((res) => {
                const { success, token } = res.data; // Destructure success and token
                setLoading(false);
                console.log('Response:', res.data); // Log the entire response

                if (!success) {
                    setError('Passwords do not match.');
                    setResponseMessage('');
                } else {
                    setResponseMessage(token);
                    const isAuthenticated = true;
                    navigate('/', { state: { isAuthenticated } });
                    console.log('Navigating with token:', token);
                }
            })
            .catch((error) => {
                setLoading(false);
                setError('An error occurred. Please try again.');
                setResponseMessage('');
                console.error('Error:', error); // Log the error for debugging
            });
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,#0A2A7F_0%,#FFB200_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug md:text-4xl" style={{ color: '#0B2F9F' }}>
                                    Update Your Password
                                </h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter password and confirm password</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
                                            type="password"
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Cpassword">Confirm Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Cpassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={cpassword}
                                            onChange={(e) => setCpassword(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(11,47,159,0.44)]"
                                    style={{ backgroundColor: '#0B2F9F', color: '#FFFFFF' }}
                                >
                                    UPDATE
                                </button>
                                {/* <button
                                    type="button"
                                    className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                    onClick={handleCancel}
                                    style={{ backgroundColor: '#0B2F9F', color: '#FFFFFF' }}
                                >
                                    CANCEL
                                </button> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeCover;
