import { FormEvent, useState } from "react"

import { AxiosError } from "axios";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DateRange } from "react-day-picker";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsModal } from "./invite-guests-modal";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { api } from "../../lib/axios";
import { getDisplayedDate } from "../../lib/displayedDate";
import { useNavigate } from "react-router-dom";

interface ErrorTripModal {
    response: {
        data: {
            message: string;
        }
    }
}
export function CreateTripPage() {
    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
    const [emailsToInvite, setEmailsToInvite] = useState(["lucasgomes@gmail.com", "jr@gmail.com"]);

    const [destination, setDestination] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

    const navigate = useNavigate();

    function openGuestsInput() {
        setIsGuestsInputOpen(true);
    }

    function closeGuestsInput() {
        setIsGuestsInputOpen(false);
    }
    function openGuestsModal() {
        setIsGuestsModalOpen(true);
    }
    function closeGuestsModal() {
        setIsGuestsModalOpen(false);
    }
    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true);
    }
    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false);
    }
    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get("email")?.toString();
        if (!email) { return }

        if (emailsToInvite.includes(email)) { return }
        setEmailsToInvite([...emailsToInvite, email]);
        event.currentTarget.reset();
    }

    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);
        setEmailsToInvite(newEmailList);
    }
    async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!destination) { return }

        if (!eventStartAndEndDates?.from || !eventStartAndEndDates.to) {
            return
        }

        if (emailsToInvite.length === 0) {
            return
        }
        if (!ownerName || !ownerEmail) {
            return
        }

        try {
            const response = await api.post("/trips", {
                destination,
                starts_at: eventStartAndEndDates.from,
                ends_at: eventStartAndEndDates.to,
                emails_to_invite: emailsToInvite,
                owner_name: ownerName,
                owner_email: ownerEmail
            });
            const { tripId } = response.data;

            navigate(`/trips/${tripId}`);
        } catch (err) {
            alert(err.response.data.message);
        }
    }
    const displayedDate = eventStartAndEndDates?.from && eventStartAndEndDates.to
        ? getDisplayedDate(eventStartAndEndDates.from, eventStartAndEndDates.to) :
        "";
    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="plann.er" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>

                <div className="space-y-4">
                    <DestinationAndDateStep
                        closeGuestsInput={closeGuestsInput}
                        openGuestsInput={openGuestsInput}
                        isGuestsInputOpen={isGuestsInputOpen}
                        setDestination={setDestination}
                        setEventStartAndEndDates={setEventStartAndEndDates}
                        eventStartAndEndDates={eventStartAndEndDates}
                    />

                    {isGuestsInputOpen && (
                        <InviteGuestsStep
                            emailsToInvite={emailsToInvite}
                            openConfirmTripModal={openConfirmTripModal}
                            openGuestsModal={openGuestsModal}
                        />
                    )}
                </div>
                <p className="text-sm text-zinc-500">
                    Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e
                    <a href="" className="text-zinc-300 underline"> políticas de privacidade</a>.
                </p>
            </div>
            {
                isGuestsModalOpen && (
                    <InviteGuestsModal
                        emailsToInvite={emailsToInvite}
                        addNewEmailToInvite={addNewEmailToInvite}
                        closeGuestsModal={closeGuestsModal}
                        removeEmailFromInvites={removeEmailFromInvites}
                    />
                )
            }

            {
                isConfirmTripModalOpen && (
                    <ConfirmTripModal
                        closeConfirmTripModal={closeConfirmTripModal}
                        createTrip={createTrip}
                        setOwnerName={setOwnerName}
                        setOwnerEmail={setOwnerEmail}
                        destination={destination}
                        dateOfTrip={displayedDate}
                    />
                )
            }
        </div >
    )
}