import React, { useEffect } from 'react';
import path from 'path';

const Print = () => {

    const data = [
        {
            type: 'image',
            url: 'https://media.licdn.com/dms/image/D5603AQHHzazLfgFqfg/profile-displayphoto-shrink_800_800/0/1685229003246?e=1724889600&v=beta&t=kVibKjPuqZj7vsJZyn0JVobmZr1hbF5W2BmdwnH7EUA',     // file path
            position: 'center',                                  // position of image: 'left' | 'center' | 'right'
            width: '160px',                                           // width of image in px; default: auto
            height: '160px',                                          // width of image in px; default: 50 or '50px'
        },{
            type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
            value: 'SAMPLE HEADING',
            style: {fontWeight: "700", textAlign: 'center', fontSize: "24px"}
        },{
            type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
            value: 'Secondary text',
            style: {textDecoration: "underline", fontSize: "10px", textAlign: "center", color: "red"}
        },{
            type: 'barCode',
            value: '023456789010',
            height: 40,                     // height of barcode, applicable only to bar and QR codes
            width: 2,                       // width of barcode, applicable only to bar and QR codes
            displayValue: true,             // Display value below barcode
            fontsize: 12,
        },{
            type: 'qrCode',
            value: 'https://github.com/Hubertformin/electron-pos-printer',
            height: 55,
            width: 55,
            style: { margin: '10 20px 20 20px' }
        },{
            type: 'table',
            // style the table
            style: {border: '1px solid #ddd'},
            // list of the columns to be rendered in the table header
            tableHeader: ['Animal', 'Age'],
            // multi dimensional array depicting the rows and columns of the table body
            tableBody: [
                ['Cat', 2],
                ['Dog', 4],
                ['Horse', 12],
                ['Pig', 4],
            ],
            // list of columns to be rendered in the table footer
            tableFooter: ['Animal', 'Age'],
            // custom style for the table header
            tableHeaderStyle: { backgroundColor: '#000', color: 'white'},
            // custom style for the table body
            tableBodyStyle: {'border': '0.5px solid #ddd'},
            // custom style for the table footer
            tableFooterStyle: {backgroundColor: '#000', color: 'white'},
        },{
            type: 'table',
            style: {border: '1px solid #ddd'},             // style the table
            // list of the columns to be rendered in the table header
            tableHeader: [{type: 'text', value: 'People'}, {type: 'image', url: 'https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA'}],
            // multi-dimensional array depicting the rows and columns of the table body
            tableBody: [
                [{type: 'text', value: 'Marcus'}, {type: 'image', url: 'https://randomuser.me/api/portraits/men/43.jpg'}],
                [{type: 'text', value: 'Boris'}, {type: 'image', url: 'https://randomuser.me/api/portraits/men/41.jpg'}],
                [{type: 'text', value: 'Andrew'}, {type: 'image', url: 'https://randomuser.me/api/portraits/men/23.jpg'}],
                [{type: 'text', value: 'Tyresse'}, {type: 'image', url: 'https://randomuser.me/api/portraits/men/53.jpg'}],
            ],
            // list of columns to be rendered in the table footer
            tableFooter: [{type: 'text', value: 'People'}, 'Image'],
            // custom style for the table header
            tableHeaderStyle: { backgroundColor: 'red', color: 'white'},
            // custom style for the table body
            tableBodyStyle: {'border': '0.5px solid #ddd'},
            // custom style for the table footer
            tableFooterStyle: {backgroundColor: '#000', color: 'white'},
        },
    ]
  
    const printSample = () => {
        window.app.print(JSON.stringify(data));
    }

  return (
    <div>
      <button className='btn btn-default' onClick={printSample}>Print Sample</button>
    </div>
  );
};

export default Print;
