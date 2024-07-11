import React from 'react';
import JsBarcode from 'jsbarcode';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Barcode() {
    const [barcodeValue, setBarcodeValue] = React.useState('');
    const barcodeRef = React.useRef(null);

    const validationSchema = Yup.object({
        quantity: Yup.number().required('Quantity is required'),
    });

    const formik = useFormik({
        initialValues: {
            quantity: 1,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values);
            let data = [];
            for(let i = 0; i < values.quantity; i++) {
                data.push(
                    {
                        type: 'barCode',
                        value: barcodeValue,
                        height: 40,
                        width: 2,
                        displayValue: true,
                        fontSize: 12
                    }
                );
            }

            window.app.print(JSON.stringify(data));
        },
    });

    const generateBarcode = () => {
        const canvas = barcodeRef.current;
        if (canvas) {
            JsBarcode(canvas, barcodeValue, {
                format: 'CODE128',
                displayValue: true,
                fontSize: 20,
                width: 1,  
                height: 50,  
                margin: 10,
            });
        }
    }

    React.useEffect(() => {
        const handleBarcodeData = (data: any) => {
            console.log("Barcode Data:", data);
            setBarcodeValue(data.id);
            formik.setFieldValue('quantity', data.quantity);
        };

        window.electron.getBarcodeData(handleBarcodeData);

       
    }, []);

    React.useEffect(() => {
        if (barcodeValue) {
            generateBarcode();
        }
    }, [barcodeValue]);

    return (
        <div className='window justify-center flex items-center'>
            {barcodeValue === '' ? (
                <div>Loading....</div>
            ) : (
                <canvas
                    className='w-[10rem] h-[5rem]'
                    ref={barcodeRef}
                ></canvas>
            )}
            <form onSubmit={formik.handleSubmit} className='text-center flex-col flex mt-2 justify-center items-center'>
                <input
                    type='number'
                    name='quantity'
                    className='form w-10 border border-black text-center'
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                />
                {formik.touched.quantity && formik.errors.quantity && (
                    <div className='text-red-500 italic text-[10px] mt-2'>{formik.errors.quantity}</div>
                )}
                <button type='submit' className='btn btn-default mt-3'>
                    Print
                    <span className='icon icon-print mr-2'></span>
                </button>
            </form>
        </div>
    );
}
