import { useState, useEffect, useRef } from 'react';
import { isEmpty, serverURL } from '../config';
import quotation_imgInit from '../images/invoice/threestudio.png';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const QuotationPreview = ({
    name,
    company_name,
    company_email,
    company_phone,
    company_address,
    client_name,
    client_email,
    client_phone,
    client_address,
    items,
    totalPrice,
    notes,
    settingData,
    quotation_date,
}) => {
    // const [invoice_flag , setInvoiceFlag ] = useState(false);
    const userinfo = useSelector((state: any) => state.auth.userInfo);
    let data = { role: "quotation_preview", roleid: userinfo.role_id };

    console.log("----setttingData", settingData);


    const fileUpload = useRef(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [mcompany_address, setAddress] = useState('');
    const [mcompany_phone, setPhone] = useState('');
    const [mcompany_email, setEmail] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { id } = useParams();
    useEffect(() => {
        if (!isEmpty(settingData)) {
            setImgPreview(serverURL + settingData.site_logo);
        }
    }, [])

    useEffect(() => {
        setAddress(settingData.company_address);
        setPhone(settingData.company_phone);
        setEmail(settingData.company_email);
    }, [])
    return (
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9" style={{ overflow: 'auto', position: 'relative' }}>
            <div className="w-full bg-white mx-auto" style={{ minHeight: '842px' }}>
                <div className='w-full pl-9 py-7 flex justify-between topnonedeflex' style={{ color: 'white', fontFamily: 'Arial', backgroundColor: 'rgb(88,104,122)', paddingTop: '2.5rem' }}>
                    <div>
                        <div className='flex'>
                            <div className="p-7.5">
                                <form action="#" className='flex'>
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="h-14 rounded-full">
                                            <img src={isEmpty('imgPreview') ? quotation_imgInit : imgPreview} alt="User" style={{ height: '100px' }} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p style={{ fontSize: '20px', padding: '5px' }} className='mt-3'>{isEmpty(mcompany_address) ? 'Company address' : mcompany_address}</p>
                                <p style={{ fontSize: '20px', padding: '5px' }}>{isEmpty(mcompany_phone) ? 'Company phone' : mcompany_phone}</p>
                                <p style={{ fontSize: '20px', padding: '5px' }}>{isEmpty(mcompany_email) ? 'Company email' : mcompany_email}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ alignSelf: 'center' }} className='mt-6.5'>
                        <div style={{ padding: '10px 70px 10px 30px', background: 'rgb(245, 132, 61)', fontSize: '22px' }}>QUOTATION
                        </div>
                        <div className='flex'>
                            <p style={{ fontSize: '20px', marginLeft: '45px' }} className='mt-3'>1003 ID</p>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', textAlign: 'center' }}>
                    <h1 style={{ color: 'rgba(0,0,0,0.05)', fontSize: '150px', transform: 'rotate(-45deg)', fontFamily: 'Arial' }}>Quotation</h1>
                </div>
                <div className='w-full px-10 py-8' style={{ position: 'relative' }}>
                    <div className='text-success sm:flex-row flex mb-8'>
                        <div className='w-full sm:w-1/2'>
                            <p className='text-lg mb-3' style={{ fontSize: '20px' }}>To</p>
                            <p className='text-lg text-black' style={{ fontSize: '16px' }}>{isEmpty(client_name) ? 'Client name' : client_name}</p>
                            <p className='text-lg text-black' style={{ fontSize: '16px' }}>{isEmpty(client_email) ? 'Client email' : client_email}</p>
                            <p className='text-lg text-black' style={{ fontSize: '16px' }}>{isEmpty(client_address) ? 'Client address' : client_address}</p>
                            <p className='text-lg text-black' style={{ fontSize: '16px' }}>{isEmpty(client_phone) ? 'Client phone' : client_phone}</p>
                        </div>
                    </div>
                    <div className='text-success sm:flex-row flex'>
                        <div className='w-full sm:w-9/12'>
                            <p className='text-lg mb-3' style={{ fontSize: '23px', backgroundColor: 'rgb(88,104,122)', fontWeight: 'bold', color: 'white', padding: '10px 25px', textAlign: 'center' }}>CLIENT INFORMATION</p>
                            <p className='text-lg' style={{ fontSize: '19px', color: 'rgb(88,104,122)', fontWeight: '500', paddingLeft: '25px' }}>MIRO IS HERE</p>
                            <p className='text-lg mb-2.5' style={{ fontSize: '19px', color: 'rgb(88,104,122)', fontWeight: '500', paddingLeft: '25px' }}>UKRIANE</p>
                            <p className='text-lg' style={{ fontSize: '19px', color: 'rgb(88,104,122)', fontWeight: '500', paddingLeft: '25px' }}>{isEmpty(client_phone) ? 'Client phone' : client_phone}</p>
                            <p className='text-lg' style={{ fontSize: '19px', color: 'rgb(88,104,122)', fontWeight: '500', paddingLeft: '25px' }}>{isEmpty(client_email) ? 'Client email' : client_email}</p>
                        </div>
                        <div className='w-full' style={{ textAlign: 'right' }}>
                            <p className='text-lg' style={{ fontSize: '21px', fontWeight: 'bold', color: 'rgb(88,104,122)' }}>DATE</p>
                            <p className='text-lg' style={{ fontSize: '19px', color: 'rgb(88,104,122)' }}>{isEmpty(quotation_date) ? 'No data' : moment(quotation_date).format('YYYY/MM/DD')}</p>
                        </div>
                    </div>
                    <div className='text-success sm:flex-row flex mb-8'>
                        <div className='w-full'>
                            <p className='text-lg mb-3' style={{ fontSize: '20px' }}>Job Information</p>
                            <table className='w-full text-black text-center'>
                                <tbody>
                                    <tr className='text-success'>
                                        <th className='text-left'>Item</th>
                                        <th>Rate</th>
                                        <th>QTY</th>
                                        <th className='text-right'>Price</th>
                                    </tr>
                                    {
                                        items.map((item, index) => (
                                            <tr className='mb-2' key={index}>
                                                <td className='text-left'>{isEmpty(item.description) ? 'No data' : item.description}</td>
                                                <td>${Number(item.unit_price).toFixed(2)}</td>
                                                <td>{Number(item.quantity)}</td>
                                                <td className='text-right'>${Number(Number(item.unit_price) * Number(item.quantity)).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <table className='text-right ml-auto mt-3'>
                                <tbody>
                                    <tr>
                                        <th className='text-right'>Total:</th>
                                        <td className='text-black'>${totalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <p className='text-lg text-black' style={{ fontSize: '16px' }}>Pmarket company</p>
                            <p className='text-lg text-black' style={{ fontSize: '16px' }}>company@company.com</p>
                            <p className='text-lg text-black' style={{ fontSize: '16px' }}>company address</p>
                            <p className='text-lg text-black' style={{ fontSize: '16px' }}>(537) 604-9291</p> */}
                        </div>
                    </div>

                    <div className='text-success sm:flex-row flex mb-8'>
                        <div className='w-full'>
                            <p className='text-lg mb-3' style={{ fontSize: '20px' }}>Note</p>
                            <p className='text-black'>{isEmpty(notes) ? 'Notes here' : notes}</p>
                        </div>
                    </div>

                    <div className='text-success sm:flex-row mt-15'>
                        <div className='flex'>
                            <div className='w-full' style={{ width: '70rem' }}> <p className='text-lg mb-3' style={{ fontSize: '23px', backgroundColor: 'rgb(88,104,122)', fontWeight: 'bold', color: 'white', padding: '10px 25px', textAlign: 'center' }}>SERVICE INFORMATION</p> </div>
                            <div className='w-full' style={{ textAlign: 'center' }}><p className='text-lg' style={{ fontSize: '19px', color: 'rgb(88,104,122)', fontWeight: '500' }}>QIY</p></div>
                            <div className='w-full' style={{ textAlign: 'right' }}><p className='text-lg' style={{ fontSize: '19px', color: 'rgb(88,104,122)', fontWeight: '500' }}>ESTIMATED COST</p></div>
                        </div>
                        <div>
                            <table className='w-full text-black text-center'>
                                <tbody>
                                    {
                                        items.map((item, index) => (
                                            <tr className='mb-2' key={index} style={{ borderBottom: '1px solid' }}>
                                                <td className='text-left' style={{ width: '43%', fontSize: '20px', padding: '6px 0px', fontWeight: '500', color: 'rgb(88, 104, 122)' }}>{isEmpty(item.description) ? 'No data' : item.description}</td>
                                                {/* <td>${Number(item.unit_price).toFixed(2)}</td> */}
                                                <td style={{ fontSize: '20px', padding: '6px 0px', fontWeight: '500', color: 'rgb(88, 104, 122)', width: '30%', textAlign: 'center' }}>{Number(item.quantity)}</td>
                                                <td className='text-right' style={{ fontSize: '20px', padding: '6px 0px', fontWeight: '500', color: 'rgb(88, 104, 122)' }}>{Number(Number(item.unit_price) * Number(item.quantity))}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='flex mt-15'>
                            <div className='w-full' style={{ textAlign: 'left', paddingLeft: '25px' }}></div>
                            <div className='w-full' style={{ textAlign: 'center', position: 'relative' }}>
                                <img src={TotalpriceImg} alt="totalprice.png" />
                                <p className='text-lg totalprice'>
                                    {
                                        onSum(items)
                                    }
                                </p>
                            </div>
                        </div>
                        <div className='flex mt-15'>
                            <div className='w-full'>
                                <div className='w-full' style={{ textAlign: 'left', paddingLeft: '25px' }}><p className='text-lg' style={{ fontSize: '19px', color: 'rgb(88,104,122)', fontWeight: 'bold' }}>CREATED BY</p></div>
                                <div className='w-full' style={{ textAlign: 'left', paddingLeft: '25px' }}><p className='text-lg' style={{ fontSize: '19px', color: 'rgb(88,104,122)', fontWeight: '500' }}> </p></div>

                            </div>
                            <div className='w-full' style={{ textAlign: 'center' }}><p className='text-lg' style={{ fontSize: '19px', color: 'rgb(88,104,122)', fontWeight: 'bolder' }}>AUTHORIZED SIGNATURE</p></div>
                        </div>
                    </div>

                    <div className='text-success sm:flex-row flex mb-8'>
                        <div className='w-full sm:w-1/2'>
                            <p className='text-lg mb-3' style={{ fontSize: '20px' }}>Bank information</p>
                            <p className='text-black'><span className='text-success'>Bank:</span> {isEmpty(settingData) || isEmpty(settingData.bank_name) ? 'Bank name' : settingData.bank_name}</p>
                            <p className='text-black'><span className='text-success'>Account Number:</span> {isEmpty(settingData) || isEmpty(settingData.account_number) ? 'Number' : settingData.account_number}</p>
                            <p className='text-black'><span className='text-success'>Code:</span> {isEmpty(settingData) || isEmpty(settingData.bank_code) ? 'Swift code' : settingData.bank_code}</p>
                            <p className='text-black'><span className='text-success'>Country:</span> {isEmpty(settingData) || isEmpty(settingData.bank_country) ? 'Country' : settingData.bank_country}</p>
                        </div>
                        <div className='w-full sm:w-1/2'>
                            <p className='text-lg mb-3' style={{ fontSize: '20px' }}>Note</p>
                            <p className='text-black'>{isEmpty(notes) ? 'Notes here' : notes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuotationPreview;