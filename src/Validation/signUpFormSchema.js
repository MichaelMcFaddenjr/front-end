import * as yup from 'yup';

const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passRegex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const formSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .min(3, 'Username must be at least three characters')
        .required('Username is required'),
    password: yup
        .string()
        .matches(passRegex, 'Password must contain at least 8 characters, one uppercase, one number and one special case character')
        .required('Password is required'),
    phone_number: yup
        .string()
        .trim()
        .matches(phoneRegex, 'Please enter a valid phone number')
        .required('Phone is required'),
});

export default formSchema;