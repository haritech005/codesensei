import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/ui/CTA"
import { getAllCompanions, getUserCompanions } from "@/lib/actions/companions.actions"
import { getSubjectColor } from "@/lib/utils"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


const Page = async () => {

  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const companions = await getAllCompanions({ limit: 3 })
  const recentSessionsCompanion = await getUserCompanions(user.id);

  return (
    <main>
      <h1>Featured Modules </h1>

      <section className="home-section">

        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
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