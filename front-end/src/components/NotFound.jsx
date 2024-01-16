
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>

            <Helmet>
                <title>صفحه 404</title>
            </Helmet>

            <div class="notfound">

                <h1>404</h1>
                <h2>صفحه ی مورد نظر یافت نشد</h2>

                <p>صفحه ای که دنبالش می گردید وجود ندارد. از لینک زیر برای دسترسی به صفحه ی اصلی استفاده کنید.</p>

                <Link to="/">
                    برگشت به صفحه اصلی
                </Link>
            </div>

        </>
    );
};

export default NotFound;