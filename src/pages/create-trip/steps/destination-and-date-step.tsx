import "react-day-picker/dist/style.css";

import { ArrowRight, Calendar, MapPin, Settings2, XIcon } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";

import { Button } from "../../../components/button";
import { getDisplayedDate } from "../../../lib/displayedDate";
import { ptBR } from "date-fns/locale"
import { useState } from "react";

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean;
    closeGuestsInput: () => void;
    openGuestsInput: () => void;
    setDestination: (destination: string) => void;
    setEventStartAndEndDates: (dates: DateRange | undefined) => void;
    eventStartAndEndDates: DateRange | undefined;
}
export function DestinationAndDateStep({
    openGuestsInput,
    closeGuestsInput,
    isGuestsInputOpen,
    setDestination,
    setEventStartAndEndDates,
    eventStartAndEndDates
}: DestinationAndDateStepProps) {

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);


    function openDatePicker() {
        return setIsDatePickerOpen(true);
    }
    function closeDatePicker() {
        return setIsDatePickerOpen(false);
    }
    const displayedDate = eventStartAndEndDates?.from && eventStartAndEndDates.to
        ? getDisplayedDate(eventStartAndEndDates.from, eventStartAndEndDates.to) :
        "";
    return (
        <div className="h-16  bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="text-zinc-400 size-5" />
                <input
                    disabled={isGuestsInputOpen}
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    type="text"
                    placeholder="Para onde você vai?"
                    onChange={event => setDestination(event.target.value)}
                />
            </div>
            <button disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left w-[240px]" onClick={openDatePicker}>
                <Calendar className="text-zinc-400 size-5" />
                <span
                    className=" text-lg text-zinc-400 w-40 flex-1">
                    {displayedDate || "Quando"}
                </span>
            </button>
            {isDatePickerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Selecione a data</h2>
                                <button onClick={closeDatePicker}>
                                    <XIcon className="size-5" />
                                </button>
                            </div>
                        </div>
                        <DayPicker
                            mode="range"
                            locale={ptBR}
                            selected={eventStartAndEndDates}
                            onSelect={setEventStartAndEndDates}
                        />
                    </div>
                </div>
            )}
            <div className="w-px h-6 bg-zinc-800" />
            {isGuestsInputOpen ?
                (
                    <Button variant="secondary"
                        onClick={closeGuestsInput}
                    >
                        Alterar local/data
                        <Settings2 className="size-5" />
                    </Button>
                ) : (
                    <Button
                        onClick={openGuestsInput}
                        variant="primary"
                    >
                        Continuar
                        <ArrowRight className="size-5" />
                    </Button>
                )}
        </div>
    );
}