import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export default function Auth() {

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    const [isLoginSuccessful, setIsLoginSuccessful] = React.useState(false);
    const [clickedSubmit, setClickedSubmit] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            username: 'pkr',
            password: '123'
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            setClickedSubmit(true);
            if(values.username === 'lemengras' && values.password === '123') {
                console.log('Login successful');
                window.auth.login({
                    accountType: 'CHILD'
                });
                setIsLoginSuccessful(true);
            } else if(values.username === 'pkr' && values.password === '123') {
                console.log('Login successful');
                window.auth.login({
                    accountType: 'PARENT'
                });
                setIsLoginSuccessful(true);
            } else{
                console.log('Login failed');
                setIsLoginSuccessful(false);
            }
        }
    });

    return (
        <div className='window flex flex-col items-center justify-center py-5 gap-2 px-10'>
            <h1 className='text-xl'>Login</h1>
            <form onSubmit={formik.handleSubmit} className='w-full flex flex-col gap-2'>
                <input
                    type='text'
                    name='username'
                    value={formik.values.username}
                    placeholder='Username'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='rounded-md py-2 border border-2 border-gray-400 px-2 w-full' />
                {
                    formik.touched.username && formik.errors.username ? (
                        <div className='text-red-500'>{formik.errors.username}</div>
                    ) : null
                }
                <input
                    type='password'
                    name='password'
                    value={formik.values.password}
                    placeholder='Password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='rounded-md py-2 border border-2 border-gray-400 px-2 w-full' />
                {
                    formik.touched.password && formik.errors.password ? (
                        <div className='text-red-500'>{formik.errors.password}</div>
                    ) : null
                }
                <button type="submit" className='bg-gray-500 text-white rounded-md py-2 px-4'>Login</button>
                {
                    !isLoginSuccessful && clickedSubmit ? (
                        <div className='text-red-500'>Login failed</div>
                    ) : null
                }
            </form>
        </div>
    )
}
