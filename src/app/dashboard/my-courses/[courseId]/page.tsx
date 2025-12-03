import { ScrollArea } from "@/components/ui/scroll-area"
import { BadgeCheck } from 'lucide-react';
import {Separator} from "@/components/ui/separator";
import { Play } from 'lucide-react';


function SessionCard({title, isCompleted}: {title: string, isCompleted: boolean}) {
    return (
        <div className="h-16 flex flex-row-reverse justify-between items-center p-4 hover:bg-gray-300 cursor-pointer select-none ">
           <p>{title}</p>
            {isCompleted ? <BadgeCheck/> : null}
        </div>
    )
}
export default function CoursePage() {
    return (
        <div className="h-full flex justify-between gap-10 p-4">
            <ScrollArea className="flex flex-2 min-h-[600px] max-h-[650px] bg-gray-100 border rounded-[10px]">
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
            <div className="flex-7  h-[450px] border rounded-[10px]">
                <div className=" w-full h-full flex justify-center items-center">
                    <Play size={60} fill="gray-100" className="cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}