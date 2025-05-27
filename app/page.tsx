import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/ui/CTA"
import { recentSessions } from "@/constants"

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura the brain Explorer"
          topic="Neural Network of the Brain"
          subject="Science"
          duration={45}
          color="#27B7B5"
        />
        <CompanionCard
          id="124"
          name="Countsy the Number Wizard"
          topic="Derivatives & Integrals"
          subject="Maths"
          duration={30}
          color="#FFDE59"
        />

        <CompanionCard
          id="125"
          name="Verba the Vocabulary Builder"
          topic="English Literature"
          subject="Language"
          duration={45}
          color="#BFD641"
        />
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed Lessons"
          companions={recentSessions}
          classNames={"w-2/3 max-lg:w-full"}
        />

        <CTA />
        
      </section>

    </main>

  )
}

export default Page