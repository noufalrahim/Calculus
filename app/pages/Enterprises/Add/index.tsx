import React from "react";
import { FaFloppyDisk } from "react-icons/fa6";
import * as Yup from "yup";
import { useFormik } from "formik"; // Import the useFormik hook
import Input from "@/components/Input";

export default function AddEnterprise() {

    const validationSchema = Yup.object({
        enterprise: Yup.string().required('Enterprise is required'),
        address: Yup.string().required('Address is required'),
        location: Yup.string().required('Location is required'),
        cardNumber: Yup.string().required('Card Number is required'),
        contactNumber: Yup.string().required('Contact Number is required'),
        email: Yup.string().required('Email is required'),
        website: Yup.string().required('Website is required'),
        kgst: Yup.string().required('KGST is required'),
        tin: Yup.string().required('TIN is required'),
        cst: Yup.string().required('CST is required'),
    });

    const formik = useFormik({
        initialValues: {
            enterprise: 'Cool Casuals',
            address: 'MG Road, Kochi',
            location: 'Ernakulam',
            cardNumber: '5678 1234 5678 1234',
            contactNumber: '3456781234',
            email: 'coolcasuals@gmail.com',
            website: 'www.coolcasuals.com',
            kgst: '567812345678',
            tin: '1234567890',
            cst: '9567891234',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values);
            window.api.query('CREATE TABLE IF NOT EXISTS enterprises (ID INTEGER PRIMARY KEY AUTOINCREMENT, ENTERPRISE TEXT, ADDRESS TEXT, LOCATION TEXT, CARD_NUMBER TEXT, CONTACT TEXT, EMAIL TEXT, WEBSITE TEXT, KGST TEXT, TIN TEXT, CST TEXT);');
            window.api.query('INSERT INTO enterprises (ENTERPRISE, ADDRESS, LOCATION, CARD_NUMBER, CONTACT, EMAIL, WEBSITE, KGST, TIN, CST) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [values.enterprise, values.address, values.location, values.cardNumber, values.contactNumber, values.email, values.website, values.kgst, values.tin, values.cst]);
            // window.api.query('SELECT * FROM enterprises');
            // // window.api.onQueryReply((data) => {
            // //     console.log("Enterprises:", data);
            // // });
            window.reloader.mainReload();
            window.close();
        },
    });

    return (
        <div className="window toolbar">
            <div className="window-header my-5">
                <p className="text-center text-[1.5rem]">Add Enterprise</p>
            </div>
            <div className="mx-20">
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        label="Enterprise"
                        placeholder="Enterprise"
                        type="text"
                        width="full"
                        error={{
                            show: formik.touched.enterprise && !!formik.errors.enterprise,
                            message: formik.errors.enterprise,
                        }}
                        value={formik.values.enterprise}
                        setValue={formik.handleChange('enterprise')}
                    />
                    <div className="flex flex-row justify-between gap-2">
                        <Input
                            label="Address"
                            placeholder="Address"
                            type="text"
                            width="1/2"
                            error={{
                                show: formik.touched.address && !!formik.errors.address,
                                message: formik.errors.address,
                            }}
                            value={formik.values.address}
                            setValue={formik.handleChange('address')}
                        />
                        <Input
                            label="Location"
                            placeholder="Location"
                            type="text"
                            width="1/2"
                            error={{
                                show: formik.touched.location && !!formik.errors.location,
                                message: formik.errors.location,
                            }}
                            value={formik.values.location}
                            setValue={formik.handleChange('location')}
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <Input
                            label="Contact Number"
                            placeholder="Contact Number"
                            type="text"
                            width="1/2"
                            error={{
                                show: formik.touched.contactNumber && !!formik.errors.contactNumber,
                                message: formik.errors.contactNumber,
                            }}
                            value={formik.values.contactNumber}
                            setValue={formik.handleChange('contactNumber')}
                        />
                        <Input  
                            label="Email"
                            placeholder="Email"
                            type="text"
                            width="1/2"
                            error={{
                                show: formik.touched.email && !!formik.errors.email,
                                message: formik.errors.email,
                            }}
                            value={formik.values.email}
                            setValue={formik.handleChange('email')}
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <Input 
                            label="Website"
                            placeholder="Website"
                            type="text"
                            width="1/2"
                            error={{
                                show: formik.touched.website && !!formik.errors.website,
                                message: formik.errors.website,
                            }}
                            value={formik.values.website}
                            setValue={formik.handleChange('website')}
                        />
                        <Input
                            label="Card Number"
                            placeholder="Card Number"
                            type="text"
                            width="1/2"
                            error={{
                                show: formik.touched.cardNumber && !!formik.errors.cardNumber,
                                message: formik.errors.cardNumber,
                            }}
                            value={formik.values.cardNumber}
                            setValue={formik.handleChange('cardNumber')}
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <Input
                            label="KGST"
                            placeholder="KGST"
                            type="text"
                            width="1/2"
                            error={{
                                show: formik.touched.kgst && !!formik.errors.kgst,
                                message: formik.errors.kgst,
                            }}
                            value={formik.values.kgst}
                            setValue={formik.handleChange('kgst')}
                        />
                        <Input
                            label="TIN"
                            placeholder="TIN"
                            type="text"
                            width="1/2"
                            error={{
                                show: formik.touched.tin && !!formik.errors.tin,
                                message: formik.errors.tin,
                            }}
                            value={formik.values.tin}
                            setValue={formik.handleChange('tin')}
                        />
                        <Input
                            label="CST"
                            placeholder="CST"
                            type="text"
                            width="1/2"
                            error={{
                                show: formik.touched.cst && !!formik.errors.cst,
                                message: formik.errors.cst,
                            }}
                            value={formik.values.cst}
                            setValue={formik.handleChange('cst')}
                        />
                    </div>
                    <div>
                        <button type="submit" className="pull-right mt-10 btn btn-primary active">
                            <FaFloppyDisk className="icon icon-text" color="white" />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
