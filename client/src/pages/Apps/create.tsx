import { Link, useNavigate } from 'react-router-dom';
import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import 'swiper/css';
import { setPageTitle } from '../../store/themeConfigSlice';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import IconBell from '../../components/Icon/IconBell';
import IconCode from '../../components/Icon/IconCode';
import IconX from '../../components/Icon/IconX';
import axios from 'axios';

const Create = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Modals'));
    });
    const [modal1, setModal1] = useState(false);

    const [appointmentName, setAppointmentName] = useState('');
    const [appointmentLocation, setAppointmentLocation] = useState('');
    const [events, setEvents] = useState<{ eventId: number; eventName: string }[]>([]);
    const [eventId, setEventId] = useState<number | ''>('');
    const [status, setStatus] = useState<{ statusId: number; statusName: string }[]>([]);
    const [statusId, setStatusId] = useState<number | ''>('');
    const [appointmentDescription, setAppointmentDescription] = useState('');
    const [appointmentFrom, setAppointmentFrom] = useState('');
    const [appointmentTo, setAppointmentTo] = useState('');
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:4002/api/events');
            console.log('API Response:', response.data);

            if (response.data.success === true) {
                // Check for success
                setEvents(response.data.data);
                console.log('Fetched types:', response.data.data);
            }
        } catch (error) {
            console.error('Error fetching types', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await axios.get('http://localhost:4002/api/status');
            console.log('API Response:', response.data);

            if (response.data.success === true) {
                // Check for success
                setStatus(response.data.data);
                console.log('Fetched status:', response.data.data);
            }
        } catch (error) {
            console.error('Error fetching status', error);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const formattedFrom = formatDate(appointmentFrom);
            const formattedTo = formatDate(appointmentTo);
            console.log({
                appointmentName,
                appointmentDescription,
                appointmentLocation,
                appointmentFrom,
                appointmentTo,
                eventId,
                statusId,
            });

            const response = await axios.post('http://localhost:4002/api/create_appointment', {
                appointmentName,
                appointmentLocation,
                appointmentFrom: formattedFrom,
                appointmentTo: formattedTo,
                appointmentDescription,
                eventId,
                statusId,
            });

            console.log(response.data); // Log the response

            if (response.data.success) {
                navigate('/apps/calender');
            } else {
                setError(response.data.error || 'An error occurred');
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            setError('An error occurred. Please try again later.');
        }
    };
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Components
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Modals</span>
                </li>
            </ul>
            <div className="space-y-8 pt-5">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Basic */}
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Basic</h5>
                        </div>
                        <div className="mb-5">
                            <div className="flex items-center justify-center">
                                <button type="button" className="btn btn-primary" onClick={() => setModal1(true)}>
                                    Launch modal
                                </button>
                            </div>
                            <Transition appear show={modal1} as={Fragment}>
                                <Dialog as="div" onClose={() => setModal1(false)} open={modal1} className="relative z-[51]">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="duration-300 ease-out"
                                        enter-from="opacity-0"
                                        enter-to="opacity-100"
                                        leave="duration-200 ease-in"
                                        leave-from="opacity-100"
                                        leave-to="opacity-0"
                                    >
                                        <Dialog.Overlay className="fixed inset-0 bg-[black]/60" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="duration-300 ease-out"
                                                enter-from="opacity-0 scale-95"
                                                enter-to="opacity-100 scale-100"
                                                leave="duration-200 ease-in"
                                                leave-from="opacity-100 scale-100"
                                                leave-to="opacity-0 scale-95"
                                            >
                                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                                    <button
                                                        type="button"
                                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                        onClick={() => setModal1(false)}
                                                    >
                                                        <IconX />
                                                    </button>
                                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Add Appointment</div>
                                                    <div className="p-5">
                                                        <form className="space-y-5" onSubmit={submitForm}>
                                                            <div>
                                                                <label htmlFor="title">Appointment Name :</label>
                                                                <input
                                                                    id="title"
                                                                    type="text"
                                                                    name="title"
                                                                    className="form-input"
                                                                    placeholder="Enter Appointment Name"
                                                                    required
                                                                    value={appointmentName}
                                                                    onChange={(e) => setAppointmentName(e.target.value)}
                                                                />
                                                                <div className="text-danger mt-2" id="titleErr"></div>
                                                            </div>

                                                            <div>
                                                                <label htmlFor="location">Appointment Location :</label>
                                                                <input
                                                                    id="location"
                                                                    type="text"
                                                                    name="location"
                                                                    className="form-input"
                                                                    placeholder="Enter Appointment Location"
                                                                    required
                                                                    value={appointmentLocation}
                                                                    onChange={(e) => setAppointmentLocation(e.target.value)}
                                                                />
                                                                <div className="text-danger mt-2" id="locationErr"></div>
                                                            </div>

                                                            <div>
                                                                <label htmlFor="dateStart">From :</label>
                                                                <input
                                                                    id="start"
                                                                    type="datetime-local"
                                                                    name="start"
                                                                    className="form-input"
                                                                    placeholder="Appointment Start Date"
                                                                    required
                                                                    value={appointmentFrom}
                                                                    onChange={(e) => setAppointmentFrom(e.target.value)}
                                                                />
                                                                <div className="text-danger mt-2" id="startDateErr"></div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="dateEnd">To :</label>
                                                                <input
                                                                    id="end"
                                                                    type="datetime-local"
                                                                    name="end"
                                                                    className="form-input"
                                                                    placeholder="Appointment End Date"
                                                                    required
                                                                    value={appointmentTo}
                                                                    onChange={(e) => setAppointmentTo(e.target.value)}
                                                                />
                                                                <div className="text-danger mt-2" id="endDateErr"></div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="description">Appointment Description :</label>
                                                                <textarea
                                                                    id="description"
                                                                    name="description"
                                                                    className="form-textarea min-h-[130px]"
                                                                    placeholder="Enter Appointment Description"
                                                                    value={appointmentDescription}
                                                                    onChange={(e) => setAppointmentDescription(e.target.value)}
                                                                ></textarea>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="Event">Select Appointment Type</label>
                                                                <div className="relative text-white-dark">
                                                                    <select
                                                                        id="Event"
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                        value={eventId}
                                                                        onChange={(e) => setEventId(Number(e.target.value))} // Convert value to number
                                                                    >
                                                                        <option value="" disabled>
                                                                            Select Type
                                                                        </option>
                                                                        {events.length > 0 ? (
                                                                            events.map((event) => (
                                                                                <option key={event.eventId} value={event.eventId}>
                                                                                    {event.eventName}
                                                                                </option>
                                                                            ))
                                                                        ) : (
                                                                            <option value="" disabled>
                                                                                No types available
                                                                            </option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="Status">Select Appointment Status</label>
                                                                <div className="relative text-white-dark">
                                                                    <select
                                                                        id="Status"
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                        value={statusId}
                                                                        onChange={(e) => setStatusId(Number(e.target.value))} // Convert value to number
                                                                    >
                                                                        <option value="" disabled>
                                                                            Select Status
                                                                        </option>
                                                                        {status.length > 0 ? (
                                                                            status.map((stat) => (
                                                                                <option key={stat.statusId} value={stat.statusId}>
                                                                                    {stat.statusName}
                                                                                </option>
                                                                            ))
                                                                        ) : (
                                                                            <option value="" disabled>
                                                                                No status available
                                                                            </option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-end items-center !mt-8">
                                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
                                                                    Cancel
                                                                </button>
                                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                                    Create Appointment
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
