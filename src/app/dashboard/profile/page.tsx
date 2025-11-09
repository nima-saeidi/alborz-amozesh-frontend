import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";

export default function ProfilePage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <form className="p-6 md:p-8">
                <FieldGroup>
                    <Field>
                        <FieldLabel className="flex-row-reverse" htmlFor="first_name">نام</FieldLabel>
                        <Input
                            id="first_name"
                            type="text"
                            placeholder="علی"
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel className="flex-row-reverse" htmlFor="last_name	">نام خانوادگی</FieldLabel>
                        <Input
                            id="last_name	"
                            type="text"
                            placeholder="محمدی"
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel className="flex-row-reverse" htmlFor="national_id">کد ملی</FieldLabel>
                        <Input
                            id="national_id"
                            type="text"
                            placeholder="۱۲۳۴۵۶۷۸۹۰"
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel className="flex-row-reverse" htmlFor="fathers_name">نام پدر</FieldLabel>
                        <Input
                            id="fathers_name"
                            type="text"
                            placeholder="مجید محمدی"
                            required
                        />
                    </Field>
                    
                </FieldGroup>
            </form>
        </div>
    )
}