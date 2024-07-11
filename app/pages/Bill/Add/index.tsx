import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFloppyDisk } from "react-icons/fa6";
import Input from "@/components/Input";
import CustomInput from "@/components/DateInput";
import useScanDetection from "use-scan-detection";
import Select from "@/components/Select";
import AutoComplete from "@/components/AutoComplete";

export default function AddBillingItem() {
    const [accType, setAccType] = React.useState("CHILD");
    const validationSchema = Yup.object({
        enterprise: Yup.string().required('Enterprise is required'),
        item: Yup.string().required('Item is required'),
        price: Yup.number().required('Price is required'),
        total: Yup.number().required('Total is required'),
        paid: Yup.number().required('Payment is required'),
        showInReport: accType === "PARENT" ? Yup.string().required('Show in report is required') : Yup.string()
    });

    const [barCodeScan, setBarCodeScan] = React.useState<any>("No barcode scanned yet");
    const [enterpriseSuggestions, setEnterpriseSuggestions] = React.useState<any>([]);
    const [itemsSuggestions, setItemsSuggestions] = React.useState<any>([]);
    const [selectedEnterpriseId, setSelectedEnterpriseId] = React.useState<any>(null);
    const [data, setData] = React.useState<any>([]);
    //MISTAKE - 1
        useScanDetection({
            onComplete: (barcode) => {
                console.log("Barcode scanned: ", barcode);
                console.log(typeof barcode);
                const barcodeValue = parseInt(barcode.toString()) - 6291155885580;
                setBarCodeScan(barcodeValue);
                console.log("Barcode scanned: ", barcodeValue);
            },
            minLength: 3,
        });
    

    const formik = useFormik({
        initialValues: {
            date: new Date(),
            enterprise: '',
            item: '',
            price: '',
            total: '',
            paid: '',
            showInReport: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values);
            const formattedDate = `${values.date.getFullYear()}-${values.date.getMonth() + 1}-${values.date.getDate()}`;
            const formattedEnterprise = values.enterprise.split(' ')[0];
            console.log(formattedEnterprise);
            if(accType === "PARENT") {
                window.api.query(`INSERT INTO sales (DATE, ENTERPRISE, ITEM, PRICE, TOTAL, PAID, SHOW_IN_REPORT, CREATED_AT, UPDATED_AT) VALUES ('${formattedDate}', '${formattedEnterprise}', '${values.item}', ${values.price}, ${values.total}, ${values.paid}, ${values.showInReport}, '${formattedDate}', '${formattedDate}')`);
                window.api.query(`INSERT INTO billing (DATE, ENTERPRISE, ITEM, PRICE, TOTAL, PAID, SHOW_IN_REPORT, CREATED_AT, UPDATED_AT) VALUES ('${formattedDate}', '${formattedEnterprise}', '${values.item}', ${values.price}, ${values.total}, ${values.paid}, ${values.showInReport}, '${formattedDate}', '${formattedDate}')`);
                data.forEach((node: any) => {
                    if(node.ENTERPRISE === values.enterprise && node.ITEM === values.item) {
                        setSelectedEnterpriseId(node.ID);
                    }
                });

                window.api.query(`UPDATE purchases SET IN_STOCK = IN_STOCK - 1 WHERE ID = ${selectedEnterpriseId}`)
                window.api.query(`UPDATE purchases SET SALES_RATIO = ALL_STOCK / IN_STOCK WHERE ID = ${selectedEnterpriseId}`)
                
                window.api.query('SELECT * FROM sales');
                window.api.onQueryReply((data) => {
                    console.log(data);
                });
                window.reloader.mainReload();
                window.close();

            } 
            else {
                window.api.query(`INSERT INTO sales (DATE, ENTERPRISE, ITEM, PRICE, TOTAL, PAID, SHOW_IN_REPORT, CREATED_AT, UPDATED_AT) VALUES ('${formattedDate}', '${formattedEnterprise}', '${values.item}', ${values.price}, ${values.total}, ${values.paid}, true, '${formattedDate}', '${formattedDate}')`);
                window.api.query(`INSERT INTO billing (DATE, ENTERPRISE, ITEM, PRICE, TOTAL, PAID, SHOW_IN_REPORT, CREATED_AT, UPDATED_AT) VALUES ('${formattedDate}', '${formattedEnterprise}', '${values.item}', ${values.price}, ${values.total}, ${values.paid}, true, '${formattedDate}', '${formattedDate}')`);
                let ID;
                data.forEach((node: any) => {
                    if(node.ENTERPRISE === values.enterprise && node.ITEM === values.item) {
                        console.log(node);
                        ID = node.ID;
                    }
                });

                console.log(ID);

                window.api.query(`UPDATE purchases SET IN_STOCK = IN_STOCK - 1 WHERE ID = ${ID}`)
                window.api.query(`UPDATE purchases SET SALES_RATIO = (ALL_STOCK - IN_STOCK) WHERE ID = ${ID}`);
                
                window.api.query('SELECT * FROM sales');
                window.api.onQueryReply((data) => {
                    console.log(data);
                });
                window.reloader.mainReload();
                window.close();
            }
        },
    });

    React.useEffect(() => {
        let isMounted = true;

        window.api.query('CREATE TABLE IF NOT EXISTS sales (ID INTEGER PRIMARY KEY AUTOINCREMENT, DATE DATE, ENTERPRISE TEXT, ITEM TEXT, PRICE INTEGER, TOTAL INTEGER, PAID INTEGER, SHOW_IN_REPORT BOOLEAN, CREATED_AT DATE DEFAULT CURRENT_DATE, UPDATED_AT DATE DEFAULT CURRENT_DATE)');
        window.api.query('CREATE TABLE IF NOT EXISTS billing (ID INTEGER PRIMARY KEY AUTOINCREMENT, DATE DATE, ENTERPRISE TEXT, ITEM TEXT, PRICE INTEGER, TOTAL INTEGER, PAID INTEGER, SHOW_IN_REPORT BOOLEAN, CREATED_AT DATE DEFAULT CURRENT_DATE, UPDATED_AT DATE DEFAULT CURRENT_DATE)');
        window.api.query('SELECT ENTERPRISE, ITEM, ID FROM purchases ORDER BY ENTERPRISE ASC');
        window.api.onQueryReply((data) => {
            if (isMounted) {
                console.log(data);
                setData(data);
                if(data.length > 0) {
                    const entData = data.map((node: any) => {
                        return {
                            key: node.ENTERPRISE + ' ' + node.ITEM,
                            value: node.ENTERPRISE + ' ' + node.ITEM
                        }
                    });
                    console.log(entData);
                    setEnterpriseSuggestions(entData);
                }

                if(data.length > 0) {
                    const itemData = data.map((node: any) => {
                        return {
                            key: node.ITEM,
                            value: node.ITEM
                        }
                    });
                    console.log(itemData);
                    setItemsSuggestions(itemData);
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    React.useEffect(() => {
        if (barCodeScan === "No barcode scanned yet") return;

        let isMounted = true;

        window.api.query(`SELECT * FROM purchases WHERE ID = ${barCodeScan}`);
        console.log(barCodeScan);
        window.api.onQueryReply((data) => {
            if (isMounted) {
                console.log(data);
                if (data.length > 0) {
                    formik.setFieldValue('item', data[0].ITEM);
                    formik.setFieldValue('price', data[0].PRICE);
                    formik.setFieldValue('enterprise', data[0].ENTERPRISE);
                    formik.setFieldValue('quantity', 1);
                    formik.setFieldValue('discount', 0);
                    formik.setFieldValue('paid', data[0].PRICE);
                    formik.setFieldValue('balance', 0);
                    formik.setFieldValue('total', data[0].PRICE);
                    formik.setFieldValue('showInReport', true);

                    const formattedDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

                    window.api.query(`INSERT INTO sales (DATE, ENTERPRISE, ITEM, PRICE, TOTAL, PAID, SHOW_IN_REPORT, CREATED_AT, UPDATED_AT) VALUES ('${formattedDate}', '${data[0].ENTERPRISE}', '${data[0].ITEM}', ${data[0].PRICE}, ${data[0].PRICE}, ${data[0].PRICE}, true, '${formattedDate}', '${formattedDate}')`);
                    window.api.query(`INSERT INTO billing (DATE, ENTERPRISE, ITEM, PRICE, TOTAL, PAID, SHOW_IN_REPORT, CREATED_AT, UPDATED_AT) VALUES ('${formattedDate}', '${data[0].ENTERPRISE}', '${data[0].ITEM}', ${data[0].PRICE}, ${data[0].PRICE}, ${data[0].PRICE}, true, '${formattedDate}', '${formattedDate}')`);
                    window.api.query('SELECT * FROM sales');
                    window.api.onQueryReply((data) => {
                        if (isMounted) {
                            console.log(data);
                        }
                    });

                    window.close();
                } else {
                    console.log("No data found");
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [barCodeScan]);

    React.useEffect(() => {
        formik.setFieldValue('total', Number(formik.values.price));
        formik.setFieldValue('balance', Number(formik.values.total) - Number(formik.values.paid));
    }, [formik.values.price, formik.values.paid]);

    console.log("Barcode scanned: ", barCodeScan);

    React.useEffect(() => {
        window.auth.getAuthType((data) => {
            console.log(data);
            setAccType(data);
        });
    }, []);

    console.log("Acc Type: ", accType);

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
                    options={itemsSuggestions}
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
