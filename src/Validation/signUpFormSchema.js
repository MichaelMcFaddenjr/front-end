import * as yup from 'yup';

const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .required('Username is required'),
    email: yup
        .string()
        .trim()
        .email('Please enter a valid email address')
        .required('Email is required'),
    phone: yup
        .string()
        .trim()
        .matches(phoneRegex, 'Please enter a valid phone number')
        .required('Phone is required'),
});

export default formSchema;