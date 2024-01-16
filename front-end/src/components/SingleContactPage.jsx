import { Link, useParams } from 'react-router-dom';
import prof1 from '../images/women-profile2.png'
import { useEffect, useState } from 'react';
import { getSingleContact } from '../services/contactServices';
import { Helmet } from 'react-helmet-async';
import { getSingleGroup } from '../services/groupServices';
import Loading from './Loading';

const SingleContactPage = () => {

    const { contactId } = useParams();

    const [contact, setContact] = useState({});
    const [group, setGroup] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      
        const fetchContactData = async () => {
            try {
                setLoading(true);
                const { data } = await getSingleContact(contactId);
                const { data: groupData } = await getSingleGroup(data.contact.group);
                setContact(data.contact);
                setGroup(groupData.group)
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        fetchContactData()
    }, [contactId])

    return (
        <>
            <Helmet>
                <title>{`نمایش مخاطب | ${contact?.fullname}`}</title>
            </Helmet>
            <div className="card-container">
                <div className="card">
                    {loading
                        ? <Loading />
                        : (<>
                            <div className="img">
                                {contact?.image ?
                                    (<img src={`http://localhost:4000/images/${contact.image}`} alt="" />)
                                    : (<img src={prof1} alt="" />)}
                            </div>
                            <h2>{contact?.fullname}</h2>
                            <div className="details">
                                <span><b>شماره تماس :</b> {contact?.phoneNumber}</span>
                                <span><b>آدرس ایمیل :</b> {contact?.email}</span>
                                <span><b>آدرس منزل :</b> {contact?.address}</span>
                                <span><b>شغل :</b> {contact?.job}</span>
                                <span><b>نسبت :</b> {group?.name}</span>
                            </div>
                            <Link className='btn' to="/">بازگشت به صفحه ی اصلی</Link>
                        </>)
                    }

                </div>
            </div>

        </>
    );
}

export default SingleContactPage;