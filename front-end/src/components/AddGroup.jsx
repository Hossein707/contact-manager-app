
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { createGroup, deleteGroup, editGroup, getAllGroups } from "../services/groupServices";
import { confirm } from "../Utils/alert";
import Loading from "./Loading";


const AddGroup = () => {


    const [groupsArchive, setGroupsArchive] = useState([]);
    const [groupName, setGroupName] = useState("")
    const [editGroupName, setEditGroupName] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchGroup = async () => {
        try {
            setLoading(true);
            const { data: gropData } = await getAllGroups();
            setGroupsArchive(gropData.groups);
            setLoading(false);
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGroup();
    }, [])

    const createSingleGroup = async () => {
        try {
            const { status } = await createGroup({ name: groupName });

            if (status === 201) {
                setGroupName("")
                fetchGroup()
            }
        } catch (error) {

        }

    }

    const editSingleGroup = async (groupId) => {
        try {
            if (editGroupName) {
                const { status } = await editGroup({ name: editGroupName }, groupId);
                if (status === 200) {
                    setEditGroupName("")
                    fetchGroup()
                }
            }
        } catch (error) {

        }

    }

    const deleteSingleGroup = async (groupId) => {
        try {
            const response = await deleteGroup(groupId);
            if (response) {
                fetchGroup()
            }
        } catch (error) {

        }
    }

    return (

        <>
            <Helmet>
                <title>مدیریت مخاطبین | ساخت گروه</title>
            </Helmet>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">عنوان گروه</th>
                            <th scope="col">ویرایش</th>
                            <th scope="col">حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? <tr>
                                <td></td>
                                <td><Loading /></td>
                                <td></td>
                            </tr>
                            :
                           groupsArchive?.map((group) => (
                                <tr key={group._id}>
                                    <td>
                                        {group.name}

                                    </td>
                                    <td>

                                        <button className="btn btn-warning" onClick={() => editSingleGroup(group._id)}>
                                            ویرایش

                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { confirm(deleteSingleGroup, group._id, group.name) }}>
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))

                        }


                    </tbody>

                </table>



                <div className="group-form-container" style={{ borderColor: "orange" }}>
                    <label htmlFor="EditGroup" className="mylabel">ویرایش گروه ها :</label>
                    <span><i className="fa fa-exclamation-triangle"></i>ابتدا نام گروه را وارد کرده سپس دکمه ی ویرایش گروهی که می خواهید تغییر دهید را بفشارید</span>
                    <input
                        type="text"
                        name="EditGroup"
                        id="EditGroup"
                        className="myinput"
                        placeholder="ویرایش گروه"
                        value={editGroupName}
                        onChange={(e) => setEditGroupName(e.target.value.trimStart())}
                    />
                </div>

                <div className="group-form-container">
                    <label htmlFor="group" className="mylabel">ایجاد گروه جدید:</label>
                    <input
                        type="text"
                        name="group"
                        id="group"
                        className="myinput"
                        placeholder="گروه را وارد کنید"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value.trimStart())}
                    />
                    {groupName ? (<button className="btn btn-success" onClick={createSingleGroup}>اضافه کردن گروه جدید</button>) :
                        (<button disabled className="btn btn-success">اضافه کردن گروه جدید</button>)}

                </div>

                <Link className="btn btn-info" to={"/"}>بازگشت به صفحه اصلی</Link>
            </div>

        </>
    );
}

export default AddGroup;