import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { IRootState } from '../../store';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import axios from 'axios';

const RecoverIdCover = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Recover Password'));
    });
    const navigate = useNavigate();
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

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4002/api/forgot_password', { email });
            setSuccess('Email sent successfully!');
            setError('Email not found.');
        } catch (error) {
            setError('An error occurred. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,#0A2A7F_0%,#FFB200_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full"></div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-7">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug md:text-4xl" style={{ color: '#0B2F9F' }}>
                                    Password reset
                                </h1>
                            </div>
                            <form className="space-y-5" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Email"
                                            type="email"
                                            placeholder="Enter Email"
                                            className="form-input pl-10 placeholder:text-white-dark"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(11,47,159,0.44)]"
                                    style={{ backgroundColor: '#0B2F9F', color: '#FFFFFF' }}
                                >
                                    RECOVER
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverIdCover;
