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
import Image from "next/image";
import imgsrc from "../../assets/Engineering Image from Unsplash.jpg"

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 ">
                <CardContent className="grid p-0 md:grid-cols-2">

                    <div className="bg-muted relative hidden md:block">
                        <Image
                            src={imgsrc}
                            fill={true}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>

                    <form className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">خوش آمدید</h1>
                                <p className="text-muted-foreground text-balance">
                                    ورود با حساب کاربری
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
                                <div className="flex items-center">
                                    <div className="w-full flex flex-row-reverse justify-between ">
                                        <FieldLabel  htmlFor="password">رمز عبور</FieldLabel>
                                        <a
                                            href="#"
                                            className=" text-sm underline-offset-2 hover:underline"
                                        >
                                            فراموشی رمز ورود
                                        </a>
                                    </div>
                                </div>
                                <Input id="password" type="password" required/>
                            </Field>
                            <Field>
                                <Button className="cursor-pointer" type="submit">ورود</Button>
                            </Field>
                            <FieldDescription className="text-center">
                                حساب کاربری ندارید <a href="/signup">ساخت حساب کاربری</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
