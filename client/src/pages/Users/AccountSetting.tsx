import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconHome from '../../components/Icon/IconHome';
import axios from 'axios';

const AccountSetting = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    });
    const [tabs, setTabs] = useState<string>('home');
    const [userData, setUser] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        country: '',
    });

    const fetchUser = async () => {
        const currentEmail = localStorage.getItem('email');
        if (!currentEmail) {
            console.error('No email found in local storage.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4002/api/users/${currentEmail}`);
            if (response.data.success) {
                const userData = response.data.data;
                setUser({
                    fullname: userData.fullname,
                    email: userData.email,
                    country: '', // Initialize other fields as needed
                    address: '',
                    phone: '',
                });
            } else {
                console.error('Failed to fetch user data:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4002/api/update_profile', userData);
            alert('User  data updated successfully!');
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update user data.');
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Account Settings</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Settings</h5>
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('home')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconHome />
                                Home
                            </button>
                        </li>
                    </ul>
                </div>
                {tabs === 'home' ? (
                    <div>
                        <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black" onSubmit={handleSubmit}>
                            <h6 className="text-lg font-bold mb-5">General Information</h6>
                            <div className="flex flex-col sm:flex-row">
                                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                    <img src="" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name">Full Name</label>
                                        <input id="fullname" type="text" placeholder="First User" className="form-input" value={userData.fullname} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="address">Country</label>
                                        <input id="country" type="text" placeholder="Zimbabwe" className="form-input" value={userData.country} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input id="address" type="text" placeholder="Harare" className="form-input" value={userData.address} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input id="phone" type="text" placeholder="+263" className="form-input" value={userData.phone} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input id="email" type="email" placeholder="user@gmail.com" className="form-input" value={userData.email} onChange={handleChange} />
                                    </div>

                                    <div className="sm:col-span-2 mt-3">
                                        <button
                                            type="submit"
                                            className="btn !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(11,47,159,0.44)]"
                                            style={{ backgroundColor: '#0B2F9F', color: '#FFFFFF' }}
                                        >
                                            SAVE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default AccountSetting;
