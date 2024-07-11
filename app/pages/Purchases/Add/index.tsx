import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFloppyDisk } from "react-icons/fa6";
import Input from "@/components/Input";
import CustomInput from "@/components/DateInput";
import Select from "@/components/Select";

export default function AddPurchasesItem() {

    const [enterpriseSuggestions, setEnterpriseSuggestions] = React.useState([]);
    const [accType, setAccType] = React.useState("CHILD");

    const validationSchema = Yup.object({
        enterprise: Yup.string().required('Enterprise is required'),
        item: Yup.string().required('Item is required'),
        quantity: Yup.number().required('Quantity is required'),
        price: Yup.number().required('Price is required'),
        total: Yup.number().required('Total is required'),
        paid: Yup.number().required('Payment is required'),
        balance: Yup.number().required('Balance is required'),
        showInReport: accType === "PARENT" ? Yup.string().required('Show in report is required') : Yup.string()
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
            balance: '',
            allStock: '',
            inStock: '',
            return: '',
            salesRatio: '',
            showInReport: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values);
            const formattedDate = `${values.date.getFullYear()}-${values.date.getMonth() + 1}-${values.date.getDate()}`;
            window.api.query(`INSERT INTO purchases (DATE, ENTERPRISE, ITEM, QUANTITY, PRICE, DISCOUNT, TOTAL, PAID, BALANCE, ALL_STOCK, IN_STOCK, RETURN, SALES_RATIO, SHOW_IN_REPORT) VALUES ('${formattedDate}', '${values.enterprise}', '${values.item}', ${values.quantity}, ${values.price}, ${values.discount}, ${values.total}, ${values.paid}, ${values.balance}, ${values.allStock}, ${values.inStock}, ${values.return}, ${values.salesRatio}, '${values.showInReport}')`);
            window.api.query('SELECT * FROM purchases');
            window.api.onQueryReply((data) => {
                console.log(data);
            });
            window.reloader.mainReload();
            window.close();
        },
    });

    React.useEffect(() => {
        let isMounted = true;
        window.api.query('CREATE TABLE IF NOT EXISTS purchases (ID INTEGER PRIMARY KEY AUTOINCREMENT, DATE DATE, ENTERPRISE TEXT, ITEM TEXT, QUANTITY INTEGER, PRICE INTEGER, DISCOUNT INTEGER, TOTAL INTEGER, PAID INTEGER, BALANCE INTEGER, ALL_STOCK INTEGER, IN_STOCK INTEGER, RETURN INTEGER, SALES_RATIO FLOAT, SHOW_IN_REPORT BOOLEAN, UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)');
        window.api.query('SELECT ENTERPRISE FROM enterprises ORDER BY ENTERPRISE ASC');
        window.api.onQueryReply((data) => {
            if (isMounted) {
                console.log(data);
                data = data.map((item: any) => {
                    return { value: item.ENTERPRISE, key: item.ENTERPRISE };
                });
                setEnterpriseSuggestions(data);
            }
        });
        window.auth.getAuthType((data) => {
            console.log(data);
            setAccType(data);
        });
        return () => {
            isMounted = false;
        };
    }, []);

    React.useEffect(() => {
        formik.setFieldValue('total', Number(formik.values.quantity) * Number(formik.values.price));
        formik.setFieldValue('balance', Number(formik.values.total) - Number(formik.values.discount) - Number(formik.values.paid));
        formik.setFieldValue('allStock', Number(formik.values.quantity));
        formik.setFieldValue('inStock', Number(formik.values.quantity));
        formik.setFieldValue('return', 0);
        formik.setFieldValue('salesRatio', 0);
    }, [formik.values.quantity, formik.values.price, formik.values.paid, formik.values.discount]);

    return (
        <div className="window toolbar">
            <div className="window-header my-5">
                <p className="text-center text-[1.5rem]">Add Purchases Item</p>
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
                <Select
                    label="Enterprise"
                    options={enterpriseSuggestions}
                    value={formik.values.enterprise}
                    setValue={formik.handleChange('enterprise')}
                    error={{
                        show: formik.touched.enterprise && !!formik.errors.enterprise,
                        message: formik.errors.enterprise
                    }}
                    width="full"
                />
                <Select
                    label="Item"
                    options={[
                        { value: 'Shirt', key: 'Shirt' },
                        { value: 'Pant', key: 'Pant' },
                        { value: 'Jeans', key: 'Jeans' },
                        { value: 'TShirt', key: 'TShirt' },
                    ]}
                    value={formik.values.item}
                    setValue={formik.handleChange('item')}
                    error={{
                        show: formik.touched.item && !!formik.errors.item,
                        message: formik.errors.item
                    }}
                    width="1/2"
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
                {
                    accType === "PARENT" && (
                        <div className="flex flex-col mt-5">
                            <label>Show in Report</label>
                            <select
                                className={`w-1/4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-none 
                            ${formik.values.showInReport === '' ? 'text-gray-500' : ''}
                            ${formik.touched.showInReport && formik.errors.showInReport ? 'border-red-500' : 'border-gray-300'}`}
                                value={formik.values.showInReport}
                                onChange={(e) => {
                                    if (e.target.value === 'true') {
                                        formik.setFieldValue('showInReport', true);
                                    } else if (e.target.value === 'false') {
                                        formik.setFieldValue('showInReport', false);
                                    }
                                    else {
                                        formik.setFieldValue('showInReport', '');
                                    }
                                }}
                            >
                                <option className="bg-gray-200">Select</option>
                                <option className="bg-gray-200"
                                    value={'true'}>Yes</option>
                                <option value={'false'} className="bg-gray-200">No</option>
                            </select>
                            {formik.touched.showInReport && formik.errors.showInReport ? <p className="text-red-500 italic text-[10px] mt-2">{formik.errors.showInReport}</p> : null}
                        </div>
                    )
                }
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
