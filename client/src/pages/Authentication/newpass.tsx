import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { IRootState } from '../../store';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconLockDots from '../../components/Icon/IconLockDots';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateCover = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        dispatch(setPageTitle('Update Password'));
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

    const submitForm = async (e: { preventDefault: () => void }) => {
        e.preventDefault(); // Prevent default form submission

        // Validate passwords
        if (password !== cpassword) {
            showMessage('Passwords do not match');
            return;
        }

        const token = new URLSearchParams(window.location.search).get('token');
        const email = new URLSearchParams(window.location.search).get('email');

        try {
            const response = await axios.post(`https://server-side-5zbf.onrender.com/api/reset_password/${token}/${email}`, {
                password,
                cpassword,
            });

            if (response.data.success) {
                showMessage('Password updated successfully.');
                navigate('/auth/cover-login'); // Redirect on success
            } else {
                showMessage(response.data.error || 'Failed to update password.');
            }
        } catch (error) {
            showMessage('An error occurred. Please try again later.');
        }
    };

    // Extract email from the URL and assert its type
    const email = new URLSearchParams(window.location.search).get('email') as string | null;

    return (
        <div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10 flex items-center">
                                <div className="flex h-16 w-16 items-end justify-center overflow-hidden rounded-full bg-[#00AB55] ltr:mr-4 rtl:ml-4">
                                    <img src="/assets/images/auth/user.png" className="w-full object-cover" alt="images" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-2xl dark:text-white">{email}</h4>
                                    <p className="text-white-dark">Enter and confirm your password.</p>
                                </div>
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
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Confirm Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
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
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]" style={{ color: '#FFB200' }}>
                                    RESET
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCover;
