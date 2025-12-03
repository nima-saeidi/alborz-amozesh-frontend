import { ScrollArea } from "@/components/ui/scroll-area"
import { BadgeCheck } from 'lucide-react';
import {Separator} from "@/components/ui/separator";
import { Play } from 'lucide-react';


function SessionCard({title, isCompleted}: {title: string, isCompleted: boolean}) {
    return (
        <div className="h-16 w-full flex flex-row-reverse gap-4 justify-between items-center p-4 hover:bg-gray-300 cursor-pointer select-none ">
            <p dir="rtl" className="text-right w-[100px] truncate flex-1/2 shrink min-w-0">{title}</p>
            {isCompleted ? <BadgeCheck className="flex-shrink-0"/> : null}
        </div>
    )
}
export default function CoursePage() {
    return (
        <div className="h-full flex flex-col md:flex-row md:justify-between gap-10 p-4">
            <ScrollArea className="w-full md:min-w-2/12 md:w-3/12 md:max-w-md h-[400px] md:h-[600px] bg-gray-100 border rounded-[10px]">
                {/*TODO get course sessions from api*/}
                <SessionCard title="خوش آمدید" isCompleted={true}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={true}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={true}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={true}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={true}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={false}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={true}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={true}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={false}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={false}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={false}/>
                <Separator orientation="horizontal"/>
                <SessionCard title="خوش آمدید" isCompleted={false}/>
            </ScrollArea>
            <div className="w-full md:w-9/12 h-[200px] md:h-[450px] border rounded-[10px] contain-content">
                <div className="w-full h-full flex justify-center items-center ">
                    <Play size={60} fill="gray-100" className="cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}