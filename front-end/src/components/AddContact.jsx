import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createContact } from "../services/contactServices";
import { useFormik } from "formik";
import { contactSchema } from "../validation/contactFormValidation";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { getAllGroups } from "../services/groupServices";


const AddContact = () => {

    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();

    const createContactForm = async (mycontact) => {
        try {
            const formData = new FormData();
            formData.append("image", mycontact.image);
            formData.append("fullname", mycontact.fullname);
            formData.append("phoneNumber", mycontact.phoneNumber);
            formData.append("email", mycontact.email);
            formData.append("job", mycontact.job);
            formData.append("address", mycontact.address);
            formData.append("group", mycontact.group);

            const { status } = await createContact(formData);

            if (status === 201) {
                toast.success("مخاطب با موفقیت ساخته شد.");
                navigate("/")
            }
        } catch (error) {
            toast.error("ساخت مخاطب با مشکل مواجه شد.")
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
        const fetchGroups = async () => {
            try {
                const { data } = await getAllGroups();
                setGroups(data.groups);
            } catch (error) {

            }
        }

        fetchGroups();

    }, [])

    const formik = useFormik({
        initialValues: {
            fullname: "",
            image: "",
            photo: "",
            phoneNumber: "",
            email: "",
            job: "",
            address: "",
            group: "",
        },
        validationSchema: contactSchema,
        onSubmit: () => {
            createContactForm(formik.values);
        }
    })

    return (
        <>
            <Helmet>
                <title>مدیریت مخاطبین | ساخت مخاطب</title>
            </Helmet>

            <div className="form-container">
                <form className="myform" onSubmit={formik.handleSubmit} encType="multipart/form-data">

                    <div className="form-title">ساخت مخاطب</div>

                    <div className="input-container">
                        <input
                            name="fullname"
                            id="fullname"
                            type="text"
                            placeholder="نام و نام خانوادگی"
                            onChange={(e) => formik.setFieldValue("fullname", e.target.value)}
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
                            onChange={e => handleImageInput(e)}
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
                            value="ساخت مخاطب"
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

export default AddContact;