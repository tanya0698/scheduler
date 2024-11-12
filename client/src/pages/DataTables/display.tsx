import { useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import 'tippy.js/dist/tippy.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import axios from 'axios';

const Tables = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>([]); // Initialize as an empty array
    const [currentDateTime, setCurrentDateTime] = useState<string>('');
    const [isFullscreen, setIsFullscreen] = useState(false);

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
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/current');
            console.log('Current Appointment Details:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.data; // Adjust according to the actual structure
                setInitialRecords(rowData);
                setRecordsData(rowData);
                console.log('Fetched current appointments:', rowData);
            } else {
                console.error('Failed to fetch current appointments:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching current appointments', error);
            setInitialRecords([]);
        }
    };

    useEffect(() => {
        fetchAppointments();

        const intervalFetch = setInterval(() => {
            fetchAppointments();
        }, 10000);

        const intervalDateTime = setInterval(() => {
            setCurrentDateTime(new Date().toLocaleString());
        }, 1000);

        return () => {
            clearInterval(intervalFetch);
            clearInterval(intervalDateTime);
        };
    }, []);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'auto',
                backgroundColor: 'navy',
                zIndex: 999,
            }}
        >
            <div className="grid grid-cols-12 gap-6 h-full">
                <div className="col-span-12 h-full">
                    {/* dropdown */}
                    <div className="panel h-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 style={{ color: 'navy', fontWeight: 'bold' }} className="font-bold text-lg dark:text-white-light">
                                Appointments Display
                            </h5>
                            <button type="button" onClick={toggleFullscreen} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                                <span style={{ color: 'navy', fontWeight: 'bold' }} className="flex items-center">
                                    {currentDateTime}
                                </span>
                            </button>
                        </div>
                        <div className="table-responsive mb-5">
                            <table style={{ backgroundColor: 'navy', width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={{ color: 'navy', fontWeight: 'bold' }}>NUMBER</th>
                                        <th style={{ color: 'navy', fontWeight: 'bold' }}>NAME</th>
                                        <th style={{ color: 'navy', fontWeight: 'bold' }}>LOCATION</th>
                                        <th style={{ color: 'navy', fontWeight: 'bold' }}>FROM</th>
                                        <th style={{ color: 'navy', fontWeight: 'bold' }}>TO</th>
                                        <th style={{ color: 'navy', fontWeight: 'bold' }}>TYPE</th>
                                        <th style={{ color: 'navy', fontWeight: 'bold' }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recordsData.map((data, index) => {
                                        return (
                                            <tr key={data.appointmentId} style={{ backgroundColor: index % 2 === 0 ? 'navy' : '#024CAA', color: 'white' }}>
                                                {' '}
                                                {/* Add a unique key here */}
                                                <td>{data.appointmentId}</td>
                                                <td>
                                                    <div className="whitespace-nowrap">{data.appointmentName}</div>
                                                </td>
                                                <td>{data.appointmentLocation}</td>
                                                <td>{reverseDate(data.appointmentFrom)}</td>
                                                <td>{reverseDate(data.appointmentTo)}</td>
                                                <td style={{ fontWeight: 'bold' }}>{data.event}</td>
                                                <td style={{ fontWeight: 'bold' }}>{data.status}</td>
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

export default Tables;
