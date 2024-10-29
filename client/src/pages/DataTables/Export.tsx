import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconPencil from '../../components/Icon/IconPencil';
import IconSettings from '../../components/Icon/IconSettings';
import IconPlus from '../../components/Icon/IconPlus';
import IconX from '../../components/Icon/IconX';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Export = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('All Appointments'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });

    const [appointmentName, setAppointmentName] = useState('');
    const [appointmentLocation, setAppointmentLocation] = useState('');
    const [events, setEvents] = useState<{ eventId: string; eventName: string }[]>([]);
    const [eventId, setEventId] = useState<string | ''>('');
    const [status, setStatus] = useState<{ statusId: string; statusName: string }[]>([]);
    const [statusId, setStatusId] = useState<string | ''>('');
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

    const formatDate = (dateString: string | number | Date) => {
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

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('https://server-side-5zbf.onrender.com/api/appointments');
            console.log('API Response:', response.data);

            if (response.data.success === true) {
                let rowData = response.data.data;
                rowData = rowData.map((appointment: { appointmentFrom: string | number | Date; appointmentTo: string | number | Date }) => ({
                    ...appointment,
                    appointmentFrom: reverseDate(appointment.appointmentFrom),
                    appointmentTo: reverseDate(appointment.appointmentTo),
                }));

                setInitialRecords(rowData);
                setRecordsData(rowData.slice(0, pageSize));
                console.log('Fetched appointments:', rowData);
            } else {
                console.error('Failed to fetch appointments:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching appointments', error);
            setInitialRecords([]); // Reset initialRecords on error
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

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

    const col = ['Number', 'Name', 'Location', 'From', 'To', 'Type', 'Status'];

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        if (Array.isArray(initialRecords)) {
            const from = (page - 1) * pageSize;
            const to = from + pageSize;
            setRecordsData(initialRecords.slice(from, to));
        } else {
            console.error('initialRecords is not an array:', initialRecords);
        }
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return initialRecords.filter((item: any) => {
                return (
                    item.appointmentId.toString().includes(search.toLowerCase()) ||
                    item.appointmentName.toLowerCase().includes(search.toLowerCase()) ||
                    item.appointmentLocation.toLowerCase().includes(search.toLowerCase()) ||
                    item.appointmentFrom.toLowerCase().includes(search.toLowerCase()) ||
                    item.appointmentTo.toLowerCase().includes(search.toLowerCase()) ||
                    item.event.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const header = ['Number', 'Name', 'Location', 'From', 'To', 'Type', 'Status'];

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

    const fetchAppointmentDetails = async (appointmentId: string) => {
        try {
            const response = await axios.get(`https://server-side-5zbf.onrender.com/api/appointments/${appointmentId}`);
            console.log('Appointment Details:', response.data);

            if (response.data.success) {
                const appointment = response.data.data; // This is a single appointment object

                console.log('Appointment Event:', appointment.event);
                console.log('Appointment Status:', appointment.status);
                console.log('Events Array:', events);
                console.log('Status Array:', status);

                // Find the event and status objects as before
                const eventObj = events.find((event) => event.eventName === appointment.event);
                const statusObj = status.find((stat) => stat.statusName === appointment.status);

                // Format the appointment object
                const formattedEvent = {
                    id: appointment.appointmentId,
                    title: appointment.appointmentName,
                    start: formatDate(appointment.appointmentFrom),
                    end: formatDate(appointment.appointmentTo),
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
            console.error('Error fetching appointment details:', error);
        }
    };

    const handleEdit = async (appointmentId: string) => {
        await fetchAppointmentDetails(appointmentId); // Fetch appointment details
        setModalEdit(true); // Show the modal
    };

    const deleteAppointment = async (appointmentId: string) => {
        try {
            const response = await axios.delete(`https://server-side-5zbf.onrender.com/api/appointments/${appointmentId}`);
            console.log('Delete Response:', response.data);

            if (response.data.success) {
                showMessage('Appointment has been deleted successfully.');
                console.log('Appointment deleted successfully:', response.data.message);
            } else {
                showMessage('Failed to delete appointment. Please try again!');
                console.error('Failed to delete appointment:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    // Example usage of deleteAppointment function
    const handleDelete = async (appointmentId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
        if (confirmDelete) {
            await deleteAppointment(appointmentId);
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Board
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Appointments</span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                    <div className="flex items-center flex-wrap">
                        <button type="button" className="btn btn-primary" onClick={() => setModal1(true)}>
                            <IconPlus className="ltr:mr-2 rtl:ml-2" />
                            Create Appointment
                        </button>
                    </div>

                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'appointmentId', title: 'Number', sortable: true },
                            { accessor: 'appointmentName', title: 'Name', sortable: true },
                            { accessor: 'appointmentLocation', title: 'Location', sortable: true },
                            { accessor: 'appointmentFrom', title: 'From', sortable: true },
                            { accessor: 'appointmentTo', title: 'To', sortable: true },
                            { accessor: 'event', title: 'Type', sortable: true },
                            { accessor: 'status', title: 'Status', sortable: true },
                            {
                                accessor: 'actions',
                                title: 'Actions',
                                sortable: false, // Actions usually don't need sorting
                                render: (row) => (
                                    <div>
                                        <ul className="flex items-center justify-center gap-2">
                                            <li>
                                                <Tippy content="Edit">
                                                    <button type="button" onClick={() => handleEdit(row.appointmentId)}>
                                                        <IconPencil className="text-success" />
                                                    </button>
                                                </Tippy>
                                            </li>
                                            <li>
                                                <Tippy content="Delete">
                                                    <button type="button" onClick={() => handleDelete(row.appointmentId)}>
                                                        <IconTrashLines className="text-danger" />
                                                    </button>
                                                </Tippy>
                                            </li>
                                        </ul>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
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
                                                                    onChange={(e) => setEventId(e.target.value)}
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
                                                        onChange={(e) => setStatusId(e.target.value)} // Convert value to number
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
                                                        onChange={(e) => setSelectedEvent({ ...selectedEvent, type: e.target.value })}
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
                                                        onChange={(e) => setSelectedEvent({ ...selectedEvent, className: e.target.value })}
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

export default Export;
