import React from "react";
import { FaFloppyDisk } from "react-icons/fa6";
import * as Yup from "yup";
import { useFormik } from "formik"; // Import the useFormik hook
import Input from "@/components/Input";

export default function EditMarketPage() {
  const [marketData, setMarketData] = React.useState({
    ID: '',
    ENTERPRISE: '',
    ADDRESS: '',
    LOCATION: '',
    CARD_NUMBER: '',
    CONTACT: '',
    EMAIL: '',
    WEBSITE: '',
    KGST: '',
    TIN: '',
    CST: '',
  });

  React.useEffect(() => {
    window.electron.getEditMarketData((data) => {
      console.log(data);
      setMarketData({
        ID: data.ID,
        ENTERPRISE: data.ENTERPRISE,
        ADDRESS: data.ADDRESS,
        LOCATION: data.LOCATION,
        CARD_NUMBER: data.CARD_NUMBER,
        CONTACT: data.CONTACT,
        EMAIL: data.EMAIL,
        WEBSITE: data.WEBSITE,
        KGST: data.KGST,
        TIN: data.TIN,
        CST: data.CST,
      });
    });

    window.api.query('SELECT * FROM enterprises');
    window.api.onQueryReply((data) => {
      console.log(data);
    });
  }, []);

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
      enterprise: marketData.ENTERPRISE,
      address: marketData.ADDRESS,
      location: marketData.LOCATION,
      cardNumber: marketData.CARD_NUMBER,
      contactNumber: marketData.CONTACT,
      email: marketData.EMAIL,
      website: marketData.WEBSITE,
      kgst: marketData.KGST,
      tin: marketData.TIN,
      cst: marketData.CST,
    },
    enableReinitialize: true, // Add this line to enable reinitialization
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
      window.api.query('UPDATE enterprises SET ENTERPRISE = ?, ADDRESS = ?, LOCATION = ?, CARD_NUMBER = ?, CONTACT = ?, EMAIL = ?, WEBSITE = ?, KGST = ?, TIN = ?, CST = ? WHERE ID = ?', [values.enterprise, values.address, values.location, values.cardNumber, values.contactNumber, values.email, values.website, values.kgst, values.tin, values.cst, marketData.ID]);
      window.api.query('SELECT * FROM enterprises');
      window.api.onQueryReply((data) => {
        console.log(data);
      });
      window.reloader.mainReload();
      window.close();
    },
  });

  console.log('Market Data:', marketData)
  console.log(formik.values)

  return (
    <div className="window toolbar">
      <div className="window-header my-5">
        <p className="text-center text-[1.5rem]">Edit Enterprise</p>
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
  );
}
