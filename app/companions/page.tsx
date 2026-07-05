import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/ui/SubjectFilter";
import { getAllCompanions, getBookmarkedCompanions } from "@/lib/actions/companions.actions";
import { getSubjectColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';

    const [companions, bookmarkedCompanions] = await Promise.all([
        getAllCompanions({ subject, topic }),
        getBookmarkedCompanions(userId)
    ]);

    const bookmarkedIds = new Set(bookmarkedCompanions.map((c: any) => c.id));

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1 className="">Modules Library</h1>
                <div className="flex gap-4">
                    <SearchInput/>
                    <SubjectFilter />
                </div>
            </section>
            <section className="companions-grid">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                        isBookmarked={bookmarkedIds.has(companion.id)}
                        path="/companions"
                    />
                ))}
            </section>
        </main>
    )
}

export default CompanionsLibrary;