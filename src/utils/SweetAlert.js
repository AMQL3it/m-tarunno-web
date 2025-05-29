import Swal from 'sweetalert2';

const SweetAlert = {
    // Success Alert
    successAlert: (message) => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            timer: 1500,
            showConfirmButton: false,
        });
    },

    // Error Alert
    errorAlert: (message = "Something went wrong!") => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            timer: 2000,
            showConfirmButton: false,
        });
    },

    // Confirm Alert (general purpose)
    confirmAlert: async (title = "Are you sure?", text = "You won't be able to revert this!") => {
        const result = await Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm it!',
        });
        return result.isConfirmed;
    },

    // Confirm Delete Alert (for delete specifically)
    deleteAlert: async (text = "You won't be able to recover this!") => {
        const result = await Swal.fire({
            title: 'Are you sure you want to delete?',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
        return result.isConfirmed;
    },

    infoAlert: (message) => {
        Swal.fire({
            icon: 'info',
            title: 'Info',
            text: message,
            timer: 1500,
            showConfirmButton: false,
        });
    },
    
    warningAlert: (message) => {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: message,
            timer: 1500,
            showConfirmButton: false,
        });
    },
    
    loadingAlert: (message = "Please wait...") => {
        Swal.fire({
            title: message,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    },
    
    closeLoading: () => {
        Swal.close();
    },
};

export default SweetAlert;
