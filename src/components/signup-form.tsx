import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"

export function SignupForm({
                               className,
                               ...props
                           }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                    <form className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">ساخت حساب کاربری</h1>
                                <p className="text-muted-foreground text-sm text-balance">
                                    ایمیل تان را وارد کنید
                                </p>
                            </div>
                            <Field>
                                <FieldLabel className="flex-row-reverse" htmlFor="email">ایمیل</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel className="flex-row-reverse" htmlFor="confirm-password">
                                            تکرار رمز عبور
                                        </FieldLabel>
                                        <Input id="confirm-password" type="password" required/>
                                    </Field>
                                    <Field>
                                        <FieldLabel className="flex-row-reverse" htmlFor="password">رمز عبور</FieldLabel>
                                        <Input id="password" type="password" required/>
                                    </Field>
                                </Field>
                                <FieldDescription className="text-center">
                                    رمز عبور باید حداقل ۸ کاراکتر داشته باشد
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button className="cursor-pointer" type="submit">ساخت حساب کاربری</Button>
                            </Field>
                            <FieldDescription className="text-center">
                                آیا حساب کاربری دارید؟ <a href="/login">ورود</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                </CardContent>
            </Card>
        </div>
    )
}
