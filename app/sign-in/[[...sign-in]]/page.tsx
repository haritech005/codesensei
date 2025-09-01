import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return <main className="flex items-center justify-center min-h-[86dvh]">
        <SignIn />
    </main>
}