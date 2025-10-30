import Banner from "@/components/ui/banner";
import CourseCard from "@/components/ui/course-card";
import SearchBar from "@/components/ui/search-bar";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function CoursePage() {
    return (
        <>
            <Banner title={"آموزش با چاشنی مهارت"} description={"یادگیری با کیفیت و منتورشیب نارنجی"} linkAvailable={false}/>
            <div className="relative lg:mx-5 mt-[50px] overflow-hidden flex flex-col">
                <div className="h-[50px] flex justify-between items-center border-b">
                    <div className="h-full">
                        <SearchBar />
                    </div>
                    <div className="h-full flex flex-row-reverse gap">
                        <div className="w-[100px] border-b-4 border-black flex justify-center items-center">ویدیویی</div>
                        <div className="w-[100px] flex justify-center items-center">حضوری</div>
                        <div className="w-[100px] flex justify-center items-center">وبینار</div>
                    </div>
                </div>
                <div className="my-[50px] mb-10 flex-grow grid justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,minmax(362px,1fr))] gap-x-8 gap-y-9">
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                </div>
                <Pagination className="mb-[50px]">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">۳</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                ۲
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">۱</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
}