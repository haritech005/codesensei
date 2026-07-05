import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/ui/CTA"
import { getAllCompanions, getUserCompanions, getUserSessions, getBookmarkedCompanions } from "@/lib/actions/companions.actions"
import { getSubjectColor } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


const Page = async () => {

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const [companions, recentSessionsCompanion, bookmarkedCompanions] = await Promise.all([
    getAllCompanions({ limit: 3 }),
    getUserSessions(userId),
    getBookmarkedCompanions(userId)
  ]);

  const bookmarkedIds = new Set(bookmarkedCompanions.map((c: any) => c.id));

  return (
    <main>
      <h1>Featured Modules </h1>

      <section className="companions-grid">

        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
            isBookmarked={bookmarkedIds.has(companion.id)}
            path="/"
          />
        ))}


      </section>

      <section className="home-section mb-7">
        <CompanionsList
          title="Your Recent Activities"
          companions={recentSessionsCompanion}
          classNames={"w-2/3 max-lg:w-full"}
        />

        <CTA />

      </section>

    </main>
  )
}

export default Page