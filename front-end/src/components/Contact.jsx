import { Link } from 'react-router-dom';
import prof1 from '../images/women-profile2.png'
import { deleteContact, getAllContacts } from '../services/contactServices';
import { confirm } from '../Utils/alert';
import { toast } from 'react-toastify';


const Contact = ({setAllContacts, setFilteredContacts, contact, groups }) => {
    const contactGroup = groups.find(group => group._id === contact.group);

    const removeContactHandler = async (contactId) => {
        try {

            const {status} = await deleteContact(contactId);
            if (status===200) {
                const { data: contactsData } = await getAllContacts();
                setAllContacts(contactsData.contacts)
                setFilteredContacts(contactsData.contacts);
                toast.success("مخاطب با موفقیت حذف شد.")
            }
        } catch (error) {
            toast.error("حذف مخاطب با مشکل مواجه شد.")
        }
    }

    return (
        <div className="box">

            <span className="banner">{contactGroup ? contactGroup.name : "نامشخص"}</span>
            <div className="img">
                {contact.image ?
                    (<img src={`http://localhost:4000/images/${contact.image}`} alt="" />)
                    : (<img src={prof1} alt="" />)}

            </div>
            <div className="content">
                <h2>{contact?.fullname}</h2>
                <div className="detail-container">
                    <div className="info">
                        <span>موبایل : {contact.phoneNumber}</span>
                        <span>ایمیل : {contact.email}</span>
                    </div>

                    <div className="icons">
                        <Link to={`./contacts/${contact._id}`}> <i className="fas fa-eye"></i></Link>
                        <Link to={`./edit-contact/${contact._id}`}> <i className="fas fa-edit"></i></Link>
                        <Link onClick={() => confirm(removeContactHandler, contact._id, contact.fullname)} ><i className="fas fa-trash"></i></Link>


                    </div>
                </div>
            </div>



        </div>
    );
}

export default Contact;