import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/ui/CTA"
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companions.actions"
import { getSubjectColor } from "@/lib/utils"

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 })
  const recentSessionsCompanion = await getRecentSessions(10)

  return (
    <main>
      <h1>Popular Companions</h1>

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
          title="Recently completed Lessons"
          companions={recentSessionsCompanion}
          classNames={"w-2/3 max-lg:w-full"}
        />

        <CTA />

      </section>

    </main>

  )
}

export default Page