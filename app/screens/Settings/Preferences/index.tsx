// import React from 'react'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import Input from '@/components/Input';

// export default function Preference() {
//   const validationSchemaForParent = Yup.object({
//     username: Yup.string().required('Username is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const validationSchemaForChild = Yup.object({
//     username: Yup.string().required('Username is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const formikForParent = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//     },
//     validationSchema: validationSchemaForParent,
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       console.log(values);
//       window.api.query(`INSERT INTO login (username, password, role) VALUES ('${values.username}', '${values.password}'), 'parent'`)
//       // window.api.query(`UPDATE login SET password = '${values.password}' WHERE username = '${values.username}'`)
//     }
//   });

//   const formikForChild = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//     },
//     validationSchema: validationSchemaForChild,
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       console.log(values);
//       window.api.query(`INSERT INTO login (username, password, role) VALUES ('${values.username}', '${values.password}', 'child')`)
//       // window.api.query(`UPDATE login SET password = '${values.password}' WHERE username = '${values.username}'`)
//     }
//   });

 

//   return (
//     <div className='window w-full'
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//       }}
//     >
//       <div className='w-full justify-center flex'>
//         <h1>Preferences</h1>
//       </div>
//       <div className='gap-10'
//         style={{
//           width: '90%',
//           flexDirection: 'row',
//           display: 'flex',
//           margin: '10px 10px',
//         }}
//       >
//         <div className='w-full'>
//           <div className='w-full flex-col items-center justify-center flex'>
//             <h4>Parent</h4>
//           </div>
//           <form onSubmit={formikForParent.handleSubmit}>
//             <Input
//               label='Username'
//               placeholder='Enter your parent username'
//               type='text'
//               width='full'
//               value={formikForParent.values.username}
//               setValue={formikForParent.handleChange('username')}
//               error={{
//                 show: formikForParent.errors.username && formikForParent.touched.username,
//                 message: formikForParent.errors.username,
//               }}
//             />
            
//             <Input
//               label='Parent Password'
//               placeholder='Enter your parent password'
//               type='password'
//               width='full'
//               value={formikForParent.values.password}
//               setValue={formikForParent.handleChange('password')}
//               error={{
//                 show: formikForParent.errors.password && formikForParent.touched.password,
//                 message: formikForParent.errors.password,
//               }}
//             />
//             <div className='w-full flex justify-center'>
//               <button type='submit'
//                 className='btn btn-primary w-16'
//               >Submit</button>
//             </div>
//           </form>
//         </div>
//         <div className='w-full' style={{
//           width: '90%',
//         }}>
//           <div
//             className='w-full flex-col items-center justify-center flex'>
//             <h4>Child</h4>
//           </div>
//           <form onSubmit={formikForChild.handleSubmit}>
//             <Input
//               label='Parent Username'
//               placeholder='Enter your parent username'
//               type='text'
//               width='full'
//               value={formikForChild.values.username}
//               setValue={formikForChild.handleChange('username')}
//               error={{
//                 show: formikForChild.errors.username && formikForChild.touched.username,
//                 message: formikForChild.errors.username,
//               }}
//             />
            
//             <Input
//               label='Parent Password'
//               placeholder='Enter your parent password'
//               type='password'
//               width='full'
//               value={formikForChild.values.password}
//               setValue={formikForChild.handleChange('password')}
//               error={{
//                 show: formikForChild.errors.password && formikForChild.touched.password,
//                 message: formikForChild.errors.password,
//               }}
//             />
//             <div className='w-full flex justify-center'>
//               <button type='submit'
//                 className='btn btn-primary w-16'
//               >Submit</button>
//             </div>
//           </form>
//         </div>
//       </div>

//     </div>
//   )
// }

export default function Preference() {
  return(
    <div>
      <h1>
        Preferences
      </h1>
    </div>
  )
}
