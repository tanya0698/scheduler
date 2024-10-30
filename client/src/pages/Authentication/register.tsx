import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { IRootState } from '../../store';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import axios from 'axios';

const RegisterCover = () => {
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [roles, setRoles] = useState<{ roleId: number; roleName: string }[]>([]);
    const [roleId, setRoleId] = useState<number | ''>('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Register'));
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

    const fetchRoles = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/roles');
            console.log('API Response:', response.data);

            if (response.data.success === true) {
                // Check for success
                setRoles(response.data.data);
                console.log('Fetched roles:', response.data.data);
            }
        } catch (error) {
            console.error('Error fetching roles', error);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const submitForm = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://server-side-5zbf.onrender.com/api/register', {
                fullname,
                email,
                phone,
                address,
                roleId,
                password,
                cpassword,
            });

            if (response.data.success) {
                navigate('/auth/cover-login');
            } else {
                setError(response.data.error || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleCancel = () => {
        navigate('/auth/cover-login');
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
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug md:text-4xl" style={{ color: '#0B2F9F' }}>
                                    Sign Up
                                </h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to register</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="Name">Full Name</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Name"
                                            type="text"
                                            placeholder="Enter Name"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Email"
                                            type="email"
                                            placeholder="Enter Email"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Address">Address</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Address"
                                            type="address"
                                            placeholder="Enter Address"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Phone">Phone</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Phone"
                                            type="phone"
                                            placeholder="Enter Phone Number"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Role">Select Role</label>
                                    <div className="relative text-white-dark">
                                        <select
                                            id="Role"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={roleId}
                                            onChange={(e) => setRoleId(Number(e.target.value))} // Convert value to number
                                        >
                                            <option value="" disabled>
                                                Select Role
                                            </option>
                                            {roles.length > 0 ? (
                                                roles.map((role) => (
                                                    <option key={role.roleId} value={role.roleId}>
                                                        {role.roleName}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="" disabled>
                                                    No roles available
                                                </option>
                                            )}
                                        </select>
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
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
                                <div>
                                    <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Agree To Terms and Conditions</span>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(11,47,159,0.44)]"
                                    style={{ backgroundColor: '#0B2F9F', color: '#FFFFFF' }}
                                >
                                    Sign Up
                                </button>
                                <button
                                    type="submit"
                                    className="btn !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(11,47,159,0.44)]"
                                    style={{ backgroundColor: '#0B2F9F', color: '#FFFFFF' }}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </form>

                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="text-center dark:text-white">
                                Already have an account ?&nbsp;
                                <Link to="/auth/cover-login" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white" style={{ color: '#FFB200' }}>
                                    SIGN IN
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCover;
