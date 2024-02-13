import AllCourses from "@/components/landing/all-courses";
import Companies from "@/components/landing/companies";
import Landing from "@/components/landing/landing";
import PopularCourses from "@/components/landing/popular-courses";
import StartLearningCourses from "@/components/landing/start-learning";
import MaxWidthContainer from "@/components/max-width-container";

const page = async () => {
  // const session = await getServerAuthSession();

  return (
    <div className="pt-[4rem] py-4">
      <Landing />

      <section>
        <Companies />
      </section>

      <MaxWidthContainer>
        <section>
          <StartLearningCourses />
        </section>
        <section>
          <AllCourses />
        </section>
      </MaxWidthContainer>
    </div>
  );
};

export default page;
