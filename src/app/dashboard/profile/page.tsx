import {Field, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {BirthDatePicker} from "@/components/birth-date-picker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/image-upload";
import {Button} from "@/components/ui/button";

export default function ProfilePage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            {/*Avatar upload functionality*/}
            <form className="p-6 md:p-8">
                <FieldGroup className="flex flex-col gap-10">
                    <div className="flex flex-col lg:flex-row-reverse gap-8">
                        <div className="flex justify-center items-center">
                            <ImageUpload/>
                        </div>
                        <Separator orientation={"vertical"} color="black" />
                        <div className="grow flex flex-col gap-4">
                            <Field>
                                <FieldLabel className="flex-row-reverse" htmlFor="first_name">نام</FieldLabel>
                                <Input
                                    className="text-right"
                                    id="first_name"
                                    type="text"
                                    placeholder="علی"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel className="flex-row-reverse" htmlFor="last_name">نام خانوادگی</FieldLabel>
                                <Input
                                    className="text-right"
                                    id="last_name"
                                    type="text"
                                    placeholder="محمدی"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel className="flex-row-reverse" htmlFor="national_id">کد ملی</FieldLabel>
                                <Input
                                    className="text-right"
                                    id="national_id"
                                    type="text"
                                    placeholder="۱۲۳۴۵۶۷۸۹۰"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel className="flex-row-reverse" htmlFor="fathers_name">نام پدر</FieldLabel>
                                <Input
                                    className="text-right"
                                    id="fathers_name"
                                    type="text"
                                    placeholder="مجید محمدی"
                                    required
                                />
                            </Field>
                        </div>
                        <Separator orientation={"vertical"} color="black" />
                        <div className="grow flex flex-col gap-4">
                            <Field >
                                <FieldLabel className="flex-row-reverse" htmlFor="birthday_date">تاریخ تولد</FieldLabel>
                                <BirthDatePicker/>
                            </Field>
                            <Field>
                                <FieldLabel className="flex-row-reverse" htmlFor="gender">جنسیت</FieldLabel>
                                <Select>
                                    <SelectTrigger id="gender" className="w-[180px] text-right">
                                        <SelectValue placeholder="جنسیت" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">مذکر</SelectItem>
                                        <SelectItem value="female">مونث</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field>
                                <FieldLabel className="flex-row-reverse" htmlFor="education_level">تحصیلات</FieldLabel>
                                <Select>
                                    <SelectTrigger id="education_level" className="w-[180px] text-right">
                                        <SelectValue placeholder="سطح تحصیلات" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="high_school_diploma">دیپلم</SelectItem>
                                        <SelectItem value="bachelors">کارشناسی</SelectItem>
                                        <SelectItem value="masters">کارشناسی ارشد</SelectItem>
                                        <SelectItem value="doctorate">دکتری</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field>
                                <FieldLabel className="flex-row-reverse" htmlFor="email">ایمیل</FieldLabel>
                                <Input
                                    className="text-right"
                                    id="email"
                                    type="email"
                                    placeholder="mail@mail.com"
                                    required
                                />
                            </Field>
                        </div>
                    </div>
                    <Field orientation="horizontal" className="flex justify-center" >
                        <Button className="w-full lg:w-1/2" size={"lg"} type="submit">ذخیره تغیرات</Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}