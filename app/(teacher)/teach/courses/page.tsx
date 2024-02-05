import MaxWidthContainer from "@/components/max-width-container";
import { columns, Courses } from "@/components/teacher/columns";
import { DataTable } from "@/components/teacher/data-table";
import { db } from "@/db";

const CoursesPage = async () => {
  const courses = await db.course.findMany({
    select: {
      id: true,
      title: true,
      cost: true,
      category: true,
      isPublished: true,
    },
  });

  return (
    <MaxWidthContainer>
      <div className="mt-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">My courses</h1>
          <h3 className="text-muted-foreground">Manage your courses</h3>
        </div>
        <DataTable columns={columns} data={courses} />
      </div>
    </MaxWidthContainer>
  );
};

export default CoursesPage;
