import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from '@/components/Input';
export default function Account() {

  const validationSchema = Yup.object({
    gstIn: Yup.string().required("GSTIN is required"),
    pan: Yup.string().required("PAN is required"),
    name: Yup.string().required("Name is required"),
    phoneNo: Yup.number().required("Phone number is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      gstIn: "",
      pan: "",
      name: "",
      phoneNo: 0,
      email: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      window.api.query(`UPDATE account SET gstIn = '${values.gstIn}', pan = '${values.pan}', name = '${values.name}', phoneNo = ${values.phoneNo}, email = '${values.email}' WHERE id = 1`);
    }
  });

  React.useEffect(() => {
    window.api.query('SELECT * FROM account WHERE id = 1');
    window.api.onQueryReply((data: any) => {
      formik.setValues({
        gstIn: data[0].gstIn,
        pan: data[0].pan,
        name: data[0].name,
        phoneNo: data[0].phoneNo,
        email: data[0].email,
      });
    });
  }, []);

  return (
    <div className='window'>
      <div className='w-full justify-center flex'>
        <h1>Account</h1>
      </div>
      <div style={{
        width: '100%',
      }} className='w-full flex-col items-center justify-center flex'>
        <div className='w-full px-10'>
          <form onSubmit={formik.handleSubmit}>
            <Input
              label='GSTIN'
              placeholder='Enter your GSTIN'
              type='text'
              width='full'
              value={formik.values.gstIn}
              setValue={formik.handleChange('gstIn')}
              error={{
                message: formik.errors.gstIn,
                show: formik.touched.gstIn || !!formik.errors.gstIn
              }}
            />
            <Input
              label='PAN'
              placeholder='Enter your PAN'
              type='text'
              width='full'
              value={formik.values.pan}
              setValue={formik.handleChange('pan')}
              error={{
                message: formik.errors.pan,
                show: formik.touched.pan || !!formik.errors.pan
              }}
            />
            <Input
              label='Name'
              placeholder='Enter your name'
              type='text'
              width='full'
              value={formik.values.name}
              setValue={formik.handleChange('name')}
              error={{
                message: formik.errors.name,
                show: formik.touched.name || !!formik.errors.name
              }}
            />
            <Input
              label='Phone Number'
              placeholder='Enter your phone number'
              type='text'
              width='full'
              value={formik.values.phoneNo}
              setValue={formik.handleChange('phoneNo')}
              error={{
                message: formik.errors.phoneNo,
                show: formik.touched.phoneNo || !!formik.errors.phoneNo
              }}
            />
            <Input
              label='Email'
              placeholder='Enter your email'
              type='text'
              width='full'
              value={formik.values.email}
              setValue={formik.handleChange('email')}
              error={{
                message: formik.errors.email,
                show: formik.touched.email || !!formik.errors.email
              }}
            />
            <div className='w-full flex items-center justify-center mt-10'>
              <button type='submit' className='btn-primary px-2 w-24 py-2 rounded-md'>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
