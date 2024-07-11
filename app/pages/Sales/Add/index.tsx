import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { FaFloppyDisk } from "react-icons/fa6";
import Input from "@/components/Input";
import CustomInput from "@/components/DateInput";

export default function AddBillingItem() {
    const validationSchema = Yup.object({
        enterprise: Yup.string().required('Enterprise is required'),
        item: Yup.string().required('Item is required'),
        quantity: Yup.number().required('Quantity is required'),
        price: Yup.number().required('Price is required'),
        discount: Yup.number().required('Discount is required'),
        total: Yup.number().required('Total is required'),
        paid: Yup.number().required('Payment is required'),
        balance: Yup.number().required('Balance is required'),
    });

    const formik = useFormik({
        initialValues: {
            date: new Date(),
            enterprise: '',
            item: '',
            quantity: '',
            price: '',
            discount: '',
            total: '',
            paid: '',
            balance: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values);
            const formattedDate = `${values.date.getFullYear()}-${values.date.getMonth() + 1}-${values.date.getDate()}`;
            window.api.query(`INSERT INTO sales (DATE, ENTERPRISE, ITEM, QUANTITY, PRICE, DISCOUNT, TOTAL, PAID, BALANCE) VALUES ('${formattedDate}', '${values.enterprise}', '${values.item}', ${values.quantity}, ${values.price}, ${values.discount}, ${values.total}, ${values.paid}, ${values.balance})`);
            window.api.query('SELECT * FROM sales');
            window.api.onQueryReply((data) => {
                console.log(data);
            });
            window.reloader.mainReload();
            window.close();
        },
    });

    React.useEffect(() => {
        window.api.query('CREATE TABLE IF NOT EXISTS sales (ID INTEGER PRIMARY KEY AUTOINCREMENT, DATE DATE, ENTERPRISE TEXT, ITEM TEXT, QUANTITY INTEGER, PRICE INTEGER, DISCOUNT INTEGER, TOTAL INTEGER, PAID INTEGER, BALANCE INTEGER)');
        window.api.query('SELECT * FROM sales');
        window.api.onQueryReply((data) => {
            console.log(data);
        });
    },[]);

    React.useEffect(() => {
        formik.setFieldValue('total', Number(formik.values.quantity) * Number(formik.values.price));
        formik.setFieldValue('balance', Number(formik.values.total) - Number(formik.values.discount) - Number(formik.values.paid));
    }, [formik.values.quantity, formik.values.price, formik.values.paid, formik.values.discount]);

    return (
        <div className="window toolbar">
            <div className="window-header my-5">
                <p className="text-center text-[1.5rem]">Add Sales Item</p>
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
                    label="Enterprise"
                    placeholder="Enterprise"
                    type="text"
                    width="full"
                    error={{
                        show: formik.touched.enterprise && !!formik.errors.enterprise,
                        message: formik.errors.enterprise
                    }}
                    value={formik.values.enterprise}
                    setValue={formik.handleChange('enterprise')}
                />
                <Input
                    label="Item"
                    placeholder="Item"
                    type="text"
                    width="1/2"
                    error={{
                        show: formik.touched.item && !!formik.errors.item,
                        message: formik.errors.item
                    }}
                    value={formik.values.item}
                    setValue={formik.handleChange('item')}
                />
                <div className="flex flex-row justify-between">
                    <Input
                        label="Quantity"
                        placeholder="Quantity"
                        type="number"
                        width="1/4"
                        error={{
                            show: formik.touched.quantity && !!formik.errors.quantity,
                            message: formik.errors.quantity
                        }}
                        value={formik.values.quantity}
                        setValue={formik.handleChange('quantity')}
                    />
                    <Input
                        label="Price"
                        placeholder="Price"
                        type="number"
                        width="1/4"
                        error={{
                            show: formik.touched.price && !!formik.errors.price,
                            message: formik.errors.price
                        }}
                        value={formik.values.price}
                        setValue={formik.handleChange('price')}
                    />
                    <Input
                        label="Discount"
                        placeholder="Discount"
                        type="number"
                        width="1/4"
                        error={{
                            show: formik.touched.discount && !!formik.errors.discount,
                            message: formik.errors.discount
                        }}
                        value={formik.values.discount}
                        setValue={formik.handleChange('discount')}
                    />
                </div>
                <div className="flex flex-row justify-between">
                    <Input
                        label="Total"
                        placeholder="Total"
                        type="number"
                        disabled
                        width="1/4"
                        error={{
                            show: formik.touched.total && !!formik.errors.total,
                            message: formik.errors.total
                        }}
                        value={formik.values.total}
                        setValue={formik.handleChange('total')}
                    />
                    <Input
                        label="Paid"
                        placeholder="Paid"
                        type="number"
                        width="1/4"
                        error={{
                            show: formik.touched.paid && !!formik.errors.paid,
                            message: formik.errors.paid
                        }}
                        value={formik.values.paid}
                        setValue={formik.handleChange('paid')}
                    />
                    <Input
                        label="Balance"
                        placeholder="Balance"
                        type="number"
                        disabled
                        width="1/4"
                        error={{
                            show: formik.touched.balance && !!formik.errors.balance,
                            message: formik.errors.balance
                        }}
                        value={formik.values.balance}
                        setValue={formik.handleChange('balance')}
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
    );
}
