import { useEffect, useState } from "react";
import Contact from "./Contact";
import { getAllContacts } from "../services/contactServices";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { getAllGroups } from "../services/groupServices";
import Loading from "./Loading";

const Home = () => {
    const [allContacts, setAllContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await getAllContacts();
            const { data: groupsData } = await getAllGroups()

            setAllContacts(data.contacts);
            setFilteredContacts(data.contacts)
            setGroups(groupsData.groups);
            setLoading(false)

        } catch (error) {
            //create error handling component
            setLoading(false)
        }
    }

    let filterTimeout;
    const search = (query) => {

        clearTimeout(filterTimeout)
        if (!query) return setFilteredContacts([...allContacts])

        filterTimeout = setTimeout(() => {
            setFilteredContacts(allContacts.filter(contact => {
                return contact.fullname.toLowerCase().includes(query.toLowerCase())
            }))
        }, 1000)

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Helmet>
                <title>مدیریت مخاطبین</title>
            </Helmet>
            <ToastContainer rtl={true} position="top-right" theme="colored" />
            <div className="container">
                <div className="header">
                    <h3>مدیریت مخاطبین</h3>
                    <div className="icons">
                        <div className="search">
                            <input onChange={(event) => search(event.target.value)} type="text" dir="rtl" />
                            <i className="fas fa-search" dir="ltr"></i>
                        </div>


                        <Link to={"/add-contact"}> <i className="fas fa-plus"></i></Link>
                    </div>
                </div>
                <div className="box-container">
                    {loading
                        ? <Loading />
                        : (filteredContacts.length > 0 ? filteredContacts.map((contact, index) => (
                            <Contact key={index} setFilteredContacts={setFilteredContacts} contact={contact} groups={groups} />
                        )) :
                            (<div> مخاطبی برای نمایش موجود نیست.</div>)
                        )
                    }




                </div>
            </div>
        </>
    );
}

export default Home;