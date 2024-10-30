import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconEye from '../components/Icon/IconEye';
import IconCircleCheck from '../components/Icon/IconCircleCheck';
import IconInfoCircle from '../components/Icon/IconInfoCircle';
import axios from 'axios';

const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const navigate = useNavigate();
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>([]);
    const [count, setCount] = useState(null);
    const [pending, setPending] = useState(null);
    const [total, setTotal] = useState(null);
    const [cancelled, setCancelled] = useState(null);
    const [prevWork, setPrevWork] = useState(null);
    const [prevTravel, setPrevTravel] = useState(null);
    const [prevPersonal, setPrevPersonal] = useState(null);
    const [nextWork, setNextWork] = useState(null);
    const [nextPersonal, setNextPersonal] = useState(null);
    const [nextTravel, setNextTravel] = useState(null);

    const reverseDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        // Removed seconds and milliseconds since you only need "yyyy-MM-ddThh:mm"
        return (
            <>
                {year}-{month}-{day}
                {Array(4).fill(<>&nbsp;</>)} {/* Creates four non-breaking spaces */}
                <b>
                    {hours}:{minutes}
                </b>
            </>
        );
    };

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/top_appointments');
            console.log('Current Appointment Details:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.data; // Adjust according to the actual structure
                setInitialRecords(rowData);
                setRecordsData(rowData);
                console.log('Fetched all appointments:', rowData);
            } else {
                console.error('Failed to fetch all appointments:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching all appointments', error);
            setInitialRecords([]); // Reset initialRecords on error
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const currentCount = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/completed/count');
            console.log('Current Appointment Count:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.count; // Access the count directly
                setCount(rowData); // Set the count in state
                console.log('Fetched current appointments:', rowData);
            } else {
                console.error('Failed to fetch current appointments:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching current appointments', error);
        }
    };

    useEffect(() => {
        currentCount();
    }, []);

    const pendingCount = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/pending/count');
            console.log('Pending Appointment Count:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.count; // Access the count directly
                setPending(rowData); // Set the count in state
                console.log('Fetched penind appointments:', rowData);
            } else {
                console.error('Failed to fetch penind appointments:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching penind appointments', error);
        }
    };

    useEffect(() => {
        pendingCount();
    }, []);

    const cancelledCount = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/cancelled/count');
            console.log('Cancelled Appointment Count:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.count; // Access the count directly
                setCancelled(rowData); // Set the count in state
                console.log('Fetched cancelled appointments:', rowData);
            } else {
                console.error('Failed to fetch cancelled appointments:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching cancelled appointments', error);
        }
    };

    useEffect(() => {
        cancelledCount();
    }, []);

    const totalCounted = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/total/count');
            console.log('Total Appointment Count:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.count; // Access the count directly
                setTotal(rowData); // Set the count in state
                console.log('Fetched total appointments:', rowData);
            } else {
                console.error('Failed to fetch total appointments:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching total appointments', error);
        }
    };

    useEffect(() => {
        totalCounted();
    }, []);

    const completeWork = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/completed/work');
            console.log('Completed work:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.count; // Access the count directly
                setPrevWork(rowData); // Set the count in state
                console.log('Fetched completed work:', rowData);
            } else {
                console.error('Fetched completed work:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching completed work', error);
        }
    };

    useEffect(() => {
        completeWork();
    }, []);

    const completeTravel = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/completed/travel');
            console.log('Travel work:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.count; // Access the count directly
                setPrevTravel(rowData); // Set the count in state
                console.log('Fetched completed travel:', rowData);
            } else {
                console.error('Fetched completed travel:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching completed travel', error);
        }
    };

    useEffect(() => {
        completeTravel();
    }, []);

    const completePersonal = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/completed/personal');
            console.log('Personal work:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.count; // Access the count directly
                setPrevPersonal(rowData); // Set the count in state
                console.log('Fetched completed personal:', rowData);
            } else {
                console.error('Fetched completed personal:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching completed personal', error);
        }
    };

    useEffect(() => {
        completePersonal();
    }, []);

    const pendingWork = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/pending/work');
            console.log('Pending work:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.count; // Access the count directly
                setNextWork(rowData); // Set the count in state
                console.log('Fetched pending work:', rowData);
            } else {
                console.error('Fetched pending work:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching pending work', error);
        }
    };

    useEffect(() => {
        pendingWork();
    }, []);

    const pendingPersonal = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/pending/personal');
            console.log('Pending personal:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.count; // Access the count directly
                setNextPersonal(rowData); // Set the count in state
                console.log('Fetched pending personal:', rowData);
            } else {
                console.error('Fetched pending personal:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching pending personal', error);
        }
    };

    useEffect(() => {
        pendingPersonal();
    }, []);

    const pendingTravel = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/pending/travel');
            console.log('Pending travel:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.count; // Access the count directly
                setNextTravel(rowData); // Set the count in state
                console.log('Fetched pending travel:', rowData);
            } else {
                console.error('Fetched pending travel:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching pending travel', error);
        }
    };

    useEffect(() => {
        pendingTravel();
    }, []);

    const handleRedirect = () => {
        navigate('/datatables/export'); // Navigate to the report page
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Home</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400" onClick={handleRedirect}>
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Completed Appointments</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {count !== null ? `${count}` : 'Loading...'}</div>
                        </div>
                    </div>

                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400" onClick={handleRedirect}>
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Pending Appointments</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {pending !== null ? `${pending}` : 'Loading...'}</div>
                        </div>
                    </div>

                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400" onClick={handleRedirect}>
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Cancelled Appointments</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{cancelled !== null ? `${cancelled}` : 'Loading...'}</div>
                        </div>
                    </div>

                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400" onClick={handleRedirect}>
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Appointments</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {total !== null ? `${total}` : 'Loading...'}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    <div className="grid gap-6 xl:col-span-5">
                        {/*  Previous Appointments  */}
                        <div className="panel overflow-hidden" onClick={handleRedirect}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Completed Appointments</div>
                                    <div className="text-success"> Attended </div>
                                </div>
                                <div className="dropdown">
                                    <Dropdown
                                        offset={[0, 5]}
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="hover:opacity-80"
                                        button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                    ></Dropdown>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                    <IconCircleCheck className="text-success opacity-20 w-full h-full" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-primary">Personal</div>
                                        <div className="mt-2 font-semibold text-2xl"> {prevPersonal !== null ? `${prevPersonal}` : 'Loading...'}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Work</div>
                                        <div className="mt-2 font-semibold text-2xl"> {prevWork !== null ? `${prevWork}` : 'Loading...'}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Traveling</div>
                                        <div className="mt-2 font-semibold text-2xl"> {prevTravel !== null ? `${prevTravel}` : 'Loading...'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Current Appointments */}
                        <div className="panel overflow-hidden" onClick={handleRedirect}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Pending Appointments</div>
                                    <div className="text-danger"> To be attended </div>
                                </div>
                                <div className="dropdown">
                                    <Dropdown offset={[0, 5]} placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}></Dropdown>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                    <IconInfoCircle className="text-danger opacity-20 w-24 h-full" />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-primary">Personal</div>
                                        <div className="mt-2 font-semibold text-2xl">{nextPersonal !== null ? `${nextPersonal}` : 'Loading...'}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Work</div>
                                        <div className="mt-2 font-semibold text-2xl">{nextWork !== null ? `${nextWork}` : 'Loading...'}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Traveling</div>
                                        <div className="mt-2 font-semibold text-2xl">{nextTravel !== null ? `${nextTravel}` : 'Loading...'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Recent Transactions  */}
                    <div className="panel xl:col-span-7">
                        <div className="mb-5 text-lg font-bold">All Appointments</div>
                        <div className="table-responsive" onClick={handleRedirect}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Number</th>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recordsData.map((data) => {
                                        return (
                                            <tr>
                                                <td>{data.appointmentId}</td>
                                                <td>
                                                    <div className="whitespace-nowrap">{data.appointmentName}</div>
                                                </td>
                                                <td>{data.appointmentLocation}</td>
                                                <td>{reverseDate(data.appointmentFrom)}</td> {/* Format appointmentFrom */}
                                                <td>{reverseDate(data.appointmentTo)}</td>
                                                <td>
                                                    <span
                                                        className={`badge whitespace-nowrap ${
                                                            data.event === 'Personal'
                                                                ? 'badge badge-outline-primary   '
                                                                : data.event === 'Work'
                                                                ? 'badge badge-outline-warning'
                                                                : data.event === 'Travel'
                                                                ? 'badge badge-outline-success'
                                                                : data.event === 'Important'
                                                                ? 'badge badge-outline-danger'
                                                                : 'badge badge-outline-warning'
                                                        }`}
                                                    >
                                                        {data.event}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge whitespace-nowrap ${
                                                            data.status === 'Completed'
                                                                ? 'badge badge-outline-primary   '
                                                                : data.status === 'Pending'
                                                                ? 'badge badge-outline-success'
                                                                : data.status === 'Rescheduled'
                                                                ? 'badge badge-outline-secondary'
                                                                : data.status === 'In Progress'
                                                                ? 'badge badge-outline-secondary'
                                                                : data.status === 'Cancelled'
                                                                ? 'badge badge-outline-danger'
                                                                : 'badge badge-outline-primary'
                                                        }`}
                                                    >
                                                        {data.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
