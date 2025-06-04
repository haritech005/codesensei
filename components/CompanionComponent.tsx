'use client'
import { cn, getSubjectColor } from "@/lib/utils"
import { vapi } from "@/lib/vapi.sdk";
import { useEffect, useState } from "react"

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = 'CONNECTING',
    ACTIVE = "ACTIVE",
    FINISHED = 'FINISHED'
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE)

        const onCallEnd = () => setCallStatus(CallStatus.FINISHED)

        const onMessage = () => { }

        const onError = (error: Error) => console.log(error)

        const onSpeechStart = () => setIsSpeaking(true)

        const onSpeechEnd = () => setIsSpeaking(false)

        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('error', onError)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)
    }, [])

    return (
        <section className="flex flex-col h-[70vh]">
            <section className="flex gap-8 max-sm:flex-col ">
                <div className="companion-section">
                    <div className="companion-avatar" style={{ backgroundColor: getSubjectColor(subject) }}>
                        <div className={cn('absolute, transition-opacity duration-1000')}>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default CompanionComponent