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

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        // Removed seconds and milliseconds since you only need "yyyy-MM-ddThh:mm"
        return (
            <>
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
                            <h5 style={{ color: 'navy', fontWeight: 'bold', fontSize: 35 }}>Appointments Display</h5>
                            <button type="button" onClick={toggleFullscreen} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                                <span style={{ color: 'navy', fontWeight: 'bold', fontSize: 25 }} className="flex items-center">
                                    {currentDateTime}
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between mb-5"></div>
                        <div className="table-responsive mb-5">
                            <table style={{ backgroundColor: 'navy', width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={{ color: 'navy', fontWeight: 'bold', fontSize: 25 }}>TIME</th>
                                        <th style={{ color: 'navy', fontWeight: 'bold', fontSize: 25 }}>NAME</th>
                                        <th style={{ color: 'navy', fontWeight: 'bold', fontSize: 25 }}>LOCATION</th>
                                        <th style={{ color: 'navy', fontWeight: 'bold', fontSize: 25 }}>TYPE</th>
                                        <th style={{ color: 'navy', fontWeight: 'bold', fontSize: 25 }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recordsData.map((data, index) => {
                                        return (
                                            <tr key={data.appointmentId} style={{ backgroundColor: index % 2 === 0 ? 'navy' : '#024CAA', color: 'white' }}>
                                                {' '}
                                                <td style={{ fontWeight: 'bold', fontSize: 20 }}>{reverseDate(data.appointmentFrom)}</td>
                                                <td style={{ fontWeight: 'bold', fontSize: 20, textTransform: 'uppercase' }}>
                                                    <div className="whitespace-nowrap">{data.appointmentName}</div>
                                                </td>
                                                <td style={{ fontWeight: 'bold', fontSize: 20, textTransform: 'uppercase' }}>{data.appointmentLocation}</td>
                                                <td
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 20,
                                                        textTransform: 'uppercase',
                                                        color: data.event === 'On Campus' ? '#F09319' : data.event === 'Off Campus' ? '#FA4032' : data.event === 'Travel' ? '#FFEB00' : 'white',
                                                    }}
                                                >
                                                    {data.event}
                                                </td>
                                                <td
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 20,
                                                        textTransform: 'uppercase',
                                                        color:
                                                            data.status === 'Pending'
                                                                ? '#F09319'
                                                                : data.status === 'Completed'
                                                                ? '#06D001'
                                                                : data.status === 'Cancelled'
                                                                ? '#FA4032'
                                                                : data.status === 'Rescheduled'
                                                                ? '#4CC9FE'
                                                                : data.status === 'InProgress'
                                                                ? '#9BEC00'
                                                                : 'white',
                                                    }}
                                                >
                                                    {data.status}
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

export default Tables;
