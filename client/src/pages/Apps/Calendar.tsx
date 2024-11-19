import FullCalendar from '@fullcalendar/react';
// import '@fullcalendar/core';
import { Link, useNavigate } from 'react-router-dom';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconPlus from '../../components/Icon/IconPlus';
import IconX from '../../components/Icon/IconX';
import axios from 'axios';

const Calendar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Calendar'));
    });

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
    const [modal1, setModal1] = useState(false);
    const [events2, setEvents2] = useState<any[]>([]); // Initialize with an empty array
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [modalEdit, setModalEdit] = useState(false);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/events');
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
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/status');
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

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    const reverseDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        // Removed seconds and milliseconds since you only need "yyyy-MM-ddThh:mm"
        return `${year}-${month}-${day}T${hours}:${minutes}`; // Adjusted format for datetime-local
    };

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

    const fetchEvents2 = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/appointments');
            console.log('API Response:', response.data);

            if (response.data.success === true) {
                // Map the fetched appointments to the required structure
                const formattedEvents = response.data.data.map(
                    (appointment: { eventId: any; appointmentId: any; appointmentName: any; appointmentFrom: any; appointmentTo: any; appointmentDescription: any }) => {
                        // Determine the class based on the type
                        let className = '';
                        switch (appointment.eventId) {
                            case 1:
                                className = 'bg-success text-white'; // Bootstrap danger
                                break;
                            case 2:
                                className = 'bg-primary text-white'; // Bootstrap success
                                break;
                            case 3:
                                className = 'bg-info text-white'; // Bootstrap info
                                break;
                            case 4:
                                className = 'bg-danger text-white'; // Bootstrap info
                                break;
                            default:
                                className = 'bg-primary text-white'; // Default
                        }

                        return {
                            id: appointment.appointmentId,
                            title: appointment.appointmentName,
                            start: appointment.appointmentFrom,
                            end: appointment.appointmentTo,
                            classNames: [className], // Set the Bootstrap class names
                            description: appointment.appointmentDescription,
                            type: appointment.eventId,
                        };
                    }
                );
                setEvents2(formattedEvents); // Set the formatted events
                console.log('Fetched appointments:', formattedEvents);
            }
        } catch (error) {
            console.error('Error fetching appointments to render on calender', error);
        }
    };

    useEffect(() => {
        fetchEvents2();
    }, []);

    const fetchAppointmentDetails = async (appointmentId: string) => {
        try {
            const response = await axios.get(`https://server-side-5zbf.onrender.com/api/appointments/${appointmentId}`);
            console.log('Appointment Details:', response.data);

            if (response.data.success) {
                const appointment = response.data.data; // This is a single appointment object

                // Find the event and status objects as before
                const eventObj = events.find((event) => event.eventName === appointment.event);
                const statusObj = status.find((stat) => stat.statusName === appointment.status);

                // Format the appointment object
                const formattedEvent = {
                    id: appointment.appointmentId,
                    title: appointment.appointmentName,
                    start: reverseDate(appointment.appointmentFrom),
                    end: reverseDate(appointment.appointmentTo),
                    className: statusObj ? statusObj.statusId : null,
                    description: appointment.appointmentDescription,
                    type: eventObj ? eventObj.eventId : null,
                    location: appointment.appointmentLocation,
                };

                // Set the selected event to the formatted event object
                setSelectedEvent(formattedEvent);
                console.log('Fetched appointment to be updated:', formattedEvent);
            } else {
                console.error('Failed to fetch appointment details:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching appointment details to be updated:', error);
        }
    };

    const editDate = (data: any) => {
        let obj = {
            event2: {
                start: data.start,
                end: data.end,
            },
        };
        // fetchAppointmentDetails(obj);
    };

    const submitForm = async (e: { preventDefault: () => void }) => {
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

            const response = await axios.post('https://server-side-5zbf.onrender.com/api/create_appointment', {
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
                showMessage('Appointment has been created successfully.');
                setModal1(false);
                window.location.reload();
                navigate('/apps/calendar');
            } else {
                showMessage('Failed to update appointment:', response.data.message);
                setError(response.data.error || 'An error occurred');
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            setError('An error occurred. Please try again later.');
        }
    };

    const updateForm = async (e: { preventDefault: () => void }) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Updating appointment with ID:', selectedEvent.id);
        console.log('Selected Event Data:', selectedEvent);

        // Prepare the updated appointment data
        const updatedAppointmentData = {
            appointmentName: selectedEvent.title, // Ensure this matches your data structure
            appointmentDescription: selectedEvent.description,
            appointmentLocation: selectedEvent.location,
            appointmentFrom: formatDate(selectedEvent.start),
            appointmentTo: formatDate(selectedEvent.end),
            eventId: selectedEvent.type, // Change this to match the expected field name
            statusId: selectedEvent.className, // Change this to match the expected field name
        };

        try {
            // Send the PUT request with the updated appointment details
            const response = await axios.put(`https://server-side-5zbf.onrender.com/api/update_appointment/${selectedEvent.id}`, updatedAppointmentData);

            if (response.data.success) {
                console.log('Appointment updated successfully:', response.data.message);
                // Optionally, you can close the modal or reset the form here
                showMessage('Appointment has been updated successfully.');
                setModalEdit(false);
                window.location.reload();
                // You may also want to refetch the appointment details or update the state
            } else {
                showMessage('Failed to update appointment:', response.data.message);
                console.error('Failed to update appointment:', response.data.message);
                // You can display an error message to the user here
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
            // Handle the error, e.g., show a notification to the user
        }
    };

    return (
        <div>
            <div className="panel mb-5">
                <div className="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center">
                    <div className="sm:mb-0 mb-4">
                        <div className="text-lg font-semibold ltr:sm:text-left rtl:sm:text-right text-center">Calendar</div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => setModal1(true)}>
                        <IconPlus className="ltr:mr-2 rtl:ml-2" />
                        Create Appointment
                    </button>
                </div>
                <div className="calendar-wrapper">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        editable={true}
                        dayMaxEvents={true}
                        selectable={true}
                        droppable={true}
                        eventClick={(event) => {
                            const clickedEvent = event.event; // Get the clicked event
                            const appointmentId = clickedEvent.id; // Access the appointmentId
                            console.log('Clicked Appointment ID:', appointmentId);
                            // You can now fetch or display details for this specific appointment
                            fetchAppointmentDetails(appointmentId);
                            setModalEdit(true);
                        }}
                        select={(event: any) => editDate(event)}
                        events={events2}
                    />
                </div>
            </div>

            {/* add event modal */}
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
                                                <label>Select Appointment Type:</label>
                                                <div className="mt-3">
                                                    {events.length > 0 ? (
                                                        events.map((event) => (
                                                            <label
                                                                key={event.eventId}
                                                                className={`inline-flex cursor-pointer ltr:mr-3 rtl:ml-3 ${event.eventId === eventId ? 'bg-primary-500 text-info' : 'bg-success-200'}`}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    className="form-radio"
                                                                    name="eventType"
                                                                    value={event.eventId}
                                                                    checked={eventId === event.eventId}
                                                                    onChange={(e) => setEventId(Number(e.target.value))}
                                                                />
                                                                <span className="ltr:pl-2 rtl:pr-2">{event.eventName}</span>
                                                            </label>
                                                        ))
                                                    ) : (
                                                        <span>No types available</span>
                                                    )}
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
            <Transition appear show={modalEdit} as={Fragment}>
                <Dialog as="div" onClose={() => setModalEdit(false)} open={modalEdit} className="relative z-[51]">
                    {/* Modal Overlay */}
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

                    {/* Modal Content */}
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
                                        onClick={() => setModalEdit(false)}
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Edit Appointment</div>
                                    <div className="p-5">
                                        <form className="space-y-5" onSubmit={updateForm}>
                                            <div>
                                                <label htmlFor="title">Appointment Name :</label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    name="title"
                                                    className="form-input"
                                                    placeholder="Enter Appointment Name"
                                                    required
                                                    value={selectedEvent?.title || ''} // Use selectedEvent title
                                                    onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
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
                                                    value={selectedEvent?.location || ''} // Use selectedEvent location
                                                    onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
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
                                                    value={selectedEvent?.start || ''} // Use selectedEvent start
                                                    onChange={(e) => setSelectedEvent({ ...selectedEvent, start: e.target.value })}
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
                                                    value={selectedEvent?.end || ''} // Use selectedEvent end
                                                    onChange={(e) => setSelectedEvent({ ...selectedEvent, end: e.target.value })}
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
                                                    value={selectedEvent?.description || ''} // Use selectedEvent description
                                                    onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                                                ></textarea>
                                            </div>

                                            <div>
                                                <label htmlFor="Event">Select Appointment Type</label>
                                                <div className="relative text-white-dark">
                                                    <select
                                                        id="Event"
                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                        value={selectedEvent?.type || ''} // Use selectedEvent eventId
                                                        onChange={(e) => setSelectedEvent({ ...selectedEvent, type: Number(e.target.value) })}
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
                                                        value={selectedEvent?.className || ''}
                                                        onChange={(e) => setSelectedEvent({ ...selectedEvent, className: Number(e.target.value) })}
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
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModalEdit(false)}>
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Update Appointment
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
    );
};

export default Calendar;
