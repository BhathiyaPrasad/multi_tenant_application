
import { SignForm } from "@/components/sign-form"

export default function SignUpPage() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex flex-col items-center gap-2">
                <SignForm />
            </div>
        </div>
    )
}
