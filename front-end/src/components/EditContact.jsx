import { Link, useNavigate, useParams } from "react-router-dom";
import { editContact, getSingleContact } from "../services/contactServices";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { contactSchema } from "../validation/contactFormValidation";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { getAllGroups } from "../services/groupServices";


const EditContact = () => {

    const { contactId } = useParams()
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);

    const [contact, setContact] = useState({
        _id: "",
        fullname: "",
        image: {},
        photo: "",
        phoneNumber: "",
        email: "",
        job: "",
        address: "",
        group: "",
    });

    const editContactForm = async (mycontact) => {
        try {
            const formData = new FormData();
            formData.append("image", mycontact.image);
            formData.append("fullname", mycontact.fullname);
            formData.append("phoneNumber", mycontact.phoneNumber);
            formData.append("email", mycontact.email);
            formData.append("job", mycontact.job);
            formData.append("address", mycontact.address);
            formData.append("group", mycontact.group);

            const { status } = await editContact(formData, contactId);

            if (status === 200) {
                setContact({});
                toast.info("مخاطب با موفقیت ویرایش شد.")
                navigate("/")
            }
        } catch (error) {
            toast.error("ویرایش مخاطب با مشکل مواجه شد.")
            navigate("/")
        }
    }

    const handleImageInput = (e) => {
        if (e?.target?.files.length > 0) {
            formik.setFieldValue("image", e.target.files[0])
            formik.setFieldValue("photo", e.target.files[0]?.name)
        } else {
            formik.setFieldValue("image", "")
            formik.setFieldValue("photo", "")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: contactData } = await getSingleContact(contactId);
                const { data: groupsData } = await getAllGroups();

                setContact(contactData.contact)
                setGroups(groupsData.groups);

            } catch (error) {

            }
        }
        fetchData();
    }, [contactId])

    const formik = useFormik({

        initialValues: {
            fullname: contact?.fullname,
            image: "",
            photo: contact?.image,
            phoneNumber: contact?.phoneNumber,
            email: contact?.email,
            job: contact?.job,
            address: contact?.address,
            group: contact?.group,
        },
        validationSchema: contactSchema,
        onSubmit: () => {
            editContactForm(formik.values);
        },
        enableReinitialize: true,
    })

    return (
        <>
            <Helmet>
                <title>مدیریت مخاطبین | ویرایش مخاطب</title>
            </Helmet>
            <div className="form-container">

                <form className="myform" onSubmit={formik.handleSubmit} encType="multipart/form-data" >

                    <div className="form-title">ویرایش مخاطب</div>

                    <div className="input-container">
                        <input
                            name="fullname"
                            id="fullname"
                            type="text"
                            placeholder="نام و نام خانوادگی"
                            onChange={(e) => formik.setFieldValue("fullname", e.target.value)}
                            value={formik.values.fullname}

                        />
                        {formik.touched.fullname && formik.errors.fullname && (
                            <div className="input-error-message">{formik.errors.fullname}</div>
                        )}
                    </div>

                    <div className="input-container">
                        <input
                            id="image"
                            name="image"
                            type="file"
                            onChange={(e) => handleImageInput(e)}
                            placeholder="آدرس تصویر"
                        />
                        {formik.touched.image && formik.errors.image && (
                            <div className="input-error-message">{formik.errors.image}</div>
                        )}
                        <input readOnly value={formik.values.photo} type="text" name="photo" />
                    </div>

                    <div className="input-container">
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            placeholder="شماره موبایل"
                            onChange={(e) => formik.setFieldValue("phoneNumber", e.target.value)}
                            value={formik.values.phoneNumber}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                            <div className="input-error-message">{formik.errors.phoneNumber}</div>
                        )}
                    </div>

                    <div className="input-container">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="آدرس ایمیل"
                            onChange={(e) => formik.setFieldValue("email", e.target.value)}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="input-error-message">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="input-container">
                        <input
                            id="job"
                            type="text"
                            name="job"
                            placeholder="شغل"
                            onChange={(e) => formik.setFieldValue("job", e.target.value)}
                            value={formik.values.job}
                        />
                        {formik.touched.job && formik.errors.job && (
                            <div className="input-error-message">{formik.errors.job}</div>
                        )}
                    </div>

                    <div className="input-container">
                        <textarea
                            id="address"
                            type="text"
                            name="address"
                            placeholder="آدرس"
                            onChange={(e) => formik.setFieldValue("address", e.target.value)}
                            value={formik.values.address}
                        />
                        {formik.touched.address && formik.errors.address && (
                            <div className="input-error-message">{formik.errors.address}</div>
                        )}
                    </div>

                    <div className="input-container">
                        <select
                            id="group"
                            name="group"
                            onChange={(e) => formik.setFieldValue("group", e.target.value)}
                            value={formik.values.group}
                        >
                            <option value="">انتخاب گروه</option>
                            {groups.length > 0 &&
                                groups.map((group) => (
                                    <option key={group._id} value={group._id}>
                                        {group.name}
                                    </option>
                                ))}
                        </select>
                        <Link to={"/add-group"}><i className="fa fa-plus"></i>اضافه کردن گروه جدید</Link>
                        {formik.touched.group && formik.errors.group && (
                            <div className="input-error-message">{formik.errors.group}</div>
                        )}
                    </div>

                    <div className="btns">
                        <input
                            className="sub-btn"
                            type="submit"
                            value="ویرایش مخاطب"
                        />
                        <Link
                            to={"/"}
                        >
                            انصراف
                        </Link>
                    </div>
                </form>


            </div>
        </>
    );
}

export default EditContact;