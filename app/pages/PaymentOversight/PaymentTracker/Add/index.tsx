import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInput from "@/components/DateInput";
import Input from '@/components/Input';
import { FaFloppyDisk } from 'react-icons/fa6';

export default function AddPaymentTracker() {

    const [payOpsId, setPayOpsId] = React.useState(0);

    const validationSchema = Yup.object({
        date: Yup.date().required('Date is required'),
        totalAmount: Yup.number().required('Total Amount is required'),
        amountPaid: Yup.number().required('Amount Paid is required'),
        totalAmountPaid: Yup.number().required('Total Amount Paid is required'),
        totalAmountDue: Yup.number().required('Total Amount Due is required'),
    });

    const formik = useFormik({
        initialValues: {
            date: new Date(),
            totalAmount: 0,
            amountPaid: '',
            totalAmountPaid: '',
            totalAmountDue: '',
            payOpsId: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formattedDate = `${values.date.getFullYear()}-${values.date.getMonth() + 1}-${values.date.getDate()}`;
            window.api.query(`INSERT INTO payment_tracker (PAY_OPS_ID, DATE, TOTAL_AMOUNT, AMOUNT_PAID, TOTAL_AMOUNT_PAID, TOTAL_AMOUNT_DUE) VALUES (${payOpsId}, '${formattedDate}', ${values.totalAmount}, ${values.amountPaid}, ${values.totalAmountPaid}, ${values.totalAmountDue})`);
            window.reloader.mainReload();
            window.close();
        },
    });

    React.useEffect(() => {
        window.api.query(`CREATE TABLE IF NOT EXISTS payment_tracker (ID INTEGER PRIMARY KEY AUTOINCREMENT, PAY_OPS_ID INTEGER, DATE DATE, TOTAL_AMOUNT REAL, AMOUNT_PAID REAL, TOTAL_AMOUNT_PAID REAL, TOTAL_AMOUNT_DUE REAL)`);
        window.electron.getPaymentTrackerData((data) => {
            formik.setFieldValue('totalAmount', data.AMOUNT);
            setPayOpsId(data.ID);
        });

    }, []);

    return (
        <div className="window toolbar">
            <div className="window-header my-5">
                <p className="text-center text-[1.5rem]">Add Payment</p>
            </div>
            <div className="mx-20 justify-end flex">
                <DatePicker
                    selected={formik.values.date}
                    onChange={(date) => formik.setFieldValue('date', date)}
                    customInput={<CustomInput />}
                    dateFormat={"dd/MM/yyyy"}
                />
            </div>
            <form className="mx-20" onSubmit={formik.handleSubmit}>
                <Input
                    label="Total Amount"
                    placeholder='Total Amount'
                    type="number"
                    width='full'
                    value={formik.values.totalAmount}
                    setValue={(e) => formik.setFieldValue('totalAmount', e.target.value)}
                    error={{
                        show: formik.errors.totalAmount && formik.touched.totalAmount,
                        message: formik.errors.totalAmount
                    }}
                    disabled
                />
                <Input
                    label="Amount Paid"
                    placeholder='Amount Paid'
                    type="number"
                    width='full'
                    value={formik.values.amountPaid}
                    setValue={(e) => formik.setFieldValue('amountPaid', e.target.value)}
                    error={{
                        show: formik.errors.amountPaid && formik.touched.amountPaid,
                        message: formik.errors.amountPaid
                    }}
                />
                <Input
                    label="Total Amount Paid"
                    placeholder='Total Amount Paid'
                    type="number"
                    width='full'
                    value={formik.values.totalAmountPaid}
                    setValue={(e) => formik.setFieldValue('totalAmountPaid', e.target.value)}
                    error={{
                        show: formik.errors.totalAmountPaid && formik.touched.totalAmountPaid,
                        message: formik.errors.totalAmountPaid
                    }}
                />
                <Input
                    label="Total Amount Due"
                    placeholder='Total Amount Due'
                    type="number"
                    width='full'
                    value={formik.values.totalAmountDue}
                    setValue={(e) => formik.setFieldValue('totalAmountDue', e.target.value)}
                    error={{
                        show: formik.errors.totalAmountDue && formik.touched.totalAmountDue,
                        message: formik.errors.totalAmountDue
                    }}
                />
                <div>
                    <button type="submit" className="pull-right mt-10 btn btn-primary active">
                        <FaFloppyDisk className="icon icon-text" color="white" />
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
