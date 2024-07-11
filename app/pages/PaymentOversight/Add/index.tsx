import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInput from "@/components/DateInput";
import Input from '@/components/Input';
import { FaFloppyDisk } from 'react-icons/fa6';

export default function PaymentOversight() {
    const validationSchema = Yup.object({
        date: Yup.date().required('Date is required'),
        vendor: Yup.string().required('Vendor is required'),
        description: Yup.string().required('Description is required'),
        type: Yup.string().required('Type is required'),
        amount: Yup.number().required('Amount is required'),
        balance: Yup.number().required('Balance is required'),
    });

    const formik = useFormik({
        initialValues: {
            date: new Date(),
            vendor: '',
            description: '',
            type: '',
            amount: 0,
            balance: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formattedDate = `${values.date.getFullYear()}-${values.date.getMonth() + 1}-${values.date.getDate()}`;
            console.log(values);
            window.api.query(`INSERT INTO payment_oversight (DATE, VENDOR, DESCRIPTION, TYPE, AMOUNT, BALANCE) VALUES ('${formattedDate}', '${values.vendor}', '${values.description}', '${values.type}', ${values.amount}, ${values.balance})`);
            window.reloader.mainReload();
            window.close();
        },
    });

    React.useEffect(() => {
        let isMounted = true;
        window.api.query(`CREATE TABLE IF NOT EXISTS payment_oversight (ID INTEGER PRIMARY KEY AUTOINCREMENT, DATE DATE, VENDOR TEXT, DESCRIPTION TEXT, TYPE TEXT, AMOUNT REAL, BALANCE REAL)`);
        window.api.query(`SELECT * FROM payment_oversight`);
        window.api.onQueryReply((data: any) => {
            if (isMounted) {
                console.log(data);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="window toolbar">
            <div className="window-header my-5">
                <p className="text-center text-[1.5rem]">Add Item</p>
            </div>
            <div className="mx-20 justify-end flex">
                <DatePicker
                    selected={formik.values.date}
                    onChange={(date: any) => formik.setFieldValue('date', date)}
                    customInput={<CustomInput />}
                    dateFormat={"dd/MM/yyyy"}
                />
            </div>
            <form onSubmit={formik.handleSubmit} className="mx-20">
                <Input
                    label="Vendor"
                    placeholder='Vendor'
                    type="text"
                    width='full'
                    error={{
                        show: formik.errors.vendor && formik.touched.vendor,
                        message: formik.errors.vendor
                    }}
                    value={formik.values.vendor}
                    setValue={(e) => formik.setFieldValue('vendor', e.target.value)}
                />
                <Input
                    label="Description"
                    placeholder='Description'
                    type="text"
                    width="1/2"
                    error={{
                        show: formik.errors.description && formik.touched.description,
                        message: formik.errors.description
                    }}
                    value={formik.values.description}
                    setValue={(e) => formik.setFieldValue('description', e.target.value)}
                />
                <div className="flex flex-row justify-between gap-10">
                    <Input
                        label="Type"
                        placeholder='Type'
                        type="text"
                        width="1/2"
                        error={{
                            show: formik.errors.type && formik.touched.type,
                            message: formik.errors.type
                        }}
                        value={formik.values.type}
                        setValue={(e) => formik.setFieldValue('type', e.target.value)}
                    />
                    <Input
                        label="Amount"
                        placeholder='Amount'
                        type="number"
                        width="1/2"
                        error={{
                            show: formik.errors.amount && formik.touched.amount,
                            message: formik.errors.amount
                        }}
                        value={formik.values.amount}
                        setValue={(e) => formik.setFieldValue('amount', e.target.value)}
                    />
                    <Input
                        label="Balance"
                        placeholder='Balance'
                        type="number"
                        width="1/2"
                        error={{
                            show: formik.errors.balance && formik.touched.balance,
                            message: formik.errors.balance
                        }}
                        value={formik.values.balance}
                        setValue={(e) => formik.setFieldValue('balance', e.target.value)}
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
    )
}
