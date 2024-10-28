import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
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

const UsersTable = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('All Appointments'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [error, setError] = useState('');
    const [modal1, setModal1] = useState(false);
    const [events2, setEvents2] = useState<any[]>([]); // Initialize with an empty array
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [modalEdit, setModalEdit] = useState(false);

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [roles, setRoles] = useState<{ roleId: number; roleName: string }[]>([]);
    const [roleId, setRoleId] = useState<number | ''>('');

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:4002/api/roles');
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

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4002/api/users');
            console.log('API Response:', response.data);

            if (response.data.success === true) {
                const rowData = response.data.data; // Adjust according to the actual structure
                setInitialRecords(rowData);
                setRecordsData(rowData.slice(0, pageSize));
                console.log('Fetched users:', rowData);
            } else {
                console.error('Failed to fetch users:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching users', error);
            setInitialRecords([]); // Reset initialRecords on error
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUserDetails = async (userId: any) => {
        try {
            const response = await axios.get(`http://localhost:4002/api/editing/${userId}`);
            console.log('User Details:', response.data);

            if (response.data.success) {
                const user = response.data.data; // This is a single user object
                // Format the user object
                const formattedEvent = {
                    id: user.userId,
                    title: user.fullname,
                    email: user.email,
                    phone: user.phone,
                    type: user.role,
                };

                // Set the selected event to the formatted event object
                setSelectedUser(formattedEvent);
                console.log('Fetched user to be updated:', formattedEvent);
            } else {
                console.error('Failed to fetch user details:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const col = ['Number', 'Name', 'Email', 'Phone', 'Address', 'Role'];

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
                    item.userId.toString().includes(search.toLowerCase()) ||
                    item.fullname.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase()) ||
                    item.address.toLowerCase().includes(search.toLowerCase()) ||
                    item.role.toLowerCase().includes(search.toLowerCase())
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

    const header = ['Number', 'Name', 'Email', 'Phone', 'Address', 'Role'];

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

    const submitForm = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            console.log({
                fullname,
                email,
                phone,
                address,
                roleId,
            });

            const response = await axios.post('http://localhost:4002/api/register', {
                fullname,
                phone,
                email,
                address,
                roleId,
            });

            console.log(response.data); // Log the response

            if (response.data.success) {
                showMessage('User has been created successfully.');
                setModal1(false);
                navigate('/users/user-table');
            } else {
                showMessage('Failed to update user:', response.data.message);
                setError(response.data.error || 'An error occurred');
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            setError('An error occurred. Please try again later.');
        }
    };

    const updateForm = async (e: { preventDefault: () => void }) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Updating user with ID:', selectedUser.id);
        console.log('Selected user Data:', selectedUser);

        // Prepare the updated appointment data
        const updatedUserData = {
            fullname: selectedUser.title, // Ensure this matches your data structure
            email: selectedUser.email,
            phone: selectedUser.phone,
            address: selectedUser.location,
            roleId: selectedUser.type, // Change this to match the expected field name
        };

        try {
            // Send the PUT request with the updated appointment details
            const response = await axios.put(`http://localhost:4002/api/update_user/${selectedUser.id}`, updatedUserData);

            if (response.data.success) {
                console.log('User updated successfully:', response.data.message);
                // Optionally, you can close the modal or reset the form here
                showMessage('User has been updated successfully.');
                setModalEdit(false);
                // You may also want to refetch the appointment details or update the state
            } else {
                showMessage('Failed to update user:', response.data.message);
                console.error('Failed to update user:', response.data.message);
                // You can display an error message to the user here
            }
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle the error, e.g., show a notification to the user
        }
    };

    const handleEdit = async (userId: string) => {
        await fetchUserDetails(userId); // Fetch appointment details
        setModalEdit(true); // Show the modal
    };

    const deleteUser = async (userId: string) => {
        try {
            const response = await axios.delete(`http://localhost:4002/api/editing/${userId}`);
            console.log('Delete Response:', response.data);

            if (response.data.success) {
                showMessage('User has been deleted successfully.');
                console.log('User deleted successfully:', response.data.message);
            } else {
                showMessage('Failed to delete user. Please try again!');
                console.error('Failed to delete user:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Example usage of deleteAppointment function
    const handleDelete = async (userId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            await deleteUser(userId);
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
                    <span>Users</span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                    <div className="flex items-center flex-wrap">
                        <button type="button" className="btn btn-primary" onClick={() => setModal1(true)}>
                            <IconPlus className="ltr:mr-2 rtl:ml-2" />
                            Create User
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
                            { accessor: 'userId', title: 'Number', sortable: true },
                            { accessor: 'fullname', title: 'Name', sortable: true },
                            { accessor: 'email', title: 'Email', sortable: true },
                            { accessor: 'phone', title: 'Phone', sortable: true },
                            { accessor: 'address', title: 'Address', sortable: true },
                            { accessor: 'role', title: 'Role', sortable: true },
                            {
                                accessor: 'actions',
                                title: 'Actions',
                                sortable: false,
                                render: (row) => (
                                    <div>
                                        <ul className="flex items-center justify-center gap-2">
                                            <li>
                                                <Tippy content="Edit">
                                                    <button type="button" onClick={() => handleEdit(row.userId)}>
                                                        <IconPencil className="text-success" />
                                                    </button>
                                                </Tippy>
                                            </li>
                                            <li>
                                                <Tippy content="Delete">
                                                    <button type="button" onClick={() => handleDelete(row.userId)}>
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
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Add User</div>
                                    <div className="p-5">
                                        <form className="space-y-5" onSubmit={submitForm}>
                                            <div>
                                                <label htmlFor="title">Full Name :</label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    name="title"
                                                    className="form-input"
                                                    placeholder="Enter Full Name"
                                                    required
                                                    value={fullname}
                                                    onChange={(e) => setFullname(e.target.value)}
                                                />
                                                <div className="text-danger mt-2" id="titleErr"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="phone">Email :</label>
                                                <input
                                                    id="phone"
                                                    type="text"
                                                    name="phone"
                                                    className="form-input"
                                                    placeholder="Enter Phone Number"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <div className="text-danger mt-2" id="phoneErr"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="email">Address :</label>
                                                <input
                                                    id="email"
                                                    type="text"
                                                    name="email"
                                                    className="form-input"
                                                    placeholder="Enter Address"
                                                    required
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                                <div className="text-danger mt-2" id="emailErr"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="phone">Phone Number :</label>
                                                <input
                                                    id="phone"
                                                    type="text"
                                                    name="phone"
                                                    className="form-input"
                                                    placeholder="Enter Phone Number"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <div className="text-danger mt-2" id="phoneErr"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="Type">Select Role</label>
                                                <div className="relative text-white-dark">
                                                    <select
                                                        id="Type"
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
                                                </div>
                                            </div>

                                            <div className="flex justify-end items-center !mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Create User
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
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Edit User</div>
                                    <div className="p-5">
                                        <form className="space-y-5" onSubmit={updateForm}>
                                            <div>
                                                <label htmlFor="title">Full Name :</label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    name="title"
                                                    className="form-input"
                                                    placeholder="Enter Full Name"
                                                    required
                                                    value={selectedUser?.title || ''} // Use selectedEvent title
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, title: e.target.value })}
                                                />
                                                <div className="text-danger mt-2" id="titleErr"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="email">Email :</label>
                                                <input
                                                    id="email"
                                                    type="text"
                                                    name="email"
                                                    className="form-input"
                                                    placeholder="Enter Email"
                                                    required
                                                    value={selectedUser?.email || ''} // Use selectedEvent location
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                                />
                                                <div className="text-danger mt-2" id="emailErr"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="location">Address :</label>
                                                <input
                                                    id="location"
                                                    type="text"
                                                    name="location"
                                                    className="form-input"
                                                    placeholder="Enter Address"
                                                    required
                                                    value={selectedUser?.location || ''} // Use selectedEvent location
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, location: e.target.value })}
                                                />
                                                <div className="text-danger mt-2" id="locationErr"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="phone">Phone Number :</label>
                                                <input
                                                    id="phone"
                                                    type="text"
                                                    name="phone"
                                                    className="form-input"
                                                    placeholder="Enter Phone Number"
                                                    required
                                                    value={selectedUser?.phone || ''} // Use selectedEvent phone
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                                                />
                                                <div className="text-danger mt-2" id="phoneErr"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="type">Select Role</label>
                                                <div className="relative text-white-dark">
                                                    <select
                                                        id="type"
                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                        value={selectedUser?.type || ''} // Use selectedEvent eventId
                                                        onChange={(e) => setSelectedUser({ ...selectedUser, type: Number(e.target.value) })}
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
                                                </div>
                                            </div>

                                            <div className="flex justify-end items-center !mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModalEdit(false)}>
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Update User
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

export default UsersTable;
