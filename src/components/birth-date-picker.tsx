// components/ui/birth-date-picker.tsx

"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
// import { faIR } from "date-fns-jalali/locale" // اگر ارور داد، می‌توانی کامنتش کنی

interface BirthDatePickerProps {
  defaultValue?: string;
  name?: string;
  onDateSelect?: (date: string) => void; // اضافه شد
}

export const BirthDatePicker: React.FC<BirthDatePickerProps> = ({ defaultValue, name, onDateSelect }) => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(
        defaultValue ? new Date(defaultValue) : undefined
    )

    const handleSelect = (d: Date | undefined) => {
        if (d) {
            setDate(d)
            if (onDateSelect) onDateSelect(d.toISOString().split("T")[0]) // ارسال تاریخ به والد
        }
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id={name}
                    className="w-48 justify-between font-normal text-right"
                >
                    <ChevronDownIcon />
                    {date ? date.toLocaleDateString("fa-IR") : "انتخاب تاریخ"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    // locale={faIR} // اگر ارور داشت، این خط را کامنت کن
                    onSelect={handleSelect}
                />
            </PopoverContent>
        </Popover>
    )
}
