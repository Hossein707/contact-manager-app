import { confirmAlert } from "react-confirm-alert";

export const confirm = (removeFunc, itemId, itemFullname) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="alert-container"
                >
                    <h1>پاک کردن {itemFullname}</h1>
                    <p>
                        مطمئنی که میخوای <span>{itemFullname}</span> رو پاک کنی ؟
                    </p>
                    <div className="alert-btns">
                        <button className="remove-btn"
                            onClick={() => {
                                removeFunc(itemId);
                                onClose();
                            }}
                        >
                            مطمئن هستم
                        </button>
                        <button
                            onClick={onClose}
                            className="close-btn"
                        >
                            انصراف
                        </button>
                    </div>

                </div>
            );
        },
    });
};