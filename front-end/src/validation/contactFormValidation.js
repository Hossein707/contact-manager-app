import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
    image: Yup.mixed().nullable()
    .test("FILE_SIZE", "حجم عکس باید کمتر از 1 مگابایت باشد", (value) =>value===undefined|| (value&& value.size < 1024 * 1024))
    .test("FILE_TYPE", "فرمت فایل انتخاب شده قابل قبول نمی باشد،لطفا عکسی با پسوند png و یا jpeg انتخاب کنید.", (value) =>value===undefined|| (value&& ['image/png','image/jpeg'].includes(value.type))),
    phoneNumber: Yup.string().required("شماره تماس الزامی می باشد"),
    email: Yup.string().email("آدرس ایمیل معتبر نمی باشد").required("ایمیل الزامی می باشد"),
    job: Yup.string().nullable(),
    address: Yup.string().min(5, "آدرس حداقل باید 5 کاراکتر باشد").max(50, "آدرس حداکثر باید 50 کاراکتر باشد"),
    group: Yup.string().nullable()

})